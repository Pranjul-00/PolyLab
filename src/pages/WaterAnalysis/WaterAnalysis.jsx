import React, { useState } from 'react';
import { Droplet, Info } from 'lucide-react';
import styles from './WaterAnalysis.module.css';
import WaterControls from './components/WaterControls';
import SimulationCanvas from './components/SimulationCanvas';
import DataPanel from './components/DataPanel';

const WaterAnalysis = () => {
    // Initial State
    const [params, setParams] = useState({
        pressure: 500, // PSI
        porosity: 2.5, // Nanometers (Scale matches particle sizes roughly for simulation)
        solutes: {
            Na: 150, // ppm
            K: 50,
            Mg: 80,
            Cl: 200
        }
    });

    const [isRunning, setIsRunning] = useState(false);

    const toggleRun = () => {
        setIsRunning(!isRunning);
    };

    return (
        <div className={styles.waterAnalysisPage}>
            {/* Header */}
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Water Analysis Module</h1>
                    <p className={styles.subtitle}>Carbon Nanotube Reverse Osmosis Simulation</p>
                </div>
                {/* Status Indicator */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                    background: isRunning ? 'rgba(34,211,238,0.1)' : 'rgba(255,255,255,0.05)',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid',
                    borderColor: isRunning ? 'var(--color-accent-cyan)' : 'transparent'
                }}>
                    <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: isRunning ? 'var(--color-accent-cyan)' : '#64748b',
                        boxShadow: isRunning ? '0 0 10px var(--color-accent-cyan)' : 'none'
                    }}></span>
                    <span style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: isRunning ? 'var(--color-accent-cyan)' : 'var(--color-text-secondary)'
                    }}>
                        {isRunning ? 'SYSTEM PRESSURIZED' : 'SYSTEM IDLE'}
                    </span>
                </div>
            </header>

            {/* Dashboard Grid */}
            <div className={styles.dashboardGrid}>
                {/* Left: Controls */}
                <WaterControls
                    params={params}
                    setParams={setParams}
                    isRunning={isRunning}
                    onToggleRun={toggleRun}
                />

                {/* Center: Simulation */}
                <SimulationCanvas
                    params={params}
                    isRunning={isRunning}
                />

                {/* Right: Data Analysis */}
                <DataPanel
                    params={params}
                    isRunning={isRunning}
                />
            </div>
        </div>
    );
};

export default WaterAnalysis;

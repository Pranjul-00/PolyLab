import React from 'react';
import { Play, Square, Settings, Activity, Gauge, Zap } from 'lucide-react';
import styles from '../WaterAnalysis.module.css';

const WaterControls = ({ params, setParams, isRunning, onToggleRun }) => {

    const handleChange = (key, value) => {
        setParams(prev => ({
            ...prev,
            [key]: parseFloat(value)
        }));
    };

    const handleSoluteChange = (ion, value) => {
        setParams(prev => ({
            ...prev,
            solutes: {
                ...prev.solutes,
                [ion]: parseFloat(value)
            }
        }));
    };

    return (
        <div className={`${styles.panel} ${styles.controlsPanel}`}>
            <h3 className={styles.title} style={{ fontSize: '1.25rem' }}>
                <Settings size={20} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} />
                Parameters
            </h3>

            {/* System Pressure */}
            <div className={styles.controlGroup}>
                <div className={styles.label}>
                    <span><Gauge size={14} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} /> Pressure</span>
                    <span className={styles.value}>{params.pressure} PSI</span>
                </div>
                <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={params.pressure}
                    onChange={(e) => handleChange('pressure', e.target.value)}
                    className={styles.slider}
                    disabled={isRunning}
                />
            </div>

            {/* Membrane Porosity */}
            <div className={styles.controlGroup}>
                <div className={styles.label}>
                    <span><Zap size={14} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} /> Nanotube Dia.</span>
                    <span className={styles.value}>{params.porosity.toFixed(1)} nm</span>
                </div>
                <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.1"
                    value={params.porosity}
                    onChange={(e) => handleChange('porosity', e.target.value)}
                    className={styles.slider}
                    disabled={isRunning}
                />
            </div>

            <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '10px 0' }} />

            <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: 'var(--color-text-secondary)' }}>Solute Levels (ppm)</h4>

            {/* Solutes */}
            {/* Sodium (Na+) */}
            <div className={styles.controlGroup}>
                <div className={styles.label}>
                    <span>Sodium (Na+)</span>
                    <span className={styles.value}>{params.solutes.Na}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="500"
                    value={params.solutes.Na}
                    onChange={(e) => handleSoluteChange('Na', e.target.value)}
                    className={styles.slider}
                />
            </div>

            {/* Potassium (K+) */}
            <div className={styles.controlGroup}>
                <div className={styles.label}>
                    <span>Potassium (K+)</span>
                    <span className={styles.value}>{params.solutes.K}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={params.solutes.K}
                    onChange={(e) => handleSoluteChange('K', e.target.value)}
                    className={styles.slider}
                />
            </div>

            {/* Magnesium (Mg++) - Key for Hardness */}
            <div className={styles.controlGroup}>
                <div className={styles.label}>
                    <span>Magnesium (Mg++)</span>
                    <span className={styles.value}>{params.solutes.Mg}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="300"
                    value={params.solutes.Mg}
                    onChange={(e) => handleSoluteChange('Mg', e.target.value)}
                    className={styles.slider}
                    style={{ '--accent-color': '#f472b6' }} // Custom color for divalent
                />
            </div>

            {/* Chloride (Cl-) */}
            <div className={styles.controlGroup}>
                <div className={styles.label}>
                    <span>Chloride (Cl-)</span>
                    <span className={styles.value}>{params.solutes.Cl}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="800"
                    value={params.solutes.Cl}
                    onChange={(e) => handleSoluteChange('Cl', e.target.value)}
                    className={styles.slider}
                />
            </div>

            {/* Action Button */}
            <button
                className={`${styles.runButton} ${isRunning ? styles.active : ''}`}
                onClick={onToggleRun}
            >
                {isRunning ? (
                    <>
                        <Square size={20} fill="currentColor" /> Stop Filtration
                    </>
                ) : (
                    <>
                        <Play size={20} fill="currentColor" /> Start RO Process
                    </>
                )}
            </button>
        </div>
    );
};

export default WaterControls;

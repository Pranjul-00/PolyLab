// src/pages/WaterAnalysis/WaterAnalysis.jsx
import React, { useState, useMemo } from 'react';
import { Droplet, Activity, Info, FlaskConical, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { WATER_SOURCES, COMPARISON_METRICS, EDTA_STEPS } from '../../data/WaterData';
import styles from './WaterAnalysis.module.css';

const WaterAnalysis = () => {
    const [selectedId, setSelectedId] = useState('tap');
    const [activeMetric, setActiveMetric] = useState('totalHardness');

    const selectedSource = WATER_SOURCES[selectedId];

    const chartData = useMemo(() => {
        return Object.values(WATER_SOURCES).map(source => ({
            name: source.name.split(' (')[0],
            value: source[activeMetric],
            id: source.id
        }));
    }, [activeMetric]);

    const getSuitabilityColor = (id) => {
        if (id === 'ro') return '#10b981';
        if (id === 'tap') return '#22d3ee';
        if (id === 'borewell') return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div className={styles.waterAnalysisPage}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Water Quality Dashboard</h1>
                    <p className={styles.subtitle}>Engineering Chemistry Lab Analysis & Standards</p>
                </div>
                <div className={styles.badge}>
                    <FlaskConical size={16} />
                    <span>Unit II: Water Technology</span>
                </div>
            </header>

            <div className={styles.dashboardGrid}>
                {/* 1. Source Selection & Key Metrics */}
                <div className={styles.panel}>
                    <h3 className={styles.sectionTitle}>
                        <Droplet size={18} /> Select Sample Source
                    </h3>
                    <div className={styles.sourceGrid}>
                        {Object.values(WATER_SOURCES).map(source => (
                            <button
                                key={source.id}
                                className={`${styles.sourceCard} ${selectedId === source.id ? styles.active : ''}`}
                                onClick={() => setSelectedId(source.id)}
                            >
                                <span className={styles.sourceName}>{source.name}</span>
                                <span className={styles.sourceTds}>{source.tds} ppm</span>
                            </button>
                        ))}
                    </div>

                    <div className={styles.metricsList}>
                        <div className={styles.metricItem}>
                            <span className={styles.mLabel}>pH Level</span>
                            <span className={styles.mValue} style={{ color: selectedSource.pH > 7.5 ? '#f59e0b' : '#22d3ee' }}>
                                {selectedSource.pH}
                            </span>
                        </div>
                        <div className={styles.metricItem}>
                            <span className={styles.mLabel}>Total Hardness</span>
                            <span className={styles.mValue}>{selectedSource.totalHardness} mg/L</span>
                        </div>
                        <div className={styles.metricItem}>
                            <span className={styles.mLabel}>Alkalinity (M)</span>
                            <span className={styles.mValue}>{selectedSource.alkalinityM} mg/L</span>
                        </div>
                    </div>

                    <div className={styles.suitabilityBox} style={{ borderColor: getSuitabilityColor(selectedId) }}>
                        <Info size={16} />
                        <p>{selectedSource.suitability}</p>
                    </div>
                </div>

                {/* 2. Comparison Analytics */}
                <div className={styles.panel}>
                    <div className={styles.chartHeader}>
                        <h3 className={styles.sectionTitle}>
                            <BarChart3 size={18} /> Comparative Analysis
                        </h3>
                        <select 
                            className={styles.metricSelect}
                            value={activeMetric}
                            onChange={(e) => setActiveMetric(e.target.value)}
                        >
                            {COMPARISON_METRICS.map(m => (
                                <option key={m.key} value={m.key}>{m.label}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className={styles.chartContainer}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                <XAxis 
                                    dataKey="name" 
                                    stroke="var(--color-text-secondary)" 
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis 
                                    stroke="var(--color-text-secondary)" 
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1e293b', 
                                        border: '1px solid var(--color-border-medium)',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={entry.id === selectedId ? 'var(--color-accent-cyan)' : 'rgba(34, 211, 238, 0.3)'} 
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className={styles.boilerIssues}>
                        <h4 className={styles.subTitle}>Potential Industrial Risks</h4>
                        <div className={styles.riskGrid}>
                            <div className={selectedSource.totalHardness > 300 ? styles.riskActive : styles.riskInactive}>
                                <span>Scale Formation</span>
                            </div>
                            <div className={selectedSource.alkalinityP > 30 ? styles.riskActive : styles.riskInactive}>
                                <span>Caustic Embrittlement</span>
                            </div>
                            <div className={selectedSource.chlorides > 100 ? styles.riskActive : styles.riskInactive}>
                                <span>Corrosion</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. EDTA Titration Guide */}
                <div className={styles.panel}>
                    <h3 className={styles.sectionTitle}>
                        <FlaskConical size={18} /> EDTA Titration Method
                    </h3>
                    <div className={styles.edtaTimeline}>
                        {EDTA_STEPS.map((step, idx) => (
                            <div key={idx} className={styles.edtaStep}>
                                <div className={styles.stepHeader}>
                                    <span className={styles.stepNumber}>{idx + 1}</span>
                                    <span className={styles.stepTitle}>{step.title}</span>
                                </div>
                                <p className={styles.stepDesc}>{step.description}</p>
                                <div className={styles.stepDetail}>
                                    <strong>Indicator:</strong> {step.colorChange}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className={styles.calculationNote}>
                        <strong>Hardness Calculation:</strong>
                        <p>Total Hardness = (V × M × 1000) / Sample Volume</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaterAnalysis;

import React, { useMemo } from 'react';
import { Activity, Droplet, Zap, ShieldAlert, BarChart3 } from 'lucide-react';
import styles from '../WaterAnalysis.module.css';

const DataPanel = ({ params, isRunning }) => {

    // Config matching the Simulation Canvas logic
    const ION_SIZES = {
        Na: 2.0,
        K: 2.5,
        Cl: 3.0,
        Mg: 4.0
    };

    const stats = useMemo(() => {
        // 1. Total Dissolved Solids (TDS) - Input (Feed)
        // Simple sum of ppm
        const feedTDS = Object.values(params.solutes).reduce((a, b) => a + b, 0);

        // 2. Output (Permeate) TDS Calculation
        // Logic: Calculate rejection for each ion based on Nanotube Porosity
        let permeateTDS = 0;
        let permeateMg = 0;

        Object.entries(params.solutes).forEach(([ion, concentration]) => {
            const ionSize = ION_SIZES[ion];
            // If Porosity < IonSize, Rejection is High (Good).
            // If Porosity > IonSize, Rejection is Low (Bad).

            // Rejection Factor (0 to 1)
            // sigmoid-like transition around the size match
            let passageFactor = 0;
            if (params.porosity > ionSize) {
                // Pore is bigger than ion -> Passes easily (Passage ~ 90-100%)
                passageFactor = 0.95;
            } else {
                // Pore is smaller -> Rejected largely
                // Some might leak if pressure is huge (simulated leak)
                // Leak increases with Pressure?
                const leak = (params.pressure / 1000) * 0.05; // max 5% leak
                passageFactor = leak;
            }

            const outputConc = concentration * passageFactor;
            permeateTDS += outputConc;

            if (ion === 'Mg') permeateMg = outputConc;
        });

        // 3. Efficiency (Rejection Rate)
        const efficiency = ((feedTDS - permeateTDS) / feedTDS) * 100;

        // 4. Hardness (Assuming Mg is main contributor here for simplicity)
        // mg/L CaCO3 eq. approx = Mg_ppm * 4.12
        const hardnessFeed = params.solutes.Mg * 4.12;
        const hardnessPermeate = permeateMg * 4.12;

        // 5. Energy (kWh/m3) - correlated to Pressure
        // 1000 PSI is roughly 60-70 bar. SWRO uses ~3-4 kWh/m3.
        // Let's map 100-1000 PSI to 0.5 - 5.0 kWh
        const energy = isRunning ? (params.pressure / 1000) * 5 : 0;

        return {
            feedTDS: Math.round(feedTDS),
            permeateTDS: Math.round(permeateTDS),
            efficiency: Math.max(0, efficiency).toFixed(1),
            hardnessFeed: Math.round(hardnessFeed),
            hardnessPermeate: Math.round(hardnessPermeate),
            energy: energy.toFixed(2)
        };
    }, [params, isRunning]);

    return (
        <div className={`${styles.panel} ${styles.dataPanel}`}>
            <h3 className={styles.title} style={{ fontSize: '1.25rem' }}>
                <Activity size={20} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} />
                Analysis Data
            </h3>

            <div className={styles.statsGrid}>
                {/* Filtration Efficiency */}
                <div className={styles.statCard} style={{ borderColor: 'var(--color-accent-cyan)' }}>
                    <div className={styles.statLabel}>Removal Efficiency</div>
                    <div className={styles.statValue} style={{ color: 'var(--color-accent-cyan)' }}>
                        {stats.efficiency}%
                    </div>
                </div>

                {/* TDS Comparison */}
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>TDS (Total Dissolved Solids)</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <div className={styles.statValue}>{stats.feedTDS}<span className={styles.statUnit}>ppm</span></div>
                            <div className={styles.statLabel} style={{ fontSize: '10px' }}>FEED</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div className={styles.statValue} style={{ color: stats.permeateTDS < 100 ? '#4ade80' : '#f472b6' }}>
                                {stats.permeateTDS}<span className={styles.statUnit}>ppm</span>
                            </div>
                            <div className={styles.statLabel} style={{ fontSize: '10px' }}>PERMEATE</div>
                        </div>
                    </div>
                </div>

                {/* Hardness */}
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Water Hardness (Mg++)</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <div className={styles.statValue}>{stats.hardnessFeed}</div>
                            <div className={styles.statLabel} style={{ fontSize: '10px' }}>INPUT</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div className={styles.statValue}>{stats.hardnessPermeate}</div>
                            <div className={styles.statLabel} style={{ fontSize: '10px' }}>OUTPUT</div>
                        </div>
                    </div>
                    {stats.hardnessPermeate > 120 && (
                        <div style={{ color: '#f472b6', fontSize: '11px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <ShieldAlert size={12} /> High Hardness Detected
                        </div>
                    )}
                </div>

                {/* Energy */}
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Est. Energy Consumption</div>
                    <div className={styles.statValue}>
                        {stats.energy}<span className={styles.statUnit}>kWh/m³</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataPanel;

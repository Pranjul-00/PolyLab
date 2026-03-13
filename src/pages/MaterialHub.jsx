// src/pages/MaterialHub.jsx
import React, { useState } from 'react';
import { Atom, Beaker, FlaskConical, ChevronDown, ChevronUp, Info, Activity, Layers, Database } from 'lucide-react';
import MoleculeViewer from '../components/MoleculeViewer';
import { MOLECULE_LIBRARY, ATOM_COLORS } from '../MolecularStructures';
import styles from './MaterialHub.module.css';

const MaterialHub = () => {
    const [selectedMoleculeKey, setSelectedMoleculeKey] = useState('ethylene');
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    
    const selectedMolecule = MOLECULE_LIBRARY[selectedMoleculeKey];

    const molecules = [
        { key: 'ethylene', data: MOLECULE_LIBRARY.ethylene, icon: Atom, color: '#22d3ee', category: 'Polyethylene' },
        { key: 'styrene', data: MOLECULE_LIBRARY.styrene, icon: Activity, color: '#a78bfa', category: 'Polystyrene' },
        { key: 'phenol', data: MOLECULE_LIBRARY.phenol, icon: Beaker, color: '#f472b6', category: 'Bakelite' },
        { key: 'formaldehyde', data: MOLECULE_LIBRARY.formaldehyde, icon: FlaskConical, color: '#fb923c', category: 'Bakelite' },
        { key: 'adipicAcid', data: MOLECULE_LIBRARY.adipicAcid, icon: Layers, color: '#4ade80', category: 'Nylon-6,6' },
        { key: 'hexamethylenediamine', data: MOLECULE_LIBRARY.hexamethylenediamine, icon: Database, color: '#fbbf24', category: 'Nylon-6,6' },
    ];

    const handleMoleculeSelect = (key) => {
        setSelectedMoleculeKey(key);
        setIsSelectorOpen(false);
    };

    return (
        <div className={styles.materialHub}>
            {/* Header */}
            <header className={styles.header}>
                <h1 className={styles.title}>
                    <Atom size={40} />
                    <span>3D Material Hub</span>
                </h1>
                <p className={styles.subtitle}>
                    Explore high-fidelity 3D molecular structures of essential polymer monomers. 
                    Scientifically accurate coordinates rendered with real-time lighting and interactive controls.
                </p>
            </header>

            {/* Molecule Selector Dropdown */}
            <div className={styles.selectorContainer}>
                <button
                    className={styles.selectorButton}
                    onClick={() => setIsSelectorOpen(!isSelectorOpen)}
                >
                    <div className={styles.selectorButtonContent}>
                        {(() => {
                            const MolIcon = molecules.find(m => m.key === selectedMoleculeKey)?.icon || Atom;
                            return <MolIcon size={20} />;
                        })()}
                        <span>Selected: {selectedMolecule.name}</span>
                    </div>
                    {isSelectorOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {isSelectorOpen && (
                    <div className={styles.selectorDropdown}>
                        {molecules.map((mol) => (
                            <button
                                key={mol.key}
                                className={`${styles.moleculeOption} ${selectedMoleculeKey === mol.key ? styles.active : ''}`}
                                onClick={() => handleMoleculeSelect(mol.key)}
                                style={{ '--card-color': mol.color }}
                            >
                                <mol.icon size={24} />
                                <div className={styles.optionContent}>
                                    <span className={styles.optionName}>{mol.data.name}</span>
                                    <span className={styles.optionFormula}>{mol.data.formula}</span>
                                </div>
                                <span className={styles.optionCategory}>{mol.category}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Main Display Area */}
            <main className={styles.displayArea}>
                <div className={styles.viewerWrapper}>
                    <MoleculeViewer molecule={selectedMolecule} autoRotate={true} />
                </div>

                <div className={styles.infoPanel}>
                    <div className={styles.infoScroll}>
                        <div className={styles.infoMain}>
                            <h2>{selectedMolecule.name}</h2>
                            <p className={styles.formula}>{selectedMolecule.formula}</p>
                            <div className={styles.polyType}>
                                <strong>Polymer:</strong> {selectedMolecule.polymerType}
                            </div>
                        </div>

                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Description</h3>
                            <p className={styles.descriptionText}>{selectedMolecule.description}</p>
                        </div>

                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Physical Properties</h3>
                            <div className={styles.propertiesTable}>
                                {Object.entries(selectedMolecule.properties).map(([key, value]) => (
                                    <div key={key} className={styles.propItem}>
                                        <span className={styles.propLabel}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                        <span className={styles.propValue}>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Applications</h3>
                            <ul className={styles.applicationsList}>
                                {selectedMolecule.applications.map((app, idx) => (
                                    <li key={idx}>{app}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            {/* Legend Section */}
            <div className={styles.legend}>
                <h3 className={styles.sectionTitle}>Atom Legend (CPK)</h3>
                <div className={styles.legendGrid}>
                    <div className={styles.legendItem}>
                        <div className={styles.atomDot} style={{ background: ATOM_COLORS.C }}></div>
                        <span>Carbon (C)</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div className={styles.atomDot} style={{ background: ATOM_COLORS.H }}></div>
                        <span>Hydrogen (H)</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div className={styles.atomDot} style={{ background: ATOM_COLORS.O }}></div>
                        <span>Oxygen (O)</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div className={styles.atomDot} style={{ background: ATOM_COLORS.N }}></div>
                        <span>Nitrogen (N)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaterialHub;

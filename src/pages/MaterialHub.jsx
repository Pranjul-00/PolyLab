// src/pages/MaterialHub.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Atom, Beaker, FlaskConical, ChevronDown, ChevronUp } from 'lucide-react';
import MoleculeViewer3D from '../components/MoleculeViewer3D';
import { MOLECULE_LIBRARY } from '../MolecularStructures';
import styles from './MaterialHub.module.css';

const MaterialHub = () => {
    const [selectedMoleculeKey, setSelectedMoleculeKey] = useState('ethylene');
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    
    const selectedMolecule = MOLECULE_LIBRARY[selectedMoleculeKey];

    const molecules = [
        { key: 'ethylene', data: MOLECULE_LIBRARY.ethylene, icon: Atom, color: '#22d3ee', category: 'Polyethylene' },
        { key: 'styrene', data: MOLECULE_LIBRARY.styrene, icon: Atom, color: '#a78bfa', category: 'Polystyrene' },
        { key: 'phenol', data: MOLECULE_LIBRARY.phenol, icon: Beaker, color: '#f472b6', category: 'Bakelite' },
        { key: 'formaldehyde', data: MOLECULE_LIBRARY.formaldehyde, icon: FlaskConical, color: '#fb923c', category: 'Bakelite' },
        { key: 'adipicAcid', data: MOLECULE_LIBRARY.adipicAcid, icon: Beaker, color: '#4ade80', category: 'Nylon-6,6' },
        { key: 'hexamethylenediamine', data: MOLECULE_LIBRARY.hexamethylenediamine, icon: FlaskConical, color: '#fbbf24', category: 'Nylon-6,6' },
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
                    <Atom size={36} />
                    3D Material Hub
                </h1>
                <p className={styles.subtitle}>
                    Advanced molecular explorer featuring real-time 3D simulation, 
                    dynamic structure fetching, and interactive visualization modes.
                </p>
            </header>

            {/* Molecule Selector Dropdown */}
            <div className={styles.selectorContainer}>
                <button
                    className={styles.selectorButton}
                    onClick={() => setIsSelectorOpen(!isSelectorOpen)}
                >
                    <div className={styles.selectorButtonContent}>
                        <Atom size={20} />
                        <span>Selected: {selectedMolecule.name}</span>
                    </div>
                    {isSelectorOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {isSelectorOpen && (
                    <div className={styles.selectorDropdown}>
                        {molecules.map((molecule) => (
                            <button
                                key={molecule.key}
                                className={`${styles.moleculeOption} ${selectedMoleculeKey === molecule.key ? styles.active : ''}`}
                                onClick={() => handleMoleculeSelect(molecule.key)}
                                style={{ '--card-color': molecule.color }}
                            >
                                <molecule.icon size={24} />
                                <div className={styles.optionContent}>
                                    <span className={styles.optionName}>{molecule.data.name}</span>
                                    <span className={styles.optionFormula}>{molecule.data.formula}</span>
                                </div>
                                <span className={styles.optionCategory}>{molecule.category}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Main Content - Simplified to just the Viewer */}
            <main className={styles.singleContent}>
                <div className={styles.viewerWrapper}>
                    <MoleculeViewer3D molecule={selectedMolecule} />
                </div>
            </main>
        </div>
    );
};

export default MaterialHub;

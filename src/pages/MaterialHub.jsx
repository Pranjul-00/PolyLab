// src/pages/MaterialHub.jsx
import React, { useState, useRef } from 'react';
import { Atom, Beaker, FlaskConical, ChevronDown, ChevronUp, Maximize, Minimize } from 'lucide-react';
import MoleculeViewer from '../components/MoleculeViewer';
import { MOLECULE_LIBRARY } from '../MolecularStructures';
import styles from './MaterialHub.module.css';

const MaterialHub = () => {
    const [selectedMolecule, setSelectedMolecule] = useState(MOLECULE_LIBRARY.ethylene);
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const viewerPanelRef = useRef();

    const molecules = [
        { key: 'ethylene', data: MOLECULE_LIBRARY.ethylene, icon: Atom, color: '#22d3ee', category: 'Polyethylene' },
        { key: 'styrene', data: MOLECULE_LIBRARY.styrene, icon: Atom, color: '#a78bfa', category: 'Polystyrene' },
        { key: 'phenol', data: MOLECULE_LIBRARY.phenol, icon: Beaker, color: '#f472b6', category: 'Bakelite' },
        { key: 'formaldehyde', data: MOLECULE_LIBRARY.formaldehyde, icon: FlaskConical, color: '#fb923c', category: 'Bakelite' },
        { key: 'adipicAcid', data: MOLECULE_LIBRARY.adipicAcid, icon: Beaker, color: '#4ade80', category: 'Nylon-6,6' },
        { key: 'hexamethylenediamine', data: MOLECULE_LIBRARY.hexamethylenediamine, icon: FlaskConical, color: '#fbbf24', category: 'Nylon-6,6' },
    ];

    const handleMoleculeSelect = (molecule) => {
        setSelectedMolecule(molecule.data);
        setIsSelectorOpen(false);
    };

    const toggleFullscreen = async () => {
        if (!viewerPanelRef.current) return;

        try {
            if (!document.fullscreenElement) {
                await viewerPanelRef.current.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (err) {
            console.error('Fullscreen error:', err);
        }
    };

    // Listen for fullscreen changes
    React.useEffect(() => {
        const handleFullscreenChange = () => {
            const isNowFullscreen = !!document.fullscreenElement;
            setIsFullscreen(isNowFullscreen);

            // Force a small delay to ensure layout recalculates properly
            if (!isNowFullscreen) {
                setTimeout(() => {
                    window.dispatchEvent(new Event('resize'));
                }, 100);
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    return (
        <div className={styles.materialHub}>
            {/* Header */}
            <header className={styles.header}>
                <h1 className={styles.title}>
                    <Atom size={36} />
                    3D Material Hub
                </h1>
                <p className={styles.subtitle}>
                    Explore polymer monomers and building blocks with interactive 3D visualization
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
                                className={`${styles.moleculeOption} ${selectedMolecule.name === molecule.data.name ? styles.active : ''}`}
                                onClick={() => handleMoleculeSelect(molecule)}
                                style={{ '--card-color': molecule.color }}
                            >
                                <molecule.icon size={20} />
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

            {/* Main Content: Viewer and Info Side by Side */}
            <div className={styles.mainContent}>
                {/* 3D Viewer */}
                <div className={styles.viewerPanel} ref={viewerPanelRef}>
                    <button
                        className={styles.fullscreenButton}
                        onClick={toggleFullscreen}
                        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    >
                        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                    </button>
                    <MoleculeViewer molecule={selectedMolecule} />
                </div>

                {/* Information Panel */}
                {!isFullscreen && (
                    <div className={styles.infoPanel}>
                        <h2>{selectedMolecule.name}</h2>

                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Formula</span>
                                <span className={styles.infoValue}>{selectedMolecule.formula}</span>
                            </div>
                            {selectedMolecule.polymerType && (
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Polymer</span>
                                    <span className={styles.infoValue}>{selectedMolecule.polymerType}</span>
                                </div>
                            )}
                        </div>

                        <div className={styles.description}>
                            <p>{selectedMolecule.description}</p>
                        </div>

                        {selectedMolecule.polymerizationType && (
                            <div className={styles.polyType}>
                                <strong>Polymerization:</strong> {selectedMolecule.polymerizationType}
                            </div>
                        )}

                        {selectedMolecule.properties && (
                            <div className={styles.section}>
                                <h3>Physical Properties</h3>
                                <div className={styles.propertiesGrid}>
                                    {Object.entries(selectedMolecule.properties).map(([key, value]) => (
                                        <div key={key} className={styles.propertyItem}>
                                            <span className={styles.propertyKey}>
                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                            </span>
                                            <span className={styles.propertyValue}>{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedMolecule.applications && (
                            <div className={styles.section}>
                                <h3>Applications</h3>
                                <ul className={styles.applicationsList}>
                                    {selectedMolecule.applications.map((app, idx) => (
                                        <li key={idx}>{app}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Color Legend */}
            <div className={styles.legend}>
                <h3>CPK Color Scheme</h3>
                <div className={styles.legendGrid}>
                    <div className={styles.legendItem}>
                        <span className={styles.atomDot} style={{ background: '#FFFFFF' }}></span>
                        <span>Hydrogen (H)</span>
                    </div>
                    <div className={styles.legendItem}>
                        <span className={styles.atomDot} style={{ background: '#909090' }}></span>
                        <span>Carbon (C)</span>
                    </div>
                    <div className={styles.legendItem}>
                        <span className={styles.atomDot} style={{ background: '#3050F8' }}></span>
                        <span>Nitrogen (N)</span>
                    </div>
                    <div className={styles.legendItem}>
                        <span className={styles.atomDot} style={{ background: '#FF0D0D' }}></span>
                        <span>Oxygen (O)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaterialHub;

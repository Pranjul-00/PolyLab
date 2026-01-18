// src/pages/MaterialHub.jsx
import React, { useState } from 'react';
import { Atom, Beaker, FlaskConical } from 'lucide-react';
import MoleculeViewer from '../components/MoleculeViewer';
import { MOLECULE_LIBRARY } from '../MolecularStructures';
import styles from './MaterialHub.module.css';

function MaterialHub() {
    const [selectedMolecule, setSelectedMolecule] = useState(MOLECULE_LIBRARY.ethylene);

    const moleculeCards = [
        {
            id: 'ethylene',
            name: 'Ethylene',
            formula: 'C₂H₄',
            category: 'Polyethylene',
            icon: <Atom size={24} />,
            color: '#22d3ee',
        },
        {
            id: 'styrene',
            name: 'Styrene',
            formula: 'C₈H₈',
            category: 'Polystyrene',
            icon: <Beaker size={24} />,
            color: '#a78bfa',
        },
        {
            id: 'phenol',
            name: 'Phenol',
            formula: 'C₆H₅OH',
            category: 'Bakelite',
            icon: <FlaskConical size={24} />,
            color: '#f59e0b',
        },
        {
            id: 'formaldehyde',
            name: 'Formaldehyde',
            formula: 'CH₂O',
            category: 'Bakelite',
            icon: <FlaskConical size={24} />,
            color: '#f59e0b',
        },
        {
            id: 'adipicAcid',
            name: 'Adipic Acid',
            formula: 'C₆H₁₀O₄',
            category: 'Nylon-6,6',
            icon: <Beaker size={24} />,
            color: '#ec4899',
        },
        {
            id: 'hexamethylenediamine',
            name: 'Hexamethylenediamine',
            formula: 'C₆H₁₆N₂',
            category: 'Nylon-6,6',
            icon: <Beaker size={24} />,
            color: '#ec4899',
        },
    ];

    return (
        <div className={styles.materialHub}>
            {/* Header */}
            <header className={styles.header}>
                <h1 className={styles.title}>
                    <Atom size={32} />
                    <span>3D Material Hub</span>
                </h1>
                <p className={styles.subtitle}>
                    Explore real molecular structures of polymer monomers and building blocks
                </p>
            </header>

            {/* Main Content */}
            <div className={styles.content}>
                {/* Molecule Library Sidebar */}
                <aside className={styles.sidebar}>
                    <h2 className={styles.sidebarTitle}>Molecule Library</h2>
                    <div className={styles.moleculeGrid}>
                        {moleculeCards.map((card) => (
                            <button
                                key={card.id}
                                className={`${styles.moleculeCard} ${selectedMolecule === MOLECULE_LIBRARY[card.id] ? styles.active : ''
                                    }`}
                                onClick={() => setSelectedMolecule(MOLECULE_LIBRARY[card.id])}
                                style={{ '--card-color': card.color }}
                            >
                                <div className={styles.cardIcon}>{card.icon}</div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardName}>{card.name}</h3>
                                    <p className={styles.cardFormula}>{card.formula}</p>
                                    <span className={styles.cardCategory}>{card.category}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* 3D Viewer */}
                <main className={styles.viewerSection}>
                    <MoleculeViewer molecule={selectedMolecule} />
                </main>
            </div>

            {/* Educational Info */}
            <section className={styles.infoSection}>
                <div className={styles.infoCard}>
                    <h3>About This Module</h3>
                    <p>
                        The 3D Material Hub visualizes real molecular structures using atomic coordinates.
                        Each atom is represented by a sphere (CPK coloring) and bonds are shown as cylinders.
                        Rotate, zoom, and explore these molecules to understand their 3D geometry.
                    </p>
                </div>
                <div className={styles.infoCard}>
                    <h3>Color Legend</h3>
                    <div className={styles.colorLegend}>
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
            </section>
        </div>
    );
}

export default MaterialHub;

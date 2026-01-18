// src/components/MoleculeViewer3D.jsx
// Enhanced molecular viewer using 3Dmol.js and PubChem API
import React, { useRef, useEffect, useState } from 'react';
import $3Dmol from '3dmol';
import styles from './MoleculeViewer.module.css';

function MoleculeViewer3D({ molecule }) {
    const viewerRef = useRef(null);
    const containerRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!molecule || !containerRef.current) return;

        setLoading(true);
        setError(null);

        // Clear previous viewer
        if (viewerRef.current) {
            containerRef.current.innerHTML = '';
        }

        // Create 3Dmol viewer
        const config = { backgroundColor: '#050505' };
        const viewer = $3Dmol.createViewer(containerRef.current, config);
        viewerRef.current = viewer;

        // PubChem CID mapping for our molecules
        const pubchemCIDs = {
            'Ethylene': 6325,
            'Styrene': 7501,
            'Phenol': 996,
            'Formaldehyde': 712,
            'Adipic Acid': 196,
            'Hexamethylenediamine': 3286,
        };

        const cid = pubchemCIDs[molecule.name];

        if (cid) {
            // Fetch 3D structure from PubChem
            const pubchemURL = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/record/SDF/?record_type=3d`;

            fetch(pubchemURL)
                .then(response => {
                    if (!response.ok) throw new Error('Failed to fetch molecule data');
                    return response.text();
                })
                .then(sdfData => {
                    // Add molecule to viewer
                    viewer.addModel(sdfData, 'sdf');

                    // Set style - stick and sphere representation
                    viewer.setStyle({}, {
                        stick: {
                            radius: 0.15,
                            colorscheme: 'Jmol'
                        },
                        sphere: {
                            scale: 0.25,
                            colorscheme: 'Jmol'
                        }
                    });

                    // Add labels for atoms
                    viewer.addPropertyLabels('elem', {}, {
                        fontColor: 'white',
                        fontSize: 12,
                        showBackground: false,
                        alignment: 'center'
                    });

                    // Center and zoom
                    viewer.zoomTo();
                    viewer.zoom(1.2);

                    // Enable rotation
                    viewer.rotate(10, { x: 1, y: 1, z: 0 });

                    // Render
                    viewer.render();

                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error loading molecule:', err);
                    setError('Failed to load 3D structure. Using fallback view.');

                    // Fallback: Create simple representation
                    createFallbackView(viewer, molecule);
                    setLoading(false);
                });
        } else {
            // No PubChem CID, use fallback
            createFallbackView(viewer, molecule);
            setLoading(false);
        }

        // Cleanup
        return () => {
            if (viewerRef.current) {
                // 3Dmol cleanup is automatic
            }
        };
    }, [molecule]);

    // Fallback view using our custom coordinates
    const createFallbackView = (viewer, mol) => {
        if (!mol.atoms || !mol.bonds) return;

        // Create XYZ format string from our data
        let xyzString = `${mol.atoms.length}\n${mol.name}\n`;
        mol.atoms.forEach(atom => {
            xyzString += `${atom.element} ${atom.x} ${atom.y} ${atom.z}\n`;
        });

        viewer.addModel(xyzString, 'xyz');
        viewer.setStyle({}, {
            stick: { radius: 0.15, colorscheme: 'Jmol' },
            sphere: { scale: 0.3, colorscheme: 'Jmol' }
        });
        viewer.zoomTo();
        viewer.render();
    };

    return (
        <div className={styles.viewerContainer}>
            <div
                ref={containerRef}
                className={styles.viewer}
                style={{ position: 'relative' }}
            >
                {loading && (
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <p>Loading 3D structure...</p>
                    </div>
                )}
                {error && (
                    <div className={styles.error}>
                        <p>{error}</p>
                    </div>
                )}
            </div>

            {molecule && (
                <div className={styles.moleculeInfo}>
                    <h3>{molecule.name}</h3>

                    <div className={styles.infoSection}>
                        <div>
                            <p className={styles.label}>Formula</p>
                            <p className={styles.formula}>{molecule.formula}</p>
                        </div>
                        {molecule.polymerType && (
                            <div>
                                <p className={styles.label}>Polymer</p>
                                <p className={styles.value}>{molecule.polymerType}</p>
                            </div>
                        )}
                    </div>

                    <p className={styles.description}>{molecule.description}</p>

                    {molecule.polymerizationType && (
                        <div className={styles.polyType}>
                            <strong>Polymerization:</strong> {molecule.polymerizationType}
                        </div>
                    )}

                    {molecule.properties && (
                        <div className={styles.properties}>
                            <strong>Physical Properties:</strong>
                            <ul>
                                {Object.entries(molecule.properties).map(([key, value]) => (
                                    <li key={key}>
                                        <span className={styles.propKey}>
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                                        </span> {value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {molecule.applications && (
                        <div className={styles.applications}>
                            <strong>Applications:</strong>
                            <ul>
                                {molecule.applications.map((app, idx) => (
                                    <li key={idx}>{app}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className={styles.dataSource}>
                        <small>3D structure from <a href="https://pubchem.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer">PubChem</a></small>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MoleculeViewer3D;

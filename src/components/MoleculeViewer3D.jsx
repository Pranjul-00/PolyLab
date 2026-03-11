// src/components/MoleculeViewer3D.jsx
// Enhanced molecular viewer using 3Dmol.js and PubChem API
import React, { useRef, useEffect, useState, useCallback } from 'react';
import $3Dmol from '3dmol';
import { Box, Play, Pause, Layers, Circle, Activity } from 'lucide-react';
import styles from './MoleculeViewer.module.css';

const VIS_MODES = {
    BALL_STICK: 'Ball & Stick',
    STICK: 'Sticks Only',
    SPHERE: 'Van der Waals (Spheres)',
    SURFACE: 'Molecular Surface'
};

function MoleculeViewer3D({ molecule }) {
    const viewerRef = useRef(null);
    const containerRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visMode, setVisMode] = useState('BALL_STICK');
    const [isAnimating, setIsAnimating] = useState(true);
    const [vibrationIntensity, setVibrationIntensity] = useState(0);
    const animationFrameRef = useRef(null);

    // PubChem CID mapping for our molecules
    const pubchemCIDs = {
        'Ethylene': 6325,
        'Styrene': 7501,
        'Phenol': 996,
        'Formaldehyde': 712,
        'Adipic Acid': 196,
        'Hexamethylenediamine': 3286,
    };

    const applyStyle = useCallback((viewer, mode) => {
        if (!viewer) return;

        viewer.removeAllShapes();
        viewer.removeAllSurfaces();

        switch (mode) {
            case 'STICK':
                viewer.setStyle({}, { stick: { radius: 0.2, colorscheme: 'Jmol' } });
                break;
            case 'SPHERE':
                viewer.setStyle({}, { sphere: { scale: 0.8, colorscheme: 'Jmol' } });
                break;
            case 'SURFACE':
                viewer.setStyle({}, { stick: { radius: 0.1, colorscheme: 'Jmol' } });
                viewer.addSurface($3Dmol.SurfaceType.VDW, { opacity: 0.5, color: 'white' }, {}, {});
                break;
            case 'BALL_STICK':
            default:
                viewer.setStyle({}, {
                    stick: { radius: 0.15, colorscheme: 'Jmol' },
                    sphere: { scale: 0.25, colorscheme: 'Jmol' }
                });
                break;
        }

        // Add labels for atoms if not in surface/sphere mode
        if (mode === 'BALL_STICK' || mode === 'STICK') {
            viewer.addPropertyLabels('elem', {}, {
                fontColor: 'white',
                fontSize: 10,
                showBackground: false,
                alignment: 'center'
            });
        }

        viewer.render();
    }, []);

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

        const cid = pubchemCIDs[molecule.name];

        if (cid) {
            const pubchemURL = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/record/SDF/?record_type=3d`;

            fetch(pubchemURL)
                .then(response => {
                    if (!response.ok) throw new Error('Failed to fetch molecule data');
                    return response.text();
                })
                .then(sdfData => {
                    viewer.addModel(sdfData, 'sdf');
                    applyStyle(viewer, visMode);
                    viewer.zoomTo();
                    viewer.zoom(1.2);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error loading molecule:', err);
                    setError('Failed to load 3D structure. Using fallback view.');
                    createFallbackView(viewer, molecule);
                    setLoading(false);
                });
        } else {
            createFallbackView(viewer, molecule);
            setLoading(false);
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [molecule, applyStyle]);

    // Handle visualization mode changes
    useEffect(() => {
        if (viewerRef.current && !loading) {
            applyStyle(viewerRef.current, visMode);
        }
    }, [visMode, loading, applyStyle]);

    // Animation Loop (Rotation + Thermal Motion)
    useEffect(() => {
        if (!viewerRef.current || loading) return;

        const animate = () => {
            if (isAnimating) {
                viewerRef.current.rotate(0.5, { x: 0, y: 1, z: 0 });
            }

            if (vibrationIntensity > 0) {
                // Simplified vibration: slightly jiggle atoms
                const model = viewerRef.current.getModel();
                if (model) {
                    // Note: Real displacement would require storing original coords
                    // For visual effect, we just apply a tiny random rotation/offset
                    viewerRef.current.rotate(vibrationIntensity * (Math.random() - 0.5), { x: 1, y: 0, z: 0 });
                }
            }

            viewerRef.current.render();
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameRef.current);
    }, [isAnimating, vibrationIntensity, loading]);

    const createFallbackView = (viewer, mol) => {
        if (!mol.atoms) return;
        let xyzString = `${mol.atoms.length}\n${mol.name}\n`;
        mol.atoms.forEach(atom => {
            xyzString += `${atom.element} ${atom.x} ${atom.y} ${atom.z}\n`;
        });
        viewer.addModel(xyzString, 'xyz');
        applyStyle(viewer, visMode);
        viewer.zoomTo();
    };

    return (
        <div className={styles.viewerContainer}>
            <div className={styles.viewerHeader}>
                <div className={styles.controls}>
                    <button
                        className={`${styles.controlBtn} ${isAnimating ? styles.active : ''}`}
                        onClick={() => setIsAnimating(!isAnimating)}
                        title={isAnimating ? "Pause Rotation" : "Play Rotation"}
                    >
                        {isAnimating ? <Pause size={16} /> : <Play size={16} />}
                    </button>

                    <div className={styles.visSelector}>
                        {Object.entries(VIS_MODES).map(([key, label]) => (
                            <button
                                key={key}
                                className={`${styles.visBtn} ${visMode === key ? styles.active : ''}`}
                                onClick={() => setVisMode(key)}
                                title={label}
                            >
                                {key === 'BALL_STICK' && <Box size={16} />}
                                {key === 'STICK' && <Layers size={16} />}
                                {key === 'SPHERE' && <Circle size={16} />}
                                {key === 'SURFACE' && <Activity size={16} />}
                            </button>
                        ))}
                    </div>

                    <div className={styles.vibrationControl}>
                        <Activity size={14} className={styles.icon} />
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={vibrationIntensity}
                            onChange={(e) => setVibrationIntensity(parseFloat(e.target.value))}
                            className={styles.slider}
                            title="Thermal Vibration Intensity"
                        />
                    </div>
                </div>
            </div>

            <div ref={containerRef} className={styles.viewer}>
                {loading && (
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <p>Loading 3D structure...</p>
                    </div>
                )}
                {error && <div className={styles.error}><p>{error}</p></div>}
            </div>

            {molecule && (
                <div className={styles.moleculeInfo}>
                    <h3>{molecule.name}</h3>
                    <div className={styles.infoSection}>
                        <p className={styles.label}>Formula</p>
                        <p className={styles.formula}>{molecule.formula}</p>
                    </div>
                    <p className={styles.description}>{molecule.description}</p>
                    <div className={styles.properties}>
                        <strong>Physical Properties</strong>
                        <ul>
                            {Object.entries(molecule.properties).map(([key, value]) => (
                                <li key={key}><span className={styles.propKey}>{key}:</span> {value}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.dataSource}>
                        <small>Data: PubChem (Dynamic) / Local Fallback</small>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MoleculeViewer3D;


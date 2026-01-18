// src/components/MoleculeViewer.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ATOM_COLORS, ATOM_RADII } from '../MolecularStructures';
import styles from './MoleculeViewer.module.css';

function MoleculeViewer({ molecule }) {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const controlsRef = useRef(null);

    useEffect(() => {
        if (!molecule || !mountRef.current) return;

        // Clear any existing canvas
        while (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild);
        }

        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x050505);
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 10;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.5;
        controlsRef.current = controls;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight1.position.set(5, 5, 5);
        scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
        directionalLight2.position.set(-5, -5, -5);
        scene.add(directionalLight2);

        // Create atoms
        molecule.atoms.forEach((atom) => {
            const radius = ATOM_RADII[atom.element] || 0.4;
            const geometry = new THREE.SphereGeometry(radius, 32, 32);
            const material = new THREE.MeshPhongMaterial({
                color: ATOM_COLORS[atom.element] || 0xcccccc,
                shininess: 30,
            });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(atom.x, atom.y, atom.z);
            scene.add(sphere);

            // Add atom label (element symbol)
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 64;
            canvas.height = 64;
            context.fillStyle = 'white';
            context.font = 'bold 48px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(atom.element, 32, 32);

            const texture = new THREE.CanvasTexture(canvas);
            const spriteMaterial = new THREE.SpriteMaterial({ map: texture, sizeAttenuation: false });
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.position.set(atom.x, atom.y + radius + 0.3, atom.z);
            sprite.scale.set(0.15, 0.15, 1);
            scene.add(sprite);
        });

        // Create bonds
        molecule.bonds.forEach((bond) => {
            const sourceAtom = molecule.atoms[bond.source];
            const targetAtom = molecule.atoms[bond.target];

            const start = new THREE.Vector3(sourceAtom.x, sourceAtom.y, sourceAtom.z);
            const end = new THREE.Vector3(targetAtom.x, targetAtom.y, targetAtom.z);
            const direction = new THREE.Vector3().subVectors(end, start);
            const length = direction.length();
            const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

            // Cylinder for bond
            const bondRadius = bond.order === 2 ? 0.08 : 0.06;
            const geometry = new THREE.CylinderGeometry(bondRadius, bondRadius, length, 8);
            const material = new THREE.MeshPhongMaterial({ color: 0x666666 });
            const cylinder = new THREE.Mesh(geometry, material);

            // Position and rotate cylinder
            cylinder.position.copy(midpoint);
            cylinder.quaternion.setFromUnitVectors(
                new THREE.Vector3(0, 1, 0),
                direction.clone().normalize()
            );

            scene.add(cylinder);

            // For double bonds, add a second cylinder slightly offset
            if (bond.order === 2) {
                const offset = new THREE.Vector3(0.15, 0, 0);
                const cylinder2 = cylinder.clone();
                cylinder2.position.add(offset);
                scene.add(cylinder2);
            }
        });

        // Center the molecule
        const box = new THREE.Box3().setFromObject(scene);
        const center = box.getCenter(new THREE.Vector3());
        scene.position.sub(center);

        // Adjust camera to fit molecule
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.z = maxDim * 2;

        // Animation loop
        let animationId;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Handle window resize
        const handleResize = () => {
            if (!mountRef.current) return;
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);

            // Dispose of geometries and materials
            scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });

            if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            controls.dispose();
        };
    }, [molecule]);

    return (
        <div className={styles.viewerContainer}>
            <div ref={mountRef} className={styles.viewer} />
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
                                        <span className={styles.propKey}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span> {value}
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
                </div>
            )}
        </div>
    );
}

export default MoleculeViewer;

import React, { useRef, useEffect, useState } from 'react';
import styles from '../WaterAnalysis.module.css';

const SimulationCanvas = ({ params, isRunning }) => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationRef = useRef(null);
    const containerRef = useRef(null);

    // Particle Configuration
    const ION_CONFIG = {
        Na: { color: '#22d3ee', size: 2, mass: 1 },  // Cyan
        K: { color: '#60a5fa', size: 2.5, mass: 1.2 }, // Blue
        Mg: { color: '#f472b6', size: 4, mass: 2 },  // Pink (Hardness)
        Cl: { color: '#94a3b8', size: 3, mass: 1.5 } // Gray
    };

    // Initialize Particles based on density
    const initParticles = (width, height) => {
        const particles = [];
        const membraneX = width / 2;

        // Scale factor: e.g. 500ppm -> 50 particles
        Object.entries(params.solutes).forEach(([ion, ppm]) => {
            const count = Math.ceil(ppm / 10);
            const config = ION_CONFIG[ion];

            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * (membraneX - 20), // Start in feed side
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    type: ion,
                    ...config
                });
            }
        });
        return particles;
    };

    useEffect(() => {
        // Initial setup or reset
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        // Resize handling
        const updateSize = () => {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            particlesRef.current = initParticles(canvas.width, canvas.height);
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, [params.solutes]); // Re-init if solutes change manually (unless running? maybe better to not reset during run)

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const render = () => {
            if (!canvas) return;
            const width = canvas.width;
            const height = canvas.height;
            const membraneX = width / 2;

            // Clear
            ctx.clearRect(0, 0, width, height);

            // Draw Membrane
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 2;
            ctx.moveTo(membraneX, 0);
            ctx.lineTo(membraneX, height);
            ctx.stroke();

            // Draw Nanotubes (Visual styling for membrane)
            ctx.fillStyle = 'rgba(34, 211, 238, 0.1)';
            ctx.fillRect(membraneX - 5, 0, 10, height);

            // Update & Draw Particles
            particlesRef.current.forEach(p => {
                // Physics
                if (isRunning) {
                    // Pressure force (push to right)
                    // Pressure 100-1000 PSI maps to acceleration 0.01 - 0.1
                    const pressureForce = (params.pressure / 1000) * 0.2;
                    p.vx += pressureForce * 0.1; // Add x-velocity
                }

                // Browninan Motion / Jitter
                p.vx += (Math.random() - 0.5) * 0.1;
                p.vy += (Math.random() - 0.5) * 0.1;

                // Damping
                p.vx *= 0.95;
                p.vy *= 0.95;

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Walls (Top/Bottom/Left/Right)
                if (p.y < 0 || p.y > height) p.vy *= -1;
                if (p.x < 0) p.vx = Math.abs(p.vx); // Bounce off left wall
                if (p.x > width) p.vx = -Math.abs(p.vx); // Bounce off right wall

                // Membrane Collision Logic
                // If hitting membrane from left
                if (p.x + p.size > membraneX - 5 && p.x < membraneX && p.vx > 0) {
                    // Check Porosity
                    // Visual scale: Porosity 0.5nm - 5nm. 
                    // Particle sizes are 2-4 px. Let's say 1nm = 1px for logic comparison, 
                    // or just compare raw values if calibrated.
                    // Logic: If Particle Size < Porosity * Scale, Pass.
                    // Let's assume params.porosity is "diameter in nm".
                    // Let's assume particle config size equals diameter in "relative nm".

                    if (p.size < params.porosity) {
                        // Pass through (Permeate)
                    } else {
                        // Reject (Retentate)
                        p.vx *= -0.8; // Bounce back
                        p.x = membraneX - 5 - p.size;
                    }
                }

                // Draw Particle
                ctx.beginPath();
                ctx.fillStyle = p.color;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Labels
            ctx.font = '12px monospace';
            ctx.fillStyle = '#64748b';
            ctx.fillText('FEED WATER (UNTREATED)', 20, 30);
            ctx.fillText('PERMEATE (TREATED)', membraneX + 20, 30);

            animationRef.current = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationRef.current);
    }, [isRunning, params.pressure, params.porosity]);

    return (
        <div className={styles.simulationContainer} ref={containerRef}>
            <canvas ref={canvasRef} className={styles.canvas} />
            {/* Overlay hint if needed */}
            {!isRunning && (
                <div style={{
                    position: 'absolute',
                    color: 'rgba(255,255,255,0.5)',
                    pointerEvents: 'none'
                }}>
                    Press Start to pressurize system
                </div>
            )}
        </div>
    );
};

export default SimulationCanvas;

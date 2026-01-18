// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Microscope, Atom, Droplet, Sparkles, BookOpen, Zap } from 'lucide-react';
import styles from './Home.module.css';

const Home = () => {
    const modules = [
        {
            id: 'polymer-reactor',
            title: 'Polymer Reactor',
            description: 'Explore Linear, Branched, and Cross-Linked polymer structures using interactive 3D graph visualization',
            icon: Microscope,
            path: '/polymer-reactor',
            status: 'active',
            color: 'cyan',
            features: ['Graph Theory', '3D Visualization', 'HDPE, LDPE, Bakelite']
        },
        {
            id: 'material-hub',
            title: '3D Material Hub',
            description: 'Visualize molecular structures like Nylon-6,6 and Bakelite monomers with atomic coordinates',
            icon: Atom,
            path: '/material-hub',
            status: 'active',
            color: 'green',
            features: ['Atomic Models', 'Molecular Viewer', 'Unit I Materials']
        },
        {
            id: 'water-dashboard',
            title: 'Water Dashboard',
            description: 'Analyze water quality data with interactive charts for hardness, alkalinity, and treatment efficiency',
            icon: Droplet,
            path: '/water-dashboard',
            status: 'coming-soon',
            color: 'purple',
            features: ['Data Visualization', 'RO vs Tap Water', 'Unit II Analysis']
        }
    ];

    return (
        <div className={styles.homePage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <h1 className={styles.heroTitle}>
                            Welcome to <span style={{ color: 'var(--color-accent-cyan)' }}>PolyLab</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            An interactive educational platform combining <strong>Graph Theory</strong> and <strong>3D Visualization</strong> to teach polymer structures and water analysis for Engineering Chemistry.
                        </p>
                        <div className={styles.heroButtons}>
                            <Link to="/polymer-reactor" className={styles.primaryButton}>
                                <Microscope size={20} />
                                <span>Launch Polymer Reactor</span>
                                <ArrowRight size={18} />
                            </Link>
                            <a href="#modules" className={styles.secondaryButton}>
                                <BookOpen size={20} />
                                <span>Explore Modules</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.features}>
                <div className={styles.featureGrid}>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon} style={{ background: 'rgba(34, 211, 238, 0.1)' }}>
                            <Zap size={24} style={{ color: 'var(--color-accent-cyan)' }} />
                        </div>
                        <h3>Interactive Learning</h3>
                        <p>Real-time 3D visualization of complex polymer structures and molecular networks</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon} style={{ background: 'rgba(74, 222, 128, 0.1)' }}>
                            <BookOpen size={24} style={{ color: 'var(--color-accent-green)' }} />
                        </div>
                        <h3>Curriculum Aligned</h3>
                        <p>Designed specifically for Engineering Chemistry Unit I (Polymers) and Unit II (Water Analysis)</p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon} style={{ background: 'rgba(167, 139, 250, 0.1)' }}>
                            <Atom size={24} style={{ color: 'var(--color-accent-purple)' }} />
                        </div>
                        <h3>Graph Theory Based</h3>
                        <p>Mathematical approach using nodes and edges to represent molecular structures</p>
                    </div>
                </div>
            </section>

            {/* Modules Section */}
            <section className={styles.modules} id="modules">
                <div className={styles.modulesHeader}>
                    <h2>Educational Modules</h2>
                    <p>Choose a module to begin your learning journey</p>
                </div>

                <div className={styles.moduleGrid}>
                    {modules.map((module) => (
                        <div key={module.id} className={`${styles.moduleCard} ${styles[module.color]}`}>
                            <div className={styles.moduleHeader}>
                                <div className={styles.moduleIcon}>
                                    <module.icon size={28} />
                                </div>
                                {module.status === 'coming-soon' && (
                                    <span className={styles.comingSoonBadge}>Coming Soon</span>
                                )}
                            </div>

                            <h3 className={styles.moduleTitle}>{module.title}</h3>
                            <p className={styles.moduleDescription}>{module.description}</p>

                            <ul className={styles.featureList}>
                                {module.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <ArrowRight size={14} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {module.status === 'active' ? (
                                <Link to={module.path} className={styles.moduleButton}>
                                    Launch Module
                                    <ArrowRight size={16} />
                                </Link>
                            ) : (
                                <button className={styles.moduleButtonDisabled} disabled>
                                    In Development
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <p>
                    Built with React, Three.js, and Graph Theory • Engineering Chemistry Educational Project
                </p>
                <p className={styles.credit}>
                    Made by <a href="https://github.com/Pranjul-00" target="_blank" rel="noopener noreferrer">Pranjul Gupta</a> •
                    Cluster Innovation Centre, University of Delhi
                </p>
            </footer>
        </div>
    );
};

export default Home;

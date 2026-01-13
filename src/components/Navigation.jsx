// src/components/Navigation.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Atom, Droplet, Microscope } from 'lucide-react';
import Logo from './Logo';
import styles from './Navigation.module.css';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/', label: 'Home', icon: Atom },
        { path: '/polymer-reactor', label: 'Polymer Reactor', icon: Microscope },
        { path: '/material-hub', label: '3D Material Hub', icon: Atom, comingSoon: true },
        { path: '/water-dashboard', label: 'Water Dashboard', icon: Droplet, comingSoon: true },
    ];

    const isActive = (path) => location.pathname === path;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                {/* Logo */}
                <Link to="/" className={styles.logoLink}>
                    <Logo size="medium" showText={true} />
                </Link>

                {/* Desktop Navigation */}
                <div className={styles.desktopNav}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`${styles.navLink} ${isActive(link.path) ? styles.active : ''} ${link.comingSoon ? styles.comingSoon : ''
                                }`}
                        >
                            <link.icon size={18} />
                            <span>{link.label}</span>
                            {link.comingSoon && <span className={styles.badge}>Soon</span>}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={styles.menuButton}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Drawer */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
                <div className={styles.mobileMenuContent}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`${styles.mobileNavLink} ${isActive(link.path) ? styles.active : ''} ${link.comingSoon ? styles.comingSoon : ''
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <link.icon size={20} />
                            <span>{link.label}</span>
                            {link.comingSoon && <span className={styles.badge}>Soon</span>}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Overlay */}
            {isMenuOpen && (
                <div className={styles.overlay} onClick={() => setIsMenuOpen(false)} />
            )}
        </nav>
    );
};

export default Navigation;

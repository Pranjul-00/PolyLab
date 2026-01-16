// src/pages/ComingSoon.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import styles from './ComingSoon.module.css';

const ComingSoon = ({ title, description, icon: Icon }) => {
    return (
        <div className={styles.comingSoonPage}>
            <div className={styles.content}>
                <div className={styles.iconWrapper}>
                    <Icon size={64} className={styles.icon} />
                    <Sparkles size={24} className={styles.sparkle} />
                </div>

                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{description}</p>

                <div className={styles.badge}>
                    <Sparkles size={14} />
                    <span>In Development</span>
                </div>

                <Link to="/" className={styles.backButton}>
                    <ArrowLeft size={18} />
                    <span>Back to Home</span>
                </Link>
            </div>

            {/* Animated Background */}
            <div className={styles.background}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
            </div>
        </div>
    );
};

export default ComingSoon;

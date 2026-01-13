// src/components/Logo.jsx
import React from 'react';

const Logo = ({ size = 'medium', showText = true }) => {
    const sizes = {
        small: { svg: 24, text: 'text-base' },
        medium: { svg: 32, text: 'text-xl' },
        large: { svg: 48, text: 'text-2xl' }
    };

    const { svg: svgSize, text: textSize } = sizes[size];

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Animated Polymer Icon */}
            <svg
                width={svgSize}
                height={svgSize}
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ flexShrink: 0 }}
            >
                {/* Outer hexagon ring */}
                <path
                    d="M24 4L38 13V31L24 40L10 31V13L24 4Z"
                    stroke="url(#gradient1)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Inner molecular structure */}
                <circle cx="24" cy="24" r="4" fill="url(#gradient2)" />
                <circle cx="16" cy="16" r="3" fill="#22d3ee" opacity="0.8" />
                <circle cx="32" cy="16" r="3" fill="#4ade80" opacity="0.8" />
                <circle cx="16" cy="32" r="3" fill="#a78bfa" opacity="0.8" />
                <circle cx="32" cy="32" r="3" fill="#f472b6" opacity="0.8" />

                {/* Connecting bonds */}
                <line x1="24" y1="24" x2="16" y2="16" stroke="#22d3ee" strokeWidth="1.5" opacity="0.5" />
                <line x1="24" y1="24" x2="32" y2="16" stroke="#4ade80" strokeWidth="1.5" opacity="0.5" />
                <line x1="24" y1="24" x2="16" y2="32" stroke="#a78bfa" strokeWidth="1.5" opacity="0.5" />
                <line x1="24" y1="24" x2="32" y2="32" stroke="#f472b6" strokeWidth="1.5" opacity="0.5" />

                {/* Gradients */}
                <defs>
                    <linearGradient id="gradient1" x1="10" y1="4" x2="38" y2="40" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="50%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="20" y1="20" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#4ade80" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Logo Text */}
            {showText && (
                <span
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: `var(--${textSize})`,
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        color: 'var(--color-accent-cyan)'
                    }}
                >
                    PolyLab
                </span>
            )}
        </div>
    );
};

export default Logo;

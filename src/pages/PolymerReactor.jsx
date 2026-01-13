// src/pages/PolymerReactor.jsx
import React, { useState, useEffect } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { Info, Download, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { generateLinear, generateBranched, generateCrossLinked } from "../PolymerLogic";
import styles from "./PolymerReactor.module.css";

function PolymerReactor() {
    const [polymerType, setPolymerType] = useState("linear");
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [showInfo, setShowInfo] = useState(true);

    // Polymer information database
    const polymerInfo = {
        linear: {
            title: "Linear Polymer",
            example: "High-Density Polyethylene (HDPE)",
            graphType: "Path Graph (Pₙ)",
            structure: "Chains pack tightly together due to lack of branching.",
            properties: "High density, high tensile strength, rigid structure.",
            applications: "Milk jugs, detergent bottles, piping systems",
            color: "#22d3ee"
        },
        branched: {
            title: "Branched Polymer",
            example: "Low-Density Polyethylene (LDPE)",
            graphType: "Tree Graph (Tₙ)",
            structure: "Side chains prevent tight packing of polymer chains.",
            properties: "Lower density, flexible, lower melting point.",
            applications: "Plastic bags, squeeze bottles, flexible containers",
            color: "#4ade80"
        },
        crosslinked: {
            title: "Cross-Linked Polymer",
            example: "Bakelite / Vulcanized Rubber",
            graphType: "Mesh/Cyclic Graph",
            structure: "Covalent bonds connect parallel chains into a 3D network.",
            properties: "Thermosetting, extremely hard, cannot be remelted.",
            applications: "Electrical insulators, cookware handles, tires",
            color: "#a78bfa"
        }
    };

    useEffect(() => {
        const numMonomers = 50;
        if (polymerType === "linear") setGraphData(generateLinear(numMonomers));
        else if (polymerType === "branched") setGraphData(generateBranched(numMonomers));
        else if (polymerType === "crosslinked") setGraphData(generateCrossLinked(numMonomers));
    }, [polymerType]);

    const currentInfo = polymerInfo[polymerType];

    const resetView = () => {
        // Force re-render by changing state
        setGraphData({ ...graphData });
    };

    return (
        <div className={styles.reactorPage}>
            {/* Control Panel */}
            <div className={styles.controlPanel}>
                <div className={styles.panelHeader}>
                    <h1 className={styles.panelTitle}>Polymer Reactor</h1>
                    <p className={styles.panelSubtitle}>Interactive 3D Topology Simulator</p>
                </div>

                {/* Polymer Type Selector */}
                <div className={styles.selectorSection}>
                    <label className={styles.sectionLabel}>Select Polymer Type</label>
                    <div className={styles.buttonGrid}>
                        <button
                            className={`${styles.polymerButton} ${polymerType === "linear" ? styles.active : ""}`}
                            onClick={() => setPolymerType("linear")}
                            style={{ '--accent-color': polymerInfo.linear.color }}
                        >
                            <span className={styles.buttonTitle}>Linear</span>
                            <span className={styles.buttonSubtext}>HDPE</span>
                        </button>
                        <button
                            className={`${styles.polymerButton} ${polymerType === "branched" ? styles.active : ""}`}
                            onClick={() => setPolymerType("branched")}
                            style={{ '--accent-color': polymerInfo.branched.color }}
                        >
                            <span className={styles.buttonTitle}>Branched</span>
                            <span className={styles.buttonSubtext}>LDPE</span>
                        </button>
                        <button
                            className={`${styles.polymerButton} ${polymerType === "crosslinked" ? styles.active : ""}`}
                            onClick={() => setPolymerType("crosslinked")}
                            style={{ '--accent-color': polymerInfo.crosslinked.color }}
                        >
                            <span className={styles.buttonTitle}>Cross-Linked</span>
                            <span className={styles.buttonSubtext}>Bakelite</span>
                        </button>
                    </div>
                </div>

                {/* Graph Statistics */}
                <div className={styles.statsSection}>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Nodes</div>
                        <div className={styles.statValue}>{graphData.nodes.length}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Edges</div>
                        <div className={styles.statValue}>{graphData.links.length}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Type</div>
                        <div className={styles.statValue} style={{ fontSize: '0.875rem' }}>
                            {currentInfo.graphType}
                        </div>
                    </div>
                </div>

                {/* Information Panel */}
                <div className={styles.infoSection}>
                    <button
                        className={styles.infoToggle}
                        onClick={() => setShowInfo(!showInfo)}
                    >
                        <Info size={18} />
                        <span>Polymer Information</span>
                        {showInfo ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {showInfo && (
                        <div className={styles.infoContent}>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Example:</span>
                                <span className={styles.infoValue}>{currentInfo.example}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Structure:</span>
                                <span className={styles.infoValue}>{currentInfo.structure}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Properties:</span>
                                <span className={styles.infoValue}>{currentInfo.properties}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Applications:</span>
                                <span className={styles.infoValue}>{currentInfo.applications}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className={styles.controlsSection}>
                    <button className={styles.controlButton} onClick={resetView}>
                        <RotateCcw size={18} />
                        <span>Reset View</span>
                    </button>
                </div>
            </div>

            {/* 3D Visualization */}
            <div className={styles.visualizationContainer}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                    <ForceGraph3D
                        graphData={graphData}
                        nodeLabel="id"
                        nodeColor={node => node.group === 2 ? "#ff4444" : currentInfo.color}
                        linkColor={() => "rgba(255,255,255,0.2)"}
                        nodeResolution={16}
                        backgroundColor="#050505"
                        showNavInfo={false}
                        nodeRelSize={6}
                        linkWidth={2}
                    />
                </div>

                {/* Floating Instructions */}
                <div className={styles.instructions}>
                    <p>🖱️ <strong>Drag</strong> to rotate • <strong>Scroll</strong> to zoom • <strong>Right-click</strong> to pan</p>
                </div>
            </div>
        </div>
    );
}

export default PolymerReactor;

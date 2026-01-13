// src/pages/PolymerReactor.jsx
import React, { useState, useEffect, useRef } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { Info, RotateCcw, ChevronDown, ChevronUp, Sliders } from 'lucide-react';
import { generateLinear, generateBranched, generateCrossLinked, calculateGraphProperties } from "../PolymerLogic";
import styles from "./PolymerReactor.module.css";

function PolymerReactor() {
    const [polymerType, setPolymerType] = useState("linear");
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const [showInfo, setShowInfo] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const [selectedNode, setSelectedNode] = useState(null);

    // Interactive parameters
    const [monomerCount, setMonomerCount] = useState(50);
    const [branchDensity, setBranchDensity] = useState(20);
    const [crosslinkDensity, setCrosslinkDensity] = useState(25);

    const graphRef = useRef();

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
        let data;
        if (polymerType === "linear") {
            data = generateLinear(monomerCount);
        } else if (polymerType === "branched") {
            data = generateBranched(monomerCount, branchDensity);
        } else if (polymerType === "crosslinked") {
            data = generateCrossLinked(Math.floor(monomerCount / 2), crosslinkDensity);
        }
        setGraphData(data);
        setSelectedNode(null);
    }, [polymerType, monomerCount, branchDensity, crosslinkDensity]);

    const currentInfo = polymerInfo[polymerType];
    const graphProps = calculateGraphProperties(graphData);

    const resetView = () => {
        if (graphRef.current) {
            graphRef.current.zoomToFit(400);
        }
    };

    const handleNodeClick = (node) => {
        setSelectedNode(node);
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

                {/* Interactive Controls */}
                <div className={styles.controlsSection}>
                    <button
                        className={styles.sectionToggle}
                        onClick={() => setShowControls(!showControls)}
                    >
                        <Sliders size={18} />
                        <span>Simulation Controls</span>
                        {showControls ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {showControls && (
                        <div className={styles.sliderContainer}>
                            {/* Monomer Count Slider */}
                            <div className={styles.sliderGroup}>
                                <label className={styles.sliderLabel}>
                                    Monomer Count: <strong>{monomerCount}</strong>
                                </label>
                                <input
                                    type="range"
                                    min="10"
                                    max="150"
                                    value={monomerCount}
                                    onChange={(e) => setMonomerCount(parseInt(e.target.value))}
                                    className={styles.slider}
                                />
                                <div className={styles.sliderHint}>Adjust the number of monomers in the polymer chain</div>
                            </div>

                            {/* Branch Density Slider (only for branched) */}
                            {polymerType === "branched" && (
                                <div className={styles.sliderGroup}>
                                    <label className={styles.sliderLabel}>
                                        Branch Density: <strong>{branchDensity}%</strong>
                                    </label>
                                    <input
                                        type="range"
                                        min="5"
                                        max="50"
                                        value={branchDensity}
                                        onChange={(e) => setBranchDensity(parseInt(e.target.value))}
                                        className={styles.slider}
                                    />
                                    <div className={styles.sliderHint}>Control how many side chains branch off</div>
                                </div>
                            )}

                            {/* Crosslink Density Slider (only for crosslinked) */}
                            {polymerType === "crosslinked" && (
                                <div className={styles.sliderGroup}>
                                    <label className={styles.sliderLabel}>
                                        Cross-link Density: <strong>{crosslinkDensity}%</strong>
                                    </label>
                                    <input
                                        type="range"
                                        min="10"
                                        max="50"
                                        value={crosslinkDensity}
                                        onChange={(e) => setCrosslinkDensity(parseInt(e.target.value))}
                                        className={styles.slider}
                                    />
                                    <div className={styles.sliderHint}>Control the mesh density between chains</div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Graph Statistics */}
                <div className={styles.statsSection}>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Nodes</div>
                        <div className={styles.statValue}>{graphProps.nodeCount}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Edges</div>
                        <div className={styles.statValue}>{graphProps.edgeCount}</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Avg Degree</div>
                        <div className={styles.statValue} style={{ fontSize: '0.875rem' }}>
                            {graphProps.avgDegree}
                        </div>
                    </div>
                </div>

                {/* Selected Node Info */}
                {selectedNode && (
                    <div className={styles.selectedNodeInfo}>
                        <div className={styles.selectedNodeHeader}>
                            <span className={styles.selectedNodeTitle}>Selected Node</span>
                            <button
                                className={styles.closeButton}
                                onClick={() => setSelectedNode(null)}
                            >×</button>
                        </div>
                        <div className={styles.selectedNodeContent}>
                            <div className={styles.nodeInfoRow}>
                                <span className={styles.nodeInfoLabel}>ID:</span>
                                <span className={styles.nodeInfoValue}>{selectedNode.name || selectedNode.id}</span>
                            </div>
                            <div className={styles.nodeInfoRow}>
                                <span className={styles.nodeInfoLabel}>Type:</span>
                                <span className={styles.nodeInfoValue}>
                                    {selectedNode.type === 'branch' ? 'Branch Point' : 'Monomer'}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

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

                {/* Action Buttons */}
                <div className={styles.actionButtons}>
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
                        ref={graphRef}
                        graphData={graphData}
                        nodeLabel={node => `${node.name || node.id} (${node.type})`}
                        nodeColor={node => {
                            if (selectedNode && node.id === selectedNode.id) return "#ffff00";
                            return node.group === 2 ? "#ff4444" : currentInfo.color;
                        }}
                        linkColor={() => "rgba(255,255,255,0.2)"}
                        nodeResolution={16}
                        backgroundColor="#050505"
                        showNavInfo={false}
                        nodeRelSize={6}
                        linkWidth={2}
                        onNodeClick={handleNodeClick}
                        nodeOpacity={0.9}
                    />
                </div>

                {/* Floating Instructions */}
                <div className={styles.instructions}>
                    <p>🖱️ <strong>Drag</strong> to rotate • <strong>Scroll</strong> to zoom • <strong>Click nodes</strong> for info</p>
                </div>
            </div>
        </div>
    );
}

export default PolymerReactor;

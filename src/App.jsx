// src/App.jsx
import React, { useState, useEffect, useMemo } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { generateLinear, generateBranched, generateCrossLinked } from "./PolymerLogic";
import "./App.css"; // Import the styles

function App() {
  const [polymerType, setPolymerType] = useState("linear");
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  // Data for the descriptions (Unit I Syllabus)
  const polymerInfo = {
    linear: {
      title: "Linear Polymer",
      desc: "High-Density Polyethylene (HDPE)",
      detail: "Chains pack tightly together due to lack of branching. Result: High density, high tensile strength, rigid."
    },
    branched: {
      title: "Branched Polymer",
      desc: "Low-Density Polyethylene (LDPE)",
      detail: "Side chains prevent tight packing. Result: Lower density, flexible, lower melting point."
    },
    crosslinked: {
      title: "Cross-Linked Polymer",
      desc: "Bakelite / Vulcanized Rubber",
      detail: "Covalent bonds connect parallel chains into a 3D network. Result: Thermosetting, extremely hard, cannot be remelted."
    }
  };

  useEffect(() => {
    const numMonomers = 50;
    if (polymerType === "linear") setGraphData(generateLinear(numMonomers));
    else if (polymerType === "branched") setGraphData(generateBranched(numMonomers));
    else if (polymerType === "crosslinked") setGraphData(generateCrossLinked(numMonomers));
  }, [polymerType]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", background: "#050505" }}>

      {/* GLASS UI PANEL */}
      <div className="control-panel">
        <h1 className="title">PolyLab Reactor</h1>
        <p className="subtitle">Interactive Polymer Topology Sim</p>

        <div className="button-grid">
          <button
            className={`btn ${polymerType === "linear" ? "active" : ""}`}
            onClick={() => setPolymerType("linear")}
          >
            Linear (HDPE)
          </button>
          <button
            className={`btn ${polymerType === "branched" ? "active" : ""}`}
            onClick={() => setPolymerType("branched")}
          >
            Branched (LDPE)
          </button>
          <button
            className={`btn ${polymerType === "crosslinked" ? "active" : ""}`}
            onClick={() => setPolymerType("crosslinked")}
          >
            Cross-Linked (Bakelite)
          </button>
        </div>

        {/* DYNAMIC INFO BOX */}
        <div className="info-box">
          <div className="info-label">Structure Property</div>
          <div className="info-value">{polymerInfo[polymerType].detail}</div>
        </div>
      </div>

      {/* 3D GRAPH */}
      <ForceGraph3D
        graphData={graphData}
        nodeLabel="id"
        nodeColor={node => node.group === 2 ? "#ff4444" : "#22d3ee"} // Cyan nodes
        linkColor={() => "rgba(255,255,255,0.2)"} // Faint white links
        nodeResolution={16}
        backgroundColor="#050505"
        showNavInfo={false}
      />
    </div>
  );
}

export default App;
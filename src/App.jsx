// src/App.jsx
import React, { useState, useEffect } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { generateLinear, generateBranched, generateCrossLinked } from "./PolymerLogic";

function App() {
  const [polymerType, setPolymerType] = useState("linear");
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    const numMonomers = 50;
    if (polymerType === "linear") {
      setGraphData(generateLinear(numMonomers));
    } else if (polymerType === "branched") {
      setGraphData(generateBranched(numMonomers));
    } else if (polymerType === "crosslinked") {
      setGraphData(generateCrossLinked(numMonomers));
    }
  }, [polymerType]);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000", overflow: "hidden" }}>

      {/* UI CONTROLS */}
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 100, color: "white", fontFamily: "sans-serif" }}>
        <h1 style={{ margin: "0 0 10px 0" }}>PolyLab Reactor</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ padding: "10px", cursor: "pointer" }} onClick={() => setPolymerType("linear")}>Linear (HDPE)</button>
          <button style={{ padding: "10px", cursor: "pointer" }} onClick={() => setPolymerType("branched")}>Branched (LDPE)</button>
          <button style={{ padding: "10px", cursor: "pointer" }} onClick={() => setPolymerType("crosslinked")}>Cross-Linked (Bakelite)</button>
        </div>
        <p>Current Topology: <span style={{ color: "#4ade80", fontWeight: "bold" }}>{polymerType.toUpperCase()}</span></p>
      </div>

      {/* 3D GRAPH ENGINE */}
      <ForceGraph3D
        graphData={graphData}
        nodeLabel="id"
        nodeColor={node => node.group === 2 ? "#ff4444" : "#00bcd4"}
        linkColor={() => "white"}
        linkOpacity={0.5}
        nodeResolution={16}
      />
    </div>
  );
}

export default App;
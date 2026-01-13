// src/PolymerLogic.js

/**
 * Generate a linear polymer structure (Path Graph)
 * @param {number} n - Number of monomers
 * @returns {Object} - Graph data with nodes and links
 */
export const generateLinear = (n) => {
    const nodes = [];
    const links = [];

    for (let i = 0; i < n; i++) {
        nodes.push({
            id: i,
            group: 1,
            type: 'monomer',
            name: `M${i}`
        });
    }

    for (let i = 0; i < n - 1; i++) {
        links.push({
            source: i,
            target: i + 1,
            type: 'backbone'
        });
    }

    return { nodes, links };
};

/**
 * Generate a branched polymer structure (Tree Graph)
 * @param {number} n - Number of backbone monomers
 * @param {number} branchDensity - Percentage of monomers that have branches (0-100)
 * @returns {Object} - Graph data with nodes and links
 */
export const generateBranched = (n, branchDensity = 20) => {
    const { nodes, links } = generateLinear(n);

    // Calculate how many branches to add based on density
    const branchInterval = Math.max(1, Math.floor(100 / branchDensity));
    let branchCount = 0;

    for (let i = 0; i < n; i++) {
        if (i % branchInterval === 0 && i < n - 1) {
            const branchId = n + branchCount;
            nodes.push({
                id: branchId,
                group: 2,
                type: 'branch',
                name: `B${branchCount}`
            });
            links.push({
                source: i,
                target: branchId,
                type: 'branch'
            });
            branchCount++;
        }
    }

    return { nodes, links };
};

/**
 * Generate a cross-linked polymer structure (Mesh Graph)
 * @param {number} n - Number of monomers per chain
 * @param {number} crosslinkDensity - Percentage of cross-links (0-100)
 * @returns {Object} - Graph data with nodes and links
 */
export const generateCrossLinked = (n, crosslinkDensity = 25) => {
    const chain1 = generateLinear(n);
    const nodes = [...chain1.nodes];
    const links = [...chain1.links];

    // Second Chain
    for (let i = 0; i < n; i++) {
        nodes.push({
            id: i + n,
            group: 1,
            type: 'monomer',
            name: `M${i + n}`
        });
    }

    for (let i = 0; i < n - 1; i++) {
        links.push({
            source: i + n,
            target: i + n + 1,
            type: 'backbone'
        });
    }

    // Cross-Links (The Net)
    const crosslinkInterval = Math.max(1, Math.floor(100 / crosslinkDensity));
    let crosslinkCount = 0;

    for (let i = 0; i < n; i += crosslinkInterval) {
        if (i + n < nodes.length) {
            links.push({
                source: i,
                target: i + n,
                type: 'crosslink'
            });
            crosslinkCount++;
        }
    }

    return { nodes, links };
};

/**
 * Calculate graph properties for educational display
 * @param {Object} graphData - Graph with nodes and links
 * @returns {Object} - Graph metrics
 */
export const calculateGraphProperties = (graphData) => {
    const { nodes, links } = graphData;

    // Calculate degree for each node
    const degrees = new Array(nodes.length).fill(0);
    links.forEach(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        degrees[sourceId]++;
        degrees[targetId]++;
    });

    const avgDegree = degrees.reduce((a, b) => a + b, 0) / nodes.length;
    const maxDegree = Math.max(...degrees);

    // Count branch points (nodes with degree > 2)
    const branchPoints = degrees.filter(d => d > 2).length;

    return {
        nodeCount: nodes.length,
        edgeCount: links.length,
        avgDegree: avgDegree.toFixed(2),
        maxDegree,
        branchPoints,
        density: (2 * links.length / (nodes.length * (nodes.length - 1))).toFixed(4)
    };
};

// src/PolymerLogic.js

export const generateLinear = (n) => {
    const nodes = [];
    const links = [];
    for (let i = 0; i < n; i++) {
        nodes.push({ id: i, group: 1 });
    }
    for (let i = 0; i < n - 1; i++) {
        links.push({ source: i, target: i + 1 });
    }
    return { nodes, links };
};

export const generateBranched = (n) => {
    const { nodes, links } = generateLinear(n);
    for (let i = 0; i < n; i++) {
        if (i % 5 === 0 && i < n - 1) {
            const branchId = n + i;
            nodes.push({ id: branchId, group: 2 });
            links.push({ source: i, target: branchId });
        }
    }
    return { nodes, links };
};

export const generateCrossLinked = (n) => {
    const chain1 = generateLinear(n);
    const nodes = [...chain1.nodes];
    const links = [...chain1.links];

    // Second Chain
    for (let i = 0; i < n; i++) {
        nodes.push({ id: i + n, group: 1 });
    }
    for (let i = 0; i < n - 1; i++) {
        links.push({ source: i + n, target: i + n + 1 });
    }

    // Cross-Links (The Net)
    for (let i = 0; i < n; i += 4) {
        links.push({ source: i, target: i + n });
    }
    return { nodes, links };
};
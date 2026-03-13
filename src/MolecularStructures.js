// MolecularStructures.js
// Contains atomic coordinates and bond information for real polymer monomers
// Coordinates are in Angstroms (Å), simplified for educational purposes

/**
 * Atom color scheme (CPK coloring)
 */
export const ATOM_COLORS = {
    H: '#FFFFFF',  // Hydrogen - White
    C: '#909090',  // Carbon - Gray
    N: '#3050F8',  // Nitrogen - Blue
    O: '#FF0D0D',  // Oxygen - Red
    S: '#FFFF30',  // Sulfur - Yellow
    P: '#FF8000',  // Phosphorus - Orange
};

/**
 * Atom radii (van der Waals radii in Angstroms, scaled for visualization)
 */
export const ATOM_RADII = {
    H: 0.3,
    C: 0.4,
    N: 0.4,
    O: 0.35,
    S: 0.45,
    P: 0.45,
};

/**
 * Ethylene (C2H4) - Monomer for Polyethylene
 * Planar structure (X-Y plane)
 */
export const ETHYLENE = {
    name: "Ethylene",
    formula: "C₂H₄",
    description: "The simplest alkene and monomer for polyethylene. Contains a C=C double bond that opens during polymerization to form long polymer chains.",
    polymerType: "Polyethylene (PE)",
    polymerizationType: "Addition Polymerization",
    properties: {
        meltingPoint: "-169°C",
        boilingPoint: "-104°C",
        density: "1.178 g/L (gas)",
        state: "Colorless gas at room temperature"
    },
    applications: [
        "HDPE: Milk jugs, detergent bottles",
        "LDPE: Plastic bags, squeeze bottles",
        "Pipes and fittings",
        "Food packaging films",
        "Wire insulation"
    ],
    atoms: [
        { id: 0, element: 'C', x: -0.67, y: 0, z: 0 },
        { id: 1, element: 'C', x: 0.67, y: 0, z: 0 },
        { id: 2, element: 'H', x: -1.23, y: 0.94, z: 0 },
        { id: 3, element: 'H', x: -1.23, y: -0.94, z: 0 },
        { id: 4, element: 'H', x: 1.23, y: 0.94, z: 0 },
        { id: 5, element: 'H', x: 1.23, y: -0.94, z: 0 },
    ],
    bonds: [
        { source: 0, target: 1, order: 2 }, // C=C double bond
        { source: 0, target: 2, order: 1 },
        { source: 0, target: 3, order: 1 },
        { source: 1, target: 4, order: 1 },
        { source: 1, target: 5, order: 1 },
    ],
};

/**
 * Styrene (C8H8) - Monomer for Polystyrene
 * Benzene ring with a rotated vinyl group (3D)
 */
export const STYRENE = {
    name: "Styrene",
    formula: "C₈H₈",
    description: "Aromatic monomer consisting of a vinyl group attached to a benzene ring. Polymerizes to form polystyrene, one of the most widely used plastics.",
    polymerType: "Polystyrene (PS)",
    polymerizationType: "Addition Polymerization (Free Radical)",
    properties: {
        meltingPoint: "-30°C",
        boilingPoint: "145°C",
        density: "0.909 g/cm³",
        state: "Colorless to yellowish liquid"
    },
    applications: ["Expanded polystyrene (EPS) foam", "Disposable cups and containers", "Packaging materials", "Insulation boards", "CD/DVD cases"],
    atoms: [
        // Benzene ring (Planar in X-Y)
        { id: 0, element: 'C', x: 0, y: 1.39, z: 0 },
        { id: 1, element: 'C', x: 1.2, y: 0.69, z: 0 },
        { id: 2, element: 'C', x: 1.2, y: -0.69, z: 0 },
        { id: 3, element: 'C', x: 0, y: -1.39, z: 0 },
        { id: 4, element: 'C', x: -1.2, y: -0.69, z: 0 },
        { id: 5, element: 'C', x: -1.2, y: 0.69, z: 0 },
        // Hydrogens on benzene
        { id: 6, element: 'H', x: 0, y: 2.48, z: 0 },
        { id: 7, element: 'H', x: 2.14, y: 1.23, z: 0 },
        { id: 8, element: 'H', x: 2.14, y: -1.23, z: 0 },
        { id: 9, element: 'H', x: 0, y: -2.48, z: 0 },
        { id: 10, element: 'H', x: -2.14, y: -1.23, z: 0 },
        // Vinyl group (Rotated by 30 degrees from X-Y plane for 3D depth)
        { id: 11, element: 'C', x: -2.5, y: 1.45, z: 0.1 },
        { id: 12, element: 'C', x: -3.7, y: 0.9, z: 0.4 },
        { id: 13, element: 'H', x: -2.4, y: 2.5, z: 0.1 },
        { id: 14, element: 'H', x: -3.8, y: -0.15, z: 0.4 },
        { id: 15, element: 'H', x: -4.6, y: 1.5, z: 0.6 },
    ],
    bonds: [
        // Benzene ring
        { source: 0, target: 1, order: 2 },
        { source: 1, target: 2, order: 1 },
        { source: 2, target: 3, order: 2 },
        { source: 3, target: 4, order: 1 },
        { source: 4, target: 5, order: 2 },
        { source: 5, target: 0, order: 1 },
        // Vinyl attachment
        { source: 5, target: 11, order: 1 },
        // Vinyl double bond
        { source: 11, target: 12, order: 2 },
        // Benzene Hydrogens
        { source: 0, target: 6, order: 1 },
        { source: 1, target: 7, order: 1 },
        { source: 2, target: 8, order: 1 },
        { source: 3, target: 9, order: 1 },
        { source: 4, target: 10, order: 1 },
        // Vinyl Hydrogens
        { source: 11, target: 13, order: 1 },
        { source: 12, target: 14, order: 1 },
        { source: 12, target: 15, order: 1 },
    ],
};

/**
 * Phenol (C6H5OH) - Component of Bakelite
 */
export const PHENOL = {
    name: "Phenol",
    formula: "C₆H₅OH",
    description: "Aromatic alcohol with a hydroxyl group attached to benzene. Reacts with formaldehyde to form phenol-formaldehyde resin (Bakelite), the first synthetic plastic.",
    polymerType: "Bakelite (Phenolic Resin)",
    polymerizationType: "Condensation Polymerization",
    properties: {
        meltingPoint: "41°C",
        boilingPoint: "182°C",
        density: "1.07 g/cm³",
        state: "White crystalline solid"
    },
    applications: ["Electrical insulators", "Billiard balls", "Circuit boards", "Heat-resistant handles", "Adhesives and coatings"],
    atoms: [
        // Benzene ring (Planar in X-Y)
        { id: 0, element: 'C', x: 0, y: 1.39, z: 0 },
        { id: 1, element: 'C', x: 1.2, y: 0.69, z: 0 },
        { id: 2, element: 'C', x: 1.2, y: -0.69, z: 0 },
        { id: 3, element: 'C', x: 0, y: -1.39, z: 0 },
        { id: 4, element: 'C', x: -1.2, y: -0.69, z: 0 },
        { id: 5, element: 'C', x: -1.2, y: 0.69, z: 0 },
        // Hydrogens
        { id: 6, element: 'H', x: 2.14, y: 1.23, z: 0 },
        { id: 7, element: 'H', x: 2.14, y: -1.23, z: 0 },
        { id: 8, element: 'H', x: 0, y: -2.48, z: 0 },
        { id: 9, element: 'H', x: -2.14, y: -1.23, z: 0 },
        { id: 10, element: 'H', x: -2.14, y: 1.23, z: 0 },
        // OH group (Rotated for 3D)
        { id: 11, element: 'O', x: 0, y: 2.75, z: 0.1 },
        { id: 12, element: 'H', x: 0.8, y: 3.2, z: 0.2 },
    ],
    bonds: [
        // Benzene
        { source: 0, target: 1, order: 2 },
        { source: 1, target: 2, order: 1 },
        { source: 2, target: 3, order: 2 },
        { source: 3, target: 4, order: 1 },
        { source: 4, target: 5, order: 2 },
        { source: 5, target: 0, order: 1 },
        // OH group
        { source: 0, target: 11, order: 1 },
        { source: 11, target: 12, order: 1 },
        // Hydrogens
        { source: 1, target: 6, order: 1 },
        { source: 2, target: 7, order: 1 },
        { source: 3, target: 8, order: 1 },
        { source: 4, target: 9, order: 1 },
        { source: 5, target: 10, order: 1 },
    ],
};

/**
 * Formaldehyde (CH2O) - Component of Bakelite
 */
export const FORMALDEHYDE = {
    name: "Formaldehyde",
    formula: "CH₂O",
    description: "Simplest aldehyde that acts as a cross-linking agent. Reacts with phenol to create three-dimensional network polymer (Bakelite).",
    polymerType: "Bakelite (Cross-linking Agent)",
    polymerizationType: "Condensation Polymerization",
    properties: {
        meltingPoint: "-92°C",
        boilingPoint: "-19°C",
        density: "0.815 g/cm³ (gas)",
        state: "Colorless gas (37% aqueous solution: Formalin)"
    },
    applications: ["Phenolic resin production", "Adhesives (plywood, particleboard)", "Disinfectant (Formalin)", "Textile treatments"],
    atoms: [
        { id: 0, element: 'C', x: 0, y: 0, z: 0 },
        { id: 1, element: 'O', x: 1.2, y: 0, z: 0 },
        { id: 2, element: 'H', x: -0.6, y: 0.9, z: 0 },
        { id: 3, element: 'H', x: -0.6, y: -0.9, z: 0 },
    ],
    bonds: [
        { source: 0, target: 1, order: 2 }, // C=O double bond
        { source: 0, target: 2, order: 1 },
        { source: 0, target: 3, order: 1 },
    ],
};

/**
 * Adipic Acid (HOOC-(CH2)4-COOH) - Component of Nylon-6,6
 * 3D Zig-zag chain
 */
export const ADIPIC_ACID = {
    name: "Adipic Acid",
    formula: "C₆H₁₀O₄",
    description: "Dicarboxylic acid with six carbons. Reacts with hexamethylenediamine to form Nylon-6,6 through condensation polymerization.",
    polymerType: "Nylon-6,6 (Polyamide)",
    polymerizationType: "Condensation Polymerization",
    properties: {
        meltingPoint: "152°C",
        boilingPoint: "337°C",
        density: "1.36 g/cm³",
        state: "White crystalline solid"
    },
    applications: ["Nylon-6,6 production", "Plasticizers", "Polyurethane foams", "Food acidulant"],
    atoms: [
        // Zig-zag carbon chain in 3D
        { id: 0, element: 'C', x: -2.5, y: -0.5, z: 0.4 }, // COOH C
        { id: 1, element: 'C', x: -1.2, y: 0.3, z: 0 },
        { id: 2, element: 'C', x: 0, y: -0.5, z: 0.4 },
        { id: 3, element: 'C', x: 1.2, y: 0.3, z: 0 },
        { id: 4, element: 'C', x: 2.5, y: -0.5, z: 0.4 },
        { id: 5, element: 'C', x: 3.7, y: 0.3, z: 0 }, // COOH C
        // Functional groups
        { id: 6, element: 'O', x: -2.5, y: -1.7, z: 0.6 }, // =O
        { id: 7, element: 'O', x: -3.7, y: 0.2, z: 0.5 }, // -OH
        { id: 8, element: 'H', x: -4.5, y: -0.3, z: 0.6 },
        { id: 9, element: 'O', x: 3.7, y: 1.5, z: -0.2 }, // =O
        { id: 10, element: 'O', x: 4.9, y: -0.4, z: -0.1 }, // -OH
        { id: 11, element: 'H', x: 5.7, y: 0.1, z: -0.1 },
        // Hydrogens on chain
        { id: 12, element: 'H', x: -1.2, y: 1.2, z: 0.6 },
        { id: 13, element: 'H', x: -1.2, y: 0.6, z: -1.0 },
        { id: 14, element: 'H', x: 0, y: -1.4, z: -0.2 },
        { id: 15, element: 'H', x: 0, y: -0.8, z: 1.4 },
        { id: 16, element: 'H', x: 1.2, y: 1.2, z: 0.6 },
        { id: 17, element: 'H', x: 1.2, y: 0.6, z: -1.0 },
        { id: 18, element: 'H', x: 2.5, y: -1.4, z: -0.2 },
        { id: 19, element: 'H', x: 2.5, y: -0.8, z: 1.4 },
    ],
    bonds: [
        { source: 0, target: 1, order: 1 },
        { source: 1, target: 2, order: 1 },
        { source: 2, target: 3, order: 1 },
        { source: 3, target: 4, order: 1 },
        { source: 4, target: 5, order: 1 },
        // COOH groups
        { source: 0, target: 6, order: 2 },
        { source: 0, target: 7, order: 1 },
        { source: 7, target: 8, order: 1 },
        { source: 5, target: 9, order: 2 },
        { source: 5, target: 10, order: 1 },
        { source: 10, target: 11, order: 1 },
        // Hydrogens
        { source: 1, target: 12, order: 1 },
        { source: 1, target: 13, order: 1 },
        { source: 2, target: 14, order: 1 },
        { source: 2, target: 15, order: 1 },
        { source: 3, target: 16, order: 1 },
        { source: 3, target: 17, order: 1 },
        { source: 4, target: 18, order: 1 },
        { source: 4, target: 19, order: 1 },
    ],
};

/**
 * Hexamethylenediamine (H2N-(CH2)6-NH2) - Component of Nylon-6,6
 */
export const HEXAMETHYLENEDIAMINE = {
    name: "Hexamethylenediamine",
    formula: "C₆H₁₆N₂",
    description: "Diamine with six carbons. Reacts with adipic acid to form Nylon-6,6, a strong and versatile synthetic fiber used in textiles and engineering.",
    polymerType: "Nylon-6,6 (Polyamide)",
    polymerizationType: "Condensation Polymerization",
    properties: {
        meltingPoint: "42°C",
        boilingPoint: "204°C",
        density: "0.89 g/cm³",
        state: "Colorless crystalline solid"
    },
    applications: ["Nylon-6,6 production", "Epoxy curing agent", "Polyurethane production", "Corrosion inhibitors"],
    atoms: [
        // First NH2 group
        { id: 0, element: 'N', x: -3.8, y: 0.5, z: 0.4 },
        { id: 1, element: 'H', x: -4.6, y: 0.1, z: 0.8 },
        { id: 2, element: 'H', x: -3.9, y: 1.5, z: 0.4 },
        // Zig-zag carbon chain in 3D
        { id: 3, element: 'C', x: -2.5, y: -0.1, z: 0 },
        { id: 4, element: 'C', x: -1.2, y: 0.7, z: 0.4 },
        { id: 5, element: 'C', x: 0, y: -0.1, z: 0 },
        { id: 6, element: 'C', x: 1.2, y: 0.7, z: 0.4 },
        { id: 7, element: 'C', x: 2.5, y: -0.1, z: 0 },
        { id: 8, element: 'C', x: 3.8, y: 0.7, z: 0.4 },
        // Second NH2 group
        { id: 9, element: 'N', x: 5.1, y: -0.1, z: 0 },
        { id: 10, element: 'H', x: 5.1, y: -1.1, z: 0 },
        { id: 11, element: 'H', x: 5.9, y: 0.3, z: 0.4 },
        // Hydrogens (zig-zag pattern)
        { id: 12, element: 'H', x: -2.5, y: -1.1, z: 0.4 },
        { id: 13, element: 'H', x: -2.5, y: 0.1, z: -1.0 },
    ],
    bonds: [
        { source: 0, target: 1, order: 1 },
        { source: 0, target: 2, order: 1 },
        { source: 0, target: 3, order: 1 },
        { source: 3, target: 4, order: 1 },
        { source: 4, target: 5, order: 1 },
        { source: 5, target: 6, order: 1 },
        { source: 6, target: 7, order: 1 },
        { source: 7, target: 8, order: 1 },
        { source: 8, target: 9, order: 1 },
        { source: 9, target: 10, order: 1 },
        { source: 9, target: 11, order: 1 },
        // Hydrogens
        { source: 3, target: 12, order: 1 },
        { source: 3, target: 13, order: 1 },
    ],
};

// Export all molecules as a library
export const MOLECULE_LIBRARY = {
    ethylene: ETHYLENE,
    styrene: STYRENE,
    phenol: PHENOL,
    formaldehyde: FORMALDEHYDE,
    adipicAcid: ADIPIC_ACID,
    hexamethylenediamine: HEXAMETHYLENEDIAMINE,
};

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
 * Simplified planar structure
 */
export const ETHYLENE = {
  name: "Ethylene",
  formula: "C₂H₄",
  description: "Monomer for Polyethylene (HDPE/LDPE)",
  applications: ["Plastic bags", "Bottles", "Pipes"],
  atoms: [
    { id: 0, element: 'C', x: 0, y: 0, z: 0 },
    { id: 1, element: 'C', x: 1.34, y: 0, z: 0 },
    { id: 2, element: 'H', x: -0.6, y: 0.9, z: 0 },
    { id: 3, element: 'H', x: -0.6, y: -0.9, z: 0 },
    { id: 4, element: 'H', x: 1.94, y: 0.9, z: 0 },
    { id: 5, element: 'H', x: 1.94, y: -0.9, z: 0 },
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
 * Benzene ring attached to vinyl group
 */
export const STYRENE = {
  name: "Styrene",
  formula: "C₈H₈",
  description: "Monomer for Polystyrene",
  applications: ["Foam cups", "Packaging", "Insulation"],
  atoms: [
    // Vinyl group (C=C)
    { id: 0, element: 'C', x: 0, y: 0, z: 0 },
    { id: 1, element: 'C', x: 1.34, y: 0, z: 0 },
    { id: 2, element: 'H', x: -0.6, y: 0.9, z: 0 },
    { id: 3, element: 'H', x: -0.6, y: -0.9, z: 0 },
    { id: 4, element: 'H', x: 1.94, y: 0.9, z: 0 },
    // Benzene ring
    { id: 5, element: 'C', x: 2.5, y: -0.7, z: 0 },
    { id: 6, element: 'C', x: 3.8, y: -0.3, z: 0 },
    { id: 7, element: 'C', x: 4.3, y: 1.0, z: 0 },
    { id: 8, element: 'C', x: 3.5, y: 2.0, z: 0 },
    { id: 9, element: 'C', x: 2.2, y: 1.6, z: 0 },
    { id: 10, element: 'C', x: 1.7, y: 0.3, z: 0 },
    // Hydrogens on benzene
    { id: 11, element: 'H', x: 2.1, y: -1.7, z: 0 },
    { id: 12, element: 'H', x: 4.4, y: -1.1, z: 0 },
    { id: 13, element: 'H', x: 5.3, y: 1.3, z: 0 },
    { id: 14, element: 'H', x: 3.9, y: 3.0, z: 0 },
    { id: 15, element: 'H', x: 1.6, y: 2.4, z: 0 },
  ],
  bonds: [
    { source: 0, target: 1, order: 2 },
    { source: 0, target: 2, order: 1 },
    { source: 0, target: 3, order: 1 },
    { source: 1, target: 4, order: 1 },
    { source: 1, target: 10, order: 1 },
    // Benzene ring bonds
    { source: 5, target: 6, order: 2 },
    { source: 6, target: 7, order: 1 },
    { source: 7, target: 8, order: 2 },
    { source: 8, target: 9, order: 1 },
    { source: 9, target: 10, order: 2 },
    { source: 10, target: 5, order: 1 },
    // Hydrogen bonds
    { source: 5, target: 11, order: 1 },
    { source: 6, target: 12, order: 1 },
    { source: 7, target: 13, order: 1 },
    { source: 8, target: 14, order: 1 },
    { source: 9, target: 15, order: 1 },
  ],
};

/**
 * Phenol (C6H5OH) - Component of Bakelite
 */
export const PHENOL = {
  name: "Phenol",
  formula: "C₆H₅OH",
  description: "Monomer component for Bakelite (Phenol-formaldehyde resin)",
  applications: ["Circuit boards", "Billiard balls", "Heat-resistant parts"],
  atoms: [
    // Benzene ring
    { id: 0, element: 'C', x: 0, y: 0, z: 0 },
    { id: 1, element: 'C', x: 1.4, y: 0, z: 0 },
    { id: 2, element: 'C', x: 2.1, y: 1.2, z: 0 },
    { id: 3, element: 'C', x: 1.4, y: 2.4, z: 0 },
    { id: 4, element: 'C', x: 0, y: 2.4, z: 0 },
    { id: 5, element: 'C', x: -0.7, y: 1.2, z: 0 },
    // OH group
    { id: 6, element: 'O', x: -0.7, y: -1.2, z: 0 },
    { id: 7, element: 'H', x: -1.6, y: -1.2, z: 0 },
    // Hydrogens on benzene
    { id: 8, element: 'H', x: 1.9, y: -0.9, z: 0 },
    { id: 9, element: 'H', x: 3.1, y: 1.2, z: 0 },
    { id: 10, element: 'H', x: 1.9, y: 3.3, z: 0 },
    { id: 11, element: 'H', x: -0.5, y: 3.3, z: 0 },
    { id: 12, element: 'H', x: -1.7, y: 1.2, z: 0 },
  ],
  bonds: [
    // Benzene ring
    { source: 0, target: 1, order: 2 },
    { source: 1, target: 2, order: 1 },
    { source: 2, target: 3, order: 2 },
    { source: 3, target: 4, order: 1 },
    { source: 4, target: 5, order: 2 },
    { source: 5, target: 0, order: 1 },
    // OH group
    { source: 0, target: 6, order: 1 },
    { source: 6, target: 7, order: 1 },
    // Hydrogens
    { source: 1, target: 8, order: 1 },
    { source: 2, target: 9, order: 1 },
    { source: 3, target: 10, order: 1 },
    { source: 4, target: 11, order: 1 },
    { source: 5, target: 12, order: 1 },
  ],
};

/**
 * Formaldehyde (CH2O) - Component of Bakelite
 */
export const FORMALDEHYDE = {
  name: "Formaldehyde",
  formula: "CH₂O",
  description: "Cross-linking agent for Bakelite",
  applications: ["Resin production", "Adhesives"],
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
 */
export const ADIPIC_ACID = {
  name: "Adipic Acid",
  formula: "C₆H₁₀O₄",
  description: "Dicarboxylic acid component for Nylon-6,6",
  applications: ["Nylon production", "Plasticizers"],
  atoms: [
    // First COOH group
    { id: 0, element: 'C', x: 0, y: 0, z: 0 },
    { id: 1, element: 'O', x: -0.6, y: 1.2, z: 0 },
    { id: 2, element: 'O', x: -0.6, y: -1.2, z: 0 },
    { id: 3, element: 'H', x: -1.5, y: -1.2, z: 0 },
    // Carbon chain
    { id: 4, element: 'C', x: 1.5, y: 0, z: 0 },
    { id: 5, element: 'C', x: 2.2, y: 1.3, z: 0 },
    { id: 6, element: 'C', x: 3.7, y: 1.3, z: 0 },
    { id: 7, element: 'C', x: 4.4, y: 0, z: 0 },
    // Second COOH group
    { id: 8, element: 'C', x: 5.9, y: 0, z: 0 },
    { id: 9, element: 'O', x: 6.5, y: 1.2, z: 0 },
    { id: 10, element: 'O', x: 6.5, y: -1.2, z: 0 },
    { id: 11, element: 'H', x: 7.4, y: -1.2, z: 0 },
    // Hydrogens on carbon chain
    { id: 12, element: 'H', x: 1.8, y: -0.9, z: 0 },
    { id: 13, element: 'H', x: 1.8, y: -0.9, z: 0.8 },
    { id: 14, element: 'H', x: 1.9, y: 2.2, z: 0 },
    { id: 15, element: 'H', x: 1.9, y: 2.2, z: 0.8 },
    { id: 16, element: 'H', x: 4.0, y: 2.2, z: 0 },
    { id: 17, element: 'H', x: 4.0, y: 2.2, z: 0.8 },
    { id: 18, element: 'H', x: 4.1, y: -0.9, z: 0 },
    { id: 19, element: 'H', x: 4.1, y: -0.9, z: 0.8 },
  ],
  bonds: [
    // First COOH
    { source: 0, target: 1, order: 2 },
    { source: 0, target: 2, order: 1 },
    { source: 2, target: 3, order: 1 },
    { source: 0, target: 4, order: 1 },
    // Carbon chain
    { source: 4, target: 5, order: 1 },
    { source: 5, target: 6, order: 1 },
    { source: 6, target: 7, order: 1 },
    { source: 7, target: 8, order: 1 },
    // Second COOH
    { source: 8, target: 9, order: 2 },
    { source: 8, target: 10, order: 1 },
    { source: 10, target: 11, order: 1 },
    // Hydrogens
    { source: 4, target: 12, order: 1 },
    { source: 4, target: 13, order: 1 },
    { source: 5, target: 14, order: 1 },
    { source: 5, target: 15, order: 1 },
    { source: 6, target: 16, order: 1 },
    { source: 6, target: 17, order: 1 },
    { source: 7, target: 18, order: 1 },
    { source: 7, target: 19, order: 1 },
  ],
};

/**
 * Hexamethylenediamine (H2N-(CH2)6-NH2) - Component of Nylon-6,6
 */
export const HEXAMETHYLENEDIAMINE = {
  name: "Hexamethylenediamine",
  formula: "C₆H₁₆N₂",
  description: "Diamine component for Nylon-6,6",
  applications: ["Nylon production"],
  atoms: [
    // First NH2 group
    { id: 0, element: 'N', x: 0, y: 0, z: 0 },
    { id: 1, element: 'H', x: -0.6, y: 0.9, z: 0 },
    { id: 2, element: 'H', x: -0.6, y: -0.9, z: 0 },
    // Carbon chain
    { id: 3, element: 'C', x: 1.5, y: 0, z: 0 },
    { id: 4, element: 'C', x: 2.2, y: 1.3, z: 0 },
    { id: 5, element: 'C', x: 3.7, y: 1.3, z: 0 },
    { id: 6, element: 'C', x: 4.4, y: 0, z: 0 },
    { id: 7, element: 'C', x: 5.9, y: 0, z: 0 },
    { id: 8, element: 'C', x: 6.6, y: 1.3, z: 0 },
    // Second NH2 group
    { id: 9, element: 'N', x: 8.1, y: 1.3, z: 0 },
    { id: 10, element: 'H', x: 8.7, y: 2.2, z: 0 },
    { id: 11, element: 'H', x: 8.7, y: 0.4, z: 0 },
    // Hydrogens (simplified - showing only a few for clarity)
    { id: 12, element: 'H', x: 1.8, y: -0.9, z: 0 },
    { id: 13, element: 'H', x: 1.8, y: -0.9, z: 0.8 },
  ],
  bonds: [
    // First NH2
    { source: 0, target: 1, order: 1 },
    { source: 0, target: 2, order: 1 },
    { source: 0, target: 3, order: 1 },
    // Carbon chain
    { source: 3, target: 4, order: 1 },
    { source: 4, target: 5, order: 1 },
    { source: 5, target: 6, order: 1 },
    { source: 6, target: 7, order: 1 },
    { source: 7, target: 8, order: 1 },
    // Second NH2
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

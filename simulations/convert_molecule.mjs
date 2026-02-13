
import fs from 'fs';
import path from 'path';
import { MOLECULE_LIBRARY } from '../src/MolecularStructures.js';

// Map elements to LAMMPS atom types
const ELEMENT_TO_TYPE = {
    'C': 1,
    'H': 2,
    'O': 3,
    'N': 4,
    'S': 5,
    'P': 6
};

// Map elements to masses
const ELEMENT_MASSES = {
    1: 12.011, // C
    2: 1.008,  // H
    3: 15.999, // O
    4: 14.007, // N
    5: 32.065, // S
    6: 30.974  // P
};

function generateLammpsData(molecule, outputPath) {
    console.log(`Converting ${molecule.name} to LAMMPS data file...`);

    const atomCount = molecule.atoms.length;
    const bondCount = molecule.bonds.length;

    // Identify unique bond types based on order (1=single, 2=double, etc.)
    // For simplicity in this "Hello World", we'll just map bond order directly to bond type
    // In a real force field, this would be more complex (e.g. C-H vs C-C)
    const bondTypes = new Set(molecule.bonds.map(b => b.order)).size;
    const atomTypes = new Set(molecule.atoms.map(a => ELEMENT_TO_TYPE[a.element])).size;

    // Generate Angles (A-B-C)
    const angles = [];
    const adj = Array.from({ length: atomCount }, () => []);

    // Build adjacency list
    molecule.bonds.forEach(bond => {
        adj[bond.source].push(bond.target);
        adj[bond.target].push(bond.source);
    });

    // Find angles
    for (let center = 0; center < atomCount; center++) {
        const neighbors = adj[center];
        if (neighbors.length < 2) continue;

        for (let i = 0; i < neighbors.length; i++) {
            for (let j = i + 1; j < neighbors.length; j++) {
                // A-Center-B
                angles.push({
                    type: 1, // Simplified: All angles are time 1 for now
                    atom1: neighbors[i],
                    atom2: center,
                    atom3: neighbors[j]
                });
            }
        }
    }
    const angleCount = angles.length;

    let content = `LAMMPS data file for ${molecule.name}\n\n`;
    content += `${atomCount} atoms\n`;
    content += `${bondCount} bonds\n`;
    content += `${angleCount} angles\n\n`;

    content += `${Object.keys(ELEMENT_TO_TYPE).length} atom types\n`; // define all potential types to be safe, or just used ones
    content += `3 bond types\n`; // 1=single, 2=double, 3=triple
    content += `1 angle types\n\n`; // We only use 1 angle type for now

    // Box dimensions (just a reasonable box centering around the molecule)
    const boxSize = 20.0;
    content += `${-boxSize / 2} ${boxSize / 2} xlo xhi\n`;
    content += `${-boxSize / 2} ${boxSize / 2} ylo yhi\n`;
    content += `${-boxSize / 2} ${boxSize / 2} zlo zhi\n\n`;

    content += `Masses\n\n`;
    for (const [type, mass] of Object.entries(ELEMENT_MASSES)) {
        content += `${type} ${mass}\n`;
    }
    content += `\n`;

    content += `Atoms # id molecule type charge x y z\n\n`;
    molecule.atoms.forEach(atom => {
        const type = ELEMENT_TO_TYPE[atom.element];
        // id molecule_id type charge x y z
        content += `${atom.id + 1} 1 ${type} 0.0 ${atom.x} ${atom.y} ${atom.z}\n`;
    });
    content += `\n`;

    content += `Bonds # id type atom1 atom2\n\n`;
    molecule.bonds.forEach((bond, index) => {
        // id type atom1 atom2
        content += `${index + 1} ${bond.order} ${bond.source + 1} ${bond.target + 1}\n`;
    });
    content += `\n`;

    content += `Angles # id type atom1 atom2 atom3\n\n`;
    angles.forEach((angle, index) => {
        content += `${index + 1} ${angle.type} ${angle.atom1 + 1} ${angle.atom2 + 1} ${angle.atom3 + 1}\n`;
    });

    fs.writeFileSync(outputPath, content);
    console.log(`Written to ${outputPath}`);
}

// Convert Ethylene by default
const moleculeName = process.argv[2] || 'ethylene';
const molecule = MOLECULE_LIBRARY[moleculeName];

if (!molecule) {
    console.error(`Molecule "${moleculeName}" not found in library.`);
    process.exit(1);
}

generateLammpsData(molecule, path.join(process.cwd(), 'simulations/ethylene_test/data.ethylene'));

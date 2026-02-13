
import fs from 'fs';

function calculateDistance(a1, a2, box) {
    // Convert fractional to cartesian
    const p1 = {
        x: box.xlo + (box.xhi - box.xlo) * a1.xs,
        y: box.ylo + (box.yhi - box.ylo) * a1.ys,
        z: box.zlo + (box.zhi - box.zlo) * a1.zs
    };
    const p2 = {
        x: box.xlo + (box.xhi - box.xlo) * a2.xs,
        y: box.ylo + (box.yhi - box.ylo) * a2.ys,
        z: box.zlo + (box.zhi - box.zlo) * a2.zs
    };

    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const dz = p1.z - p2.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function verifyEthylene(filepath) {
    const content = fs.readFileSync(filepath, 'utf8');
    const lines = content.trim().split('\n');

    // Simple parser for the LAST timestep in the file
    // Find the last "ITEM: TIMESTEP"
    let lastTimestepIndex = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('ITEM: TIMESTEP')) {
            lastTimestepIndex = i;
        }
    }

    if (lastTimestepIndex === -1) {
        console.error("No timestep found in dump file.");
        return;
    }

    const startLine = lastTimestepIndex;

    // Parse Box Bounds (Lines startLine+5, +6, +7)
    // ITEM: BOX BOUNDS pp pp pp
    const xBounds = lines[startLine + 5].split(' ').map(Number);
    const yBounds = lines[startLine + 6].split(' ').map(Number);
    const zBounds = lines[startLine + 7].split(' ').map(Number);

    const box = {
        xlo: xBounds[0], xhi: xBounds[1],
        ylo: yBounds[0], yhi: yBounds[1],
        zlo: zBounds[0], zhi: zBounds[1]
    };

    // Parse Atoms (Lines startLine+9 onwards)
    const atoms = [];
    for (let i = startLine + 9; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith('ITEM:')) break;

        const parts = line.split(/\s+/);
        // Format: id type xs ys zs
        atoms.push({
            id: parseInt(parts[0]),
            type: parseInt(parts[1]),
            xs: parseFloat(parts[2]),
            ys: parseFloat(parts[3]),
            zs: parseFloat(parts[4])
        });
    }

    // Sort by ID to be safe
    atoms.sort((a, b) => a.id - b.id);

    console.log("--- VERIFICATION RESULTS ---");
    console.log(`Read ${atoms.length} atoms from final timestep.`);

    // Ethylene Specific Checks
    // Atom 1 and 2 are Carbons (Type 1 in our script? No, Type 1 is C in our original script, but check in.ethylene)
    // In in.ethylene we set: bond_coeff 2 147.0 1.339 (Double Bond)
    // In data.ethylene, Bond 1 connects Atom 1 and 2 with Type 2 (Double).

    // Check C=C Bond (Atom 1 - Atom 2)
    const ccDist = calculateDistance(atoms[0], atoms[1], box);
    console.log(`C=C Bond Length (Target: 1.339 Å): ${ccDist.toFixed(4)} Å`);

    // Check C-H Bond (Atom 1 - Atom 3) - Bond Type 1
    const chDist = calculateDistance(atoms[0], atoms[2], box);
    console.log(`C-H Bond Length (Target: 1.087 Å): ${chDist.toFixed(4)} Å`);

    // Verify
    const tol = 0.01;
    if (Math.abs(ccDist - 1.339) < tol && Math.abs(chDist - 1.087) < tol) {
        console.log("\n✅ SUCCESS: Structure matches physical parameters!");
    } else {
        console.log("\n⚠️ WARNING: Structure deviates from parameters.");
    }
}

const filepath = process.argv[2] || 'simulations/ethylene_test/dump.ethylene';
verifyEthylene(filepath);

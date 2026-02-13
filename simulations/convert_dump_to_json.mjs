
import fs from 'fs';
import path from 'path';

function parseDumpFile(filepath) {
    const content = fs.readFileSync(filepath, 'utf8');
    const lines = content.trim().split('\n');
    const frames = [];

    let i = 0;
    while (i < lines.length) {
        if (lines[i].startsWith('ITEM: TIMESTEP')) {
            const timestep = parseInt(lines[i + 1]);

            // Bounds (assume orthogonal for now)
            const xBounds = lines[i + 5].split(' ').map(Number);
            const yBounds = lines[i + 6].split(' ').map(Number);
            const zBounds = lines[i + 7].split(' ').map(Number);
            const box = {
                xlo: xBounds[0], xhi: xBounds[1],
                ylo: yBounds[0], yhi: yBounds[1],
                zlo: zBounds[0], zhi: zBounds[1]
            };

            const numAtoms = parseInt(lines[i + 3]);
            const atoms = [];

            // Skip to atoms
            let j = i + 9;
            for (let k = 0; k < numAtoms; k++) {
                if (j >= lines.length) break;
                const line = lines[j].trim();
                const parts = line.split(/\s+/);

                // Parse fractional coordinates and convert to Cartesian
                // Format: id type xs ys zs
                const xs = parseFloat(parts[2]);
                const ys = parseFloat(parts[3]);
                const zs = parseFloat(parts[4]);

                atoms.push({
                    id: parseInt(parts[0]),
                    type: parseInt(parts[1]),
                    x: box.xlo + (box.xhi - box.xlo) * xs,
                    y: box.ylo + (box.yhi - box.ylo) * ys,
                    z: box.zlo + (box.zhi - box.zlo) * zs
                });
                j++;
            }

            // Sort by ID to ensure consistency with static structure
            atoms.sort((a, b) => a.id - b.id);

            frames.push({
                timestep,
                atoms
            });

            i = j;
        } else {
            i++;
        }
    }
    return frames;
}

const filepath = process.argv[2] || 'simulations/ethylene_test/dump.ethylene';
const outputPath = process.argv[3] || 'src/data/ethylene_simulation.json';

console.log(`Converting ${filepath} to JSON...`);
const frames = parseDumpFile(filepath);

// Ensure directory exists
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(frames, null, 2));
console.log(`Saved ${frames.length} frames to ${outputPath}`);

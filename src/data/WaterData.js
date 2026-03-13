// src/data/WaterData.js
/**
 * Realistic Water Quality Data for Engineering Chemistry Unit II
 * All concentrations in mg/L (ppm) unless specified
 */

export const WATER_SOURCES = {
    tap: {
        id: 'tap',
        name: 'Municipal Tap Water',
        description: 'Standard treated water from municipal supply.',
        pH: 7.2,
        tds: 240,
        totalHardness: 180,
        tempHardness: 120,
        permHardness: 60,
        alkalinityP: 0,
        alkalinityM: 110,
        chlorides: 45,
        conductivity: 420, // µS/cm
        suitability: 'Potable, but requires softening for boilers.'
    },
    borewell: {
        id: 'borewell',
        name: 'Groundwater (Borewell)',
        description: 'Untreated water extracted from deep aquifers.',
        pH: 7.8,
        tds: 850,
        totalHardness: 420,
        tempHardness: 280,
        permHardness: 140,
        alkalinityP: 15,
        alkalinityM: 320,
        chlorides: 180,
        conductivity: 1250,
        suitability: 'High hardness; prone to scale formation.'
    },
    ro: {
        id: 'ro',
        name: 'RO Purified Water',
        description: 'Water treated through Reverse Osmosis membrane.',
        pH: 6.5,
        tds: 25,
        totalHardness: 12,
        tempHardness: 4,
        permHardness: 8,
        alkalinityP: 0,
        alkalinityM: 8,
        chlorides: 5,
        conductivity: 45,
        suitability: 'Highly pure; ideal for laboratory use.'
    },
    industrial: {
        id: 'industrial',
        name: 'Cooling Tower Water',
        description: 'Recirculating water used in industrial cooling systems.',
        pH: 8.4,
        tds: 1200,
        totalHardness: 550,
        tempHardness: 150,
        permHardness: 400,
        alkalinityP: 45,
        alkalinityM: 210,
        chlorides: 320,
        conductivity: 1800,
        suitability: 'Extremely high scale and corrosion potential.'
    }
};

export const COMPARISON_METRICS = [
    { key: 'totalHardness', label: 'Total Hardness (mg/L)', unit: 'mg/L' },
    { key: 'tds', label: 'TDS (Total Dissolved Solids)', unit: 'ppm' },
    { key: 'chlorides', label: 'Chlorides', unit: 'mg/L' },
    { key: 'conductivity', label: 'Conductivity', unit: 'µS/cm' }
];

export const EDTA_STEPS = [
    {
        title: 'Standardization',
        description: 'Standardize EDTA solution using standard hard water (prepared with CaCO₃).',
        reagent: 'EDTA + EBT + Buffer (pH 10)',
        colorChange: 'Wine Red → Steel Blue'
    },
    {
        title: 'Total Hardness',
        description: 'Titrate sample water against EDTA to find sum of Ca²⁺ and Mg²⁺.',
        reagent: 'Sample + EBT + Buffer',
        colorChange: 'Wine Red → Steel Blue'
    },
    {
        title: 'Permanent Hardness',
        description: 'Boil water sample to remove temporary hardness, filter, and titrate the filtrate.',
        reagent: 'Boiled Sample + EDTA',
        colorChange: 'Wine Red → Steel Blue'
    }
];

# PolyLab - Dependencies & Licenses Documentation

## Project Overview
PolyLab is an educational web application for teaching polymer chemistry using interactive 3D visualization and graph theory.

---

## Core Dependencies

### Frontend Framework
- **React** (v19.2.0)
  - License: MIT
  - Purpose: UI framework
  - Website: https://react.dev/

- **React DOM** (v19.2.0)
  - License: MIT
  - Purpose: React rendering for web

- **React Router DOM** (v7.12.0)
  - License: MIT
  - Purpose: Client-side routing
  - Website: https://reactrouter.com/

### Build Tools
- **Vite** (v7.2.4)
  - License: MIT
  - Purpose: Fast build tool and dev server
  - Website: https://vitejs.dev/

- **@vitejs/plugin-react** (v5.1.1)
  - License: MIT
  - Purpose: React support for Vite

### 3D Visualization Libraries

#### Phase 1: Polymer Reactor
- **react-force-graph-3d** (v1.29.0)
  - License: MIT
  - Purpose: 3D force-directed graph visualization for polymer structures
  - Website: https://github.com/vasturiano/react-force-graph-3d
  - Used for: Linear, Branched, and Cross-linked polymer visualization

- **Three.js** (v0.182.0)
  - License: MIT
  - Purpose: 3D graphics library (WebGL)
  - Website: https://threejs.org/
  - Used for: Underlying 3D rendering engine

- **@react-three/fiber** (v9.5.0)
  - License: MIT
  - Purpose: React renderer for Three.js
  - Website: https://docs.pmnd.rs/react-three-fiber

- **@react-three/drei** (v10.7.7)
  - License: MIT
  - Purpose: Useful helpers for react-three-fiber
  - Website: https://github.com/pmndrs/drei

#### Phase 2: 3D Material Hub
- **3Dmol.js** (to be added)
  - License: BSD-3-Clause
  - Purpose: WebGL-based molecular visualization
  - Website: https://3dmol.csb.pitt.edu/
  - Used for: Displaying real molecular structures with proper 3D geometry
  - Features:
    - Reads standard molecular file formats (PDB, SDF, MOL2, XYZ)
    - Supports various rendering styles (stick, sphere, cartoon)
    - High-performance WebGL rendering
    - Can integrate with PubChem database

### UI Components & Icons
- **lucide-react** (v0.562.0)
  - License: ISC
  - Purpose: Beautiful & consistent icon library
  - Website: https://lucide.dev/
  - Icons used: Atom, Beaker, FlaskConical, Info, RotateCcw, ChevronDown, ChevronUp, Sliders, HelpCircle, X, Mouse, Maximize, Minimize, RotateCw, Microscope, Droplet, ArrowRight, BookOpen, Zap, Menu

### Animation & Charts
- **framer-motion** (v12.26.1)
  - License: MIT
  - Purpose: Animation library for React
  - Website: https://www.framer.com/motion/

- **recharts** (v3.6.0)
  - License: MIT
  - Purpose: Charting library (for future Water Dashboard)
  - Website: https://recharts.org/

### Development Tools
- **ESLint** (v9.39.1)
  - License: MIT
  - Purpose: Code linting and quality

- **@eslint/js** (v9.39.1)
  - License: MIT
  - Purpose: ESLint JavaScript configs

- **eslint-plugin-react-hooks** (v7.0.1)
  - License: MIT
  - Purpose: ESLint rules for React Hooks

- **eslint-plugin-react-refresh** (v0.4.24)
  - License: MIT
  - Purpose: ESLint rules for React Fast Refresh

- **globals** (v16.5.0)
  - License: MIT
  - Purpose: Global identifiers for ESLint

### TypeScript Definitions
- **@types/react** (v19.2.5)
  - License: MIT
  - Purpose: TypeScript definitions for React

- **@types/react-dom** (v19.2.3)
  - License: MIT
  - Purpose: TypeScript definitions for React DOM

---

## External APIs & Data Sources

### PubChem (National Institutes of Health)
- **Service:** PubChem REST API
- **License:** Public Domain (U.S. Government)
- **Purpose:** Fetching real molecular structure data
- **Website:** https://pubchem.ncbi.nlm.nih.gov/
- **API Docs:** https://pubchemdocs.ncbi.nlm.nih.gov/pug-rest
- **Usage:** Free, no API key required
- **Data Retrieved:**
  - 3D molecular coordinates (SDF format)
  - Chemical properties
  - Molecular formulas
- **Molecules Used:**
  - Ethylene (CID: 6325)
  - Styrene (CID: 7501)
  - Phenol (CID: 996)
  - Formaldehyde (CID: 712)
  - Adipic Acid (CID: 196)
  - Hexamethylenediamine (CID: 3286)

---

## Fonts

### Google Fonts
- **Inter** (Variable font, weights: 300-800)
  - License: SIL Open Font License 1.1
  - Purpose: Primary body text font
  - Website: https://fonts.google.com/specimen/Inter

- **Poppins** (weights: 400-800)
  - License: SIL Open Font License 1.1
  - Purpose: Display font for headings
  - Website: https://fonts.google.com/specimen/Poppins

---

## License Compliance Summary

All dependencies used in this project are under permissive open-source licenses:
- **MIT License:** Most dependencies (allows commercial use, modification, distribution)
- **BSD-3-Clause:** 3Dmol.js (allows commercial use, modification, distribution)
- **ISC License:** lucide-react (functionally equivalent to MIT)
- **SIL OFL 1.1:** Google Fonts (free for any use)
- **Public Domain:** PubChem data (U.S. Government, no restrictions)

✅ **All licenses permit:**
- Commercial use
- Modification
- Distribution
- Private use

✅ **No licenses require:**
- Payment or royalties
- Copyleft (GPL-style restrictions)
- API keys or registration

---

## Attribution Requirements

### Required Attributions:
1. **3Dmol.js** - Include BSD-3-Clause license notice in documentation
2. **PubChem** - Cite as data source: "Data from PubChem (https://pubchem.ncbi.nlm.nih.gov/)"

### Recommended Attributions:
- List all open-source libraries in About page or README
- Link to respective project websites

---

## Future Dependencies (Planned)

### Phase 3: Water Dashboard
- Additional charting libraries (if needed beyond Recharts)
- Data visualization tools for water analysis

---

## Installation Instructions

To install all dependencies:
```bash
npm install
```

To add new dependencies:
```bash
# For 3Dmol.js (when implementing)
npm install 3dmol

# For any other library
npm install <package-name>
```

---

## Version Control & Updates

- **Lock File:** `package-lock.json` ensures consistent dependency versions
- **Update Strategy:** Review and test updates before deploying
- **Security:** Run `npm audit` regularly to check for vulnerabilities

---

## Contact & Maintenance

**Project Maintainer:** Pranjul Gupta
**Institution:** Cluster Innovation Centre, University of Delhi
**GitHub:** https://github.com/Pranjul-00

For questions about dependencies or licensing, refer to individual project documentation linked above.

---

**Last Updated:** January 18, 2026
**Document Version:** 1.0

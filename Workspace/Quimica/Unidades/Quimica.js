const elementos = {
    1: 'Hidrógeno', 2: 'Helio', 3: 'Litio', 4: 'Berilio', 5: 'Boro', 6: 'Carbono', 
    7: 'Nitrógeno', 8: 'Oxígeno', 9: 'Flúor', 10: 'Neón', 11: 'Sodio', 12: 'Magnesio', 
    13: 'Aluminio', 14: 'Silicio', 15: 'Fósforo', 16: 'Azufre', 17: 'Cloro', 18: 'Argón', 
    19: 'Potasio', 20: 'Calcio', 21: 'Escandio', 22: 'Titanio', 23: 'Vanadio', 24: 'Cromo', 
    25: 'Manganeso', 26: 'Hierro', 27: 'Cobalto', 28: 'Níquel', 29: 'Cobre', 30: 'Zinc', 
    31: 'Galio', 32: 'Germanio', 33: 'Arsénico', 34: 'Selenio', 35: 'Bromo', 36: 'Kriptón', 
    37: 'Rubidio', 38: 'Estroncio', 39: 'Itrio', 40: 'Circonio', 41: 'Niobio', 42: 'Molibdeno', 
    43: 'Tecnecio', 44: 'Rutenio', 45: 'Rodio', 46: 'Paladio', 47: 'Plata', 48: 'Cadmio', 
    49: 'Indio', 50: 'Estaño', 51: 'Antimonio', 52: 'Telurio', 53: 'Yodo', 54: 'Xenón', 
    55: 'Cesio', 56: 'Bario', 57: 'Lantano', 58: 'Cerio', 59: 'Praseodimio', 60: 'Neodimio', 
    61: 'Prometio', 62: 'Samario', 63: 'Europio', 64: 'Gadolinio', 65: 'Terbio', 66: 'Disprosio', 
    67: 'Holmio', 68: 'Erbio', 69: 'Tulio', 70: 'Iterbio', 71: 'Lutecio', 72: 'Hafnio', 
    73: 'Tantalio', 74: 'Wolframio', 75: 'Renio', 76: 'Osmio', 77: 'Iridio', 78: 'Platino', 
    79: 'Oro', 80: 'Mercurio', 81: 'Talio', 82: 'Plomo', 83: 'Bismuto', 84: 'Polonio', 
    85: 'Astato', 86: 'Radón', 87: 'Francio', 88: 'Radio', 89: 'Actinio', 90: 'Torio', 
    91: 'Protactinio', 92: 'Uranio', 93: 'Neptunio', 94: 'Plutonio', 95: 'Americio', 
    96: 'Curio', 97: 'Berkelio', 98: 'Californio', 99: 'Einstenio', 100: 'Fermio', 
    101: 'Mendelevio', 102: 'Nobelio', 103: 'Lawrencio', 104: 'Rutherfordio', 
    105: 'Dubnio', 106: 'Seaborgio', 107: 'Bohrio', 108: 'Hassio', 109: 'Meitnerio', 
    110: 'Darmstadtio', 111: 'Roentgenio', 112: 'Copernicio', 113: 'Nihonio', 
    114: 'Flerovio', 115: 'Moscovio', 116: 'Livermorio', 117: 'Tenesino', 118: 'Oganesón'
};

function generarOrbitales() {
    const orbitales = [];
    for (let n = 1; n <= 7; n++) {
        for (let l = 0; l < n; l++) {
            if (l > 3) continue;
            orbitales.push({n, l});
        }
    }
    orbitales.sort((a, b) => (a.n + a.l) - (b.n + b.l) || a.n - b.n);
    return orbitales;
}

function obtenerConfiguracion(z) {
    const orbitales = generarOrbitales();
    let electronesRestantes = z;
    const configuracion = [];

    for (const {n, l} of orbitales) {
        const maxElectrones = 2 * (2 * l + 1);
        const electrones = Math.min(electronesRestantes, maxElectrones);
        if (electrones > 0) {
            configuracion.push({n, l, electrones});
            electronesRestantes -= electrones;
        }
        if (electronesRestantes === 0) break;
    }
    return configuracion;
}

function crearDiagramaOrbital(config) {
    const letras = ['s', 'p', 'd', 'f'];
    let diagramaHTML = '';

    config.forEach(({n, l, electrones}) => {
        const orbitales = 2 * l + 1;
        let electronesRestantes = electrones;
        const lineas = [];

        // Crear orbitales
        const orbitalesArray = Array.from({length: orbitales}, () => []);

        // Llenar con spins up primero (Regla de Hund)
        for (let i = 0; i < orbitales; i++) {
            if (electronesRestantes <= 0) break;
            orbitalesArray[i].push('↑');
            electronesRestantes--;
        }

        // Llenar con spins down
        for (let i = 0; i < orbitales; i++) {
            while (electronesRestantes > 0 && orbitalesArray[i].length < 2) {
                orbitalesArray[i].push('↓');
                electronesRestantes--;
            }
        }

        // Crear HTML
        diagramaHTML += `<div><strong>${n}${letras[l]}:</strong> `;
        orbitalesArray.forEach(orb => {
            diagramaHTML += `<div class="orbital">
                [${orb.join('')}]
            </div>`;
        });
        diagramaHTML += '</div>';
    });

    return diagramaHTML;
}

function explicarDiagrama(config) {
    const letras = ['s', 'p', 'd', 'f'];
    let explicacion = `<h3>Explicación del Diagrama de Orbitales:</h3>`;
    explicacion += `<p>El diagrama de orbitales se construye siguiendo las reglas de la mecánica cuántica:</p>`;
    explicacion += `<ul>
        <li><strong>Principio de Aufbau:</strong> Los electrones ocupan primero los orbitales de menor energía.</li>
        <li><strong>Principio de exclusión de Pauli:</strong> En un orbital no puede haber más de dos electrones, y deben tener espines opuestos.</li>
        <li><strong>Regla de Hund:</strong> Los electrones ocupan orbitales vacíos del mismo subnivel antes de aparearse.</li>
    </ul>`;

    explicacion += `<p>Para el elemento seleccionado, los orbitales se llenan de la siguiente manera:</p>`;
    config.forEach(({ n, l, electrones }) => {
        const orbital = `${n}${letras[l]}`;
        explicacion += `<p>El orbital <strong>${orbital}</strong> puede contener un máximo de ${2 * (2 * l + 1)} electrones. En este caso, tiene ${electrones} electrones.</p>`;
    });

    explicacion += `<p>El diagrama muestra cómo se distribuyen los electrones en cada orbital, respetando las reglas mencionadas.</p>`;
    return explicacion;
}

function calcular() {
    const entrada = document.getElementById('elemento').value.trim();
    const z = parseInt(entrada);

    if (!z || z < 1 || z > 118 || !elementos[z]) {
        alert(`El número atómico "${entrada}" no está en la tabla periódica.`);
        return;
    }

    const nombreElemento = elementos[z];
    const config = obtenerConfiguracion(z);
    const configStr = config.map(({ n, l, electrones }) =>
        `${n}${['s', 'p', 'd', 'f'][l]}${electrones.toString().sup()}`
    ).join(' ');

    const diagrama = crearDiagramaOrbital(config);
    const explicacion = explicarDiagrama(config);

    const resultados = document.getElementById('resultados');
    resultados.innerHTML = `
        <h3>Elemento: ${nombreElemento} (${z})</h3>
        <h3>Configuración electrónica:</h3>
        <div>${configStr}</div>
        <h3>Diagrama de orbitales:</h3>
        ${diagrama}
        ${explicacion}
    `;
}

function resetear() {
    document.getElementById('elemento').value = '';
    document.getElementById('resultados').innerHTML = '';
}

// Helper para superíndices
String.prototype.sup = function() {
    return this.replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
};
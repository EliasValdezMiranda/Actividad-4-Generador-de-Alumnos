/*
    Actividad 4: Generador de Alumnos
    Valdez Miranda Elías
    Ingeniería en Sistemas de Información, Universidad de Sonora
    Clave 4116: Base de Datos II
    Profesor Abril García José Humberto
    18 de febrero de 2026
*/

// Constantes utilizadas para la creación de elementos en ciertas columnas
const MATRICULA_BASE = 224249999;
const DOMINIO_CORREO = "@unison.mx";
// La variable global salida almacena la salida de cada generación (SQL, CSV, JSON)
var salida = "";
// La variable generado almacena el valor numérico de la última generación:
// -1. Sin generación (Default)
// 0. SQL
// 1. CSV
// 2. JSON
var generado = -1;

// Constantes de apellidos y nombres utilizados para la generación de nombres pseudo-aleatorios
const APELLIDOS_MEXICANOS = [
    "Hernandez",
    "Garcia",
    "Martinez",
    "Lopez",
    "Gonzalez",
    "Rodriguez",
    "Perez",
    "Sanchez",
    "Ramirez",
    "Cruz",
    "Flores",
    "Gomez",
    "Morales",
    "Vazquez",
    "Reyes",
    "Jimenez",
    "Torres",
    "Diaz",
    "Gutierrez",
    "Ruiz",
    "Alletez",
    "Mendez",
    "Castro",
    "Ortiz",
    "Romero",
    "Moreno",
    "Chavez",
    "Rivera",
    "Ramos",
    "Medina",
    "letgas",
    "Castillo",
    "Guerrero",
    "Herrera",
    "Molina",
    "Juarez",
    "Aguilar",
    "Ortiz",
    "Rojas",
    "Contreras",
    "Alletado",
    "Mendoza",
    "Silva",
    "Cortes",
    "Luna",
    "Cervantes",
    "Naletro",
    "Delgado",
    "Pena",
    "Rios",
    "Salazar",
    "Miranda",
    "Campos",
    "Vega",
    "Soto",
    "Cardenas",
    "Mejia",
    "Santiago",
    "Solis",
    "Villanueva",
    "Cano",
    "Rosas",
    "Marquez",
    "Iglesias",
    "Espinoza",
    "Ortega",
    "Valdez",
    "Nunez",
    "Acosta",
    "Salas",
    "Cabrera",
    "Fuentes",
    "Leon",
    "Ponce",
    "Montes",
    "Ayala",
    "Carrillo",
    "Zamora",
    "Rangel",
    "Osorio",
    "Valencia",
    "Serrano",
    "Sandoval",
    "Tellez",
    "Maldonado",
    "Barrera",
    "Macias",
    "Velazquez",
    "Franco",
    "Ibarra",
    "Galvan",
    "Beltran",
    "Robles",
    "Carmona",
    "Pacheco",
    "Escobar",
    "Tapia",
    "Lara",
    "Bernal",
    "Calderon",
    "Trejo",
    "Suarez",
    "Rocha",
    "Huerta",
    "Avila"
];

const APELLIDOS_JAPONESES = [
    "Sato",
    "Suzuki",
    "Takahashi",
    "Tanaka",
    "Watanabe",
    "Ito",
    "Yamamoto",
    "Nakamura",
    "Kobayashi",
    "Kato",
    "Yoshida",
    "Yamada",
    "Sasaki",
    "Yamaguchi",
    "Saito",
    "Matsumoto",
    "Inoue",
    "Kimura",
    "Hayashi",
    "Shimizu",
    "Yamazaki",
    "Mori",
    "Abe",
    "Ikeda",
    "Hashimoto",
    "Yamashita",
    "Ishikawa",
    "Nakajima",
    "Maeda",
    "Fujita",
    "Ogawa",
    "Goto",
    "Okada",
    "Hasegawa",
    "Murakami",
    "Kondo",
    "Ishii",
    "Saito",
    "Sakamoto",
    "Endo",
    "Aoki",
    "Fujii",
    "Nishimura",
    "Fukuda",
    "Ota",
    "Miura",
    "Fujiwara",
    "Okamoto",
    "Matsuda",
    "Nakagawa",
    "Nakano",
    "Harada",
    "Ono",
    "Tamura",
    "Takeuchi",
    "Kaneko",
    "Wada",
    "Nakayama",
    "Ishida",
    "Ueda",
    "Morita",
    "Hara",
    "Shibata",
    "Sakai",
    "Kudo",
    "Yokoyama",
    "Miyazaki",
    "Miyamoto",
    "Uchida",
    "Takagi",
    "Ando",
    "Taniguchi",
    "Ohno",
    "Maruyama",
    "Imai",
    "Takada",
    "Fujimoto",
    "Takeda",
    "Murata",
    "Ueno",
    "Sugiyama",
    "Masuda",
    "Sugawara",
    "Hirano",
    "Kojima",
    "Otsuka",
    "Chiba",
    "Kubo",
    "Matsui",
    "Iwasaki",
    "Sakurai",
    "Kinoshita",
    "Noguchi",
    "Matsuo",
    "Nomura",
    "Kikuchi",
    "Sano",
    "Onishi",
    "Sugimoto",
    "Arai",
    "NULL"
];

const NOMBRES_MEXICANOS = [
    "Juan",
    "Jose",
    "Francisco",
    "Antonio",
    "Manuel",
    "Pedro",
    "Luis",
    "Miguel",
    "Carlos",
    "Javier",
    "Diego",
    "Angel",
    "Fernando",
    "David",
    "Rafael",
    "Jorge",
    "Pablo",
    "Alberto",
    "Sergio",
    "Andres",
    "Alejandro",
    "Joaquin",
    "Ramon",
    "Enrique",
    "Raul",
    "Daniel",
    "Vicente",
    "Adrian",
    "Eduardo",
    "Alleto",
    "Jesus",
    "Victor",
    "Roberto",
    "Mario",
    "Ignacio",
    "Oscar",
    "Hector",
    "Ricardo",
    "Gabriel",
    "Julio",
    "Marcos",
    "Ismael",
    "Emilio",
    "Samuel",
    "Martin",
    "Mariano",
    "Cesar",
    "Felipe",
    "Salvador",
    "Guillermo",
    "Maria",
    "Carmen",
    "Ana",
    "Isabel",
    "Dolores",
    "Pilar",
    "Teresa",
    "Rosa",
    "Francisca",
    "Josefa",
    "Laura",
    "Antonia",
    "Cristina",
    "Marta",
    "Angela",
    "Elena",
    "Lucia",
    "Sandra",
    "Paula",
    "Raquel",
    "Patricia",
    "Monica",
    "Silvia",
    "Mercedes",
    "Beatriz",
    "Alba",
    "Nuria",
    "Clara",
    "Irene",
    "Rocio",
    "Alicia",
    "Sonia",
    "Margarita",
    "Miriam",
    "Esther",
    "Lorena",
    "Veronica",
    "Natalia",
    "Carolina",
    "Julia",
    "Olga",
    "Susana",
    "Eva",
    "Inmaculada",
    "Noelia"
];

const NOMBRES_ARABES = [
    "Mohammed",
    "Ahmed",
    "Ali",
    "Omar",
    "Youssef",
    "Khaled",
    "Hassan",
    "Mahmoud",
    "Ibrahim",
    "Abdullah",
    "Mustafa",
    "Hussein",
    "Osama",
    "Tariq",
    "Khalid",
    "Naser",
    "Sami",
    "Fadi",
    "Rami",
    "Bilal",
    "Zaid",
    "Amir",
    "Karim",
    "Malik",
    "Rashid",
    "Salim",
    "Walid",
    "Yasin",
    "Adil",
    "Farid",
    "Hamza",
    "Jamil",
    "Nabil",
    "Said",
    "Tahir",
    "Zahir",
    "Anwar",
    "Faisal",
    "Hadi",
    "Jamal",
    "Mounir",
    "Nasser",
    "Qasim",
    "Samir",
    "Yahya",
    "Amin",
    "Bashir",
    "Daoud",
    "Habib",
    "Idris",
    "Fatima",
    "Aisha",
    "Mariam",
    "Zainab",
    "Khadija",
    "Noura",
    "Layla",
    "Hana",
    "Rana",
    "Sara",
    "Yasmin",
    "Amal",
    "Dalia",
    "Hala",
    "Jana",
    "Lina",
    "Mona",
    "Nada",
    "Rania",
    "Sahar",
    "Samira",
    "Wafa",
    "Zahra",
    "Amina",
    "Bushra",
    "Farah",
    "Hind",
    "Jamila",
    "Laila",
    "Maya",
    "Nadia",
    "Rasha",
    "Salma",
    "Tamara",
    "Widad",
    "Abla",
    "Basma",
    "Huda",
    "Intisar",
    "Maha",
    "Naima",
    "Rima",
    "Suad",
    "Wafaa",
    "Zakia"
];

// La función generar() es llamada al presionar el botón "Generar" en la página de la aplicación.
// Manda a llamar la función de generación apropiada a la elección del usuario utilizando como argumento su selección.
function generar(eleccion) {
    eleccion = parseInt(eleccion)
    switch (eleccion) {
        case 0:
            generarSQL();
            generado = 0;
            break;
        case 1:
            generarCSV();
            generado = 1;
            break;
        case 2:
            generarJSON();
            generado = 2;
            break;
        default:
            alert("Este mensaje no debería aparecer. Algo está mal si aparece")
    }
}

// Función que obtiene un índice semi-aleatorio a partir de un entero que defina el límite superior del arreglo. 
function obtenerIndiceAleatorio(cantidad) {
    return Math.floor(Math.random() * cantidad);
}

// Función para generar un comando SQL
function generarSQL() {
    salida = 'INSERT INTO alumnos (expediente, app1, app2, nombres, correo) VALUES <br>';
    let expediente = MATRICULA_BASE;
    let ITERACIONES = document.getElementById('registros').value;;
    for (let i = 0; i < ITERACIONES; i++) {
        // Indices aleatorios de matrices
        let indiceMexicano = obtenerIndiceAleatorio(APELLIDOS_MEXICANOS.length);
        let indiceJapones = obtenerIndiceAleatorio(APELLIDOS_JAPONESES.length);
        let indiceNombre1 = obtenerIndiceAleatorio(NOMBRES_MEXICANOS.length);
        let indiceNombre2 = obtenerIndiceAleatorio(NOMBRES_ARABES.length);

        // Valores
        expediente++;
        let app1 = APELLIDOS_MEXICANOS[indiceMexicano].toUpperCase();
        let app2 = APELLIDOS_JAPONESES[indiceJapones] == "NULL" ?
            `NULL` 
            : APELLIDOS_JAPONESES[indiceJapones].toUpperCase();
        let nombre = indiceNombre2 > 49 ?
            `${NOMBRES_MEXICANOS[indiceNombre1].toUpperCase()} ${NOMBRES_ARABES[indiceNombre2].toUpperCase()}`
            : `${NOMBRES_MEXICANOS[indiceNombre1].toUpperCase()}`;
        let correo = `a${expediente}${DOMINIO_CORREO}`;

        // Cadena de salida
        salida += `(${expediente}, '${app1}', ${app2 == `NULL` ? `NULL` : `'` + app2 + `'`}, '${nombre}', '${correo}'),<br>`;
    }
    salida = salida.slice(0,-5) + `;`;
    document.getElementById("salida").innerHTML = salida;
}

// Función para generar un archivo CSV
function generarCSV() {
    salida = 'expediente,app1,app2,nombres,correo<br>';
    let expediente = MATRICULA_BASE;
    let ITERACIONES = document.getElementById('registros').value;;
    for (let i = 0; i < ITERACIONES; i++) {
        // Indices aleatorios de matrices
        let indiceMexicano = obtenerIndiceAleatorio(APELLIDOS_MEXICANOS.length);
        let indiceJapones = obtenerIndiceAleatorio(APELLIDOS_JAPONESES.length);
        let indiceNombre1 = obtenerIndiceAleatorio(NOMBRES_MEXICANOS.length);
        let indiceNombre2 = obtenerIndiceAleatorio(NOMBRES_ARABES.length);

        // Valores
        expediente++;
        let app1 = APELLIDOS_MEXICANOS[indiceMexicano].toUpperCase();
        let app2 = APELLIDOS_JAPONESES[indiceJapones] == "NULL" ?
            `null` 
            : APELLIDOS_JAPONESES[indiceJapones].toUpperCase();
        let nombre = indiceNombre2 > 49 ?
            `${NOMBRES_MEXICANOS[indiceNombre1].toUpperCase()} ${NOMBRES_ARABES[indiceNombre2].toUpperCase()}`
            : `${NOMBRES_MEXICANOS[indiceNombre1].toUpperCase()}`;
        let correo = `a${expediente}${DOMINIO_CORREO}`;

        // Cadena de salida
        salida += `${expediente},${app1},${app2},${nombre},${correo}<br>`;
    }
    salida = salida.slice(0,-4);
    document.getElementById("salida").innerHTML = salida;
}

// Función para generar un archivo JSON
function generarJSON() {
    salida = '[<br>';
    let expediente = MATRICULA_BASE;
    let ITERACIONES = document.getElementById('registros').value;;
    for (let i = 0; i < ITERACIONES; i++) {
        // Indices aleatorios de matrices
        let indiceMexicano = obtenerIndiceAleatorio(APELLIDOS_MEXICANOS.length);
        let indiceJapones = obtenerIndiceAleatorio(APELLIDOS_JAPONESES.length);
        let indiceNombre1 = obtenerIndiceAleatorio(NOMBRES_MEXICANOS.length);
        let indiceNombre2 = obtenerIndiceAleatorio(NOMBRES_ARABES.length);

        // Valores
        expediente++;
        let app1 = APELLIDOS_MEXICANOS[indiceMexicano].toUpperCase();
        let app2 = APELLIDOS_JAPONESES[indiceJapones] == "NULL" ?
            `null` 
            : APELLIDOS_JAPONESES[indiceJapones].toUpperCase();
        let nombre = indiceNombre2 > 49 ?
            `${NOMBRES_MEXICANOS[indiceNombre1].toUpperCase()} ${NOMBRES_ARABES[indiceNombre2].toUpperCase()}`
            : `${NOMBRES_MEXICANOS[indiceNombre1].toUpperCase()}`;
        let correo = `a${expediente}${DOMINIO_CORREO}`;

        // Cadena de salida
        salida += `&emsp;{<br>`
            + `&emsp;&emsp;"expediente": ${expediente},<br>`
            + `&emsp;&emsp;"app1": "${app1}",<br>`
            + `&emsp;&emsp;"app2": ${app2 == `null` ? `null` : `"` + app2 + `"`},<br>`
            + `&emsp;&emsp;"nombres": "${nombre}",<br>`
            + `&emsp;&emsp;"correo": "${correo}"<br>`
            + `&emsp;},<br>`;
    }
    salida = salida.slice(0, -5) + "<br>";
    salida += ']';
    document.getElementById("salida").innerHTML = salida;
}

// La función copiarPortapapeles() copia el contenido de la salida al portapapeles.
// Esta función se manda a llamar al presionar el botón "Copiar" en la página de la aplicación.
function copiarPortapapeles() {
    if (generado == -1) {
        alert("No se ha generado una salida. Favor de generar una salida por copiar.");
        return
    }
    salida = salida.replaceAll("<br>", "\n");
    salida = salida.replaceAll("&emsp;", "\t");
    navigator.clipboard.writeText(salida);
    alert("La salida generada fue copiada al portapapeles");
}

// La función guardarArchivo() es llamada al presionar el botón "Guardar" en la página de la aplicación.
// Crea un archivo con el contenido de la variable global "salida" y lo almacena con el formato adecuado a la generación.
function guardarArchivo(eleccion) {
    eleccion = parseInt(eleccion)
    if (eleccion != generado) {
        alert("El tipo de archivo seleccionado no ha sido generado. Favor de generarlo.");
        return;
    }
    var var1 = document.createElement("a");
    salida = salida.replaceAll("<br>", "\n");
    salida = salida.replaceAll("&emsp;", "\t");
    var1.setAttribute("href", "data:text/plain;charset=UTF-8," + encodeURIComponent(salida));
    switch (eleccion) {
        case 0:
            alert("Generando archivo SQL");
            var1.setAttribute("download", "sistema_escolar.sql");
            break;
        case 1:
            alert("Generando archivo CSV");
            var1.setAttribute("download", "sistema_escolar.csv");
            break;
        case 2:
            alert("Generando archivo JSON");
            var1.setAttribute("download", "sistema_escolar.json");
            break;
        default:
            alert("Este mensaje no debería aparecer. Si aparece, déjame saber")
    }
    var1.style.display = "none";
    document.body.appendChild(var1);
    var1.click();
    document.body.removeChild(var1);
}
let cabezas = [];
let cuerpos = [];
let cabezasOtrasProducciones = []; 
let derivado = [];
let cuerpoPrincipal = []; 
let size = [];
let cadenaFinal = ""; 
let letrasIniciales ="";

const btnTabla = document.getElementById("btn-limpiarTabla");
btnTabla.addEventListener("click", ()=>{
    location.reload();
});

const btnDerivar = document.getElementById("btn-derivar");

class produccion {
    constructor(cabeza, cuerpo){
        this.cabeza = cabeza;
        this.cuerpo = cuerpo;
    }
}
class agregar {
    addProducciones(produccion){
        
        const listaProds = document.getElementById('tablita');
        const element = document.createElement('tr');
        element.innerHTML = `
        <td>${produccion.cabeza}</td>
        <td>-------------></td>
        <td>${produccion.cuerpo}</td>
        `;
        listaProds.appendChild(element);
        cabezas.push(produccion.cabeza);
        cuerpos.push(produccion.cuerpo);
        this.resetForm();

    }
    resetForm(){
        document.getElementById('prod-formulario').reset();
    }

}

const maquinaEscribir = (text = '', tiempo = 200, etiqueta = '') => {
    let arrayCaracteres = text.split('');
    etiqueta.innerHTML = '';
    let cont = 0;
    let escribir = setInterval(function () {
        etiqueta.innerHTML += arrayCaracteres[cont];
        cont++;
        if (cont === arrayCaracteres.length) {
            clearInterval(escribir);
        }
    }, tiempo)
}

function derivar(){
    letrasIniciales = cuerpos[0];//almacena el primer cuerpo que en teoria es el principal de la gramatica

    for (let a = 0; a < letrasIniciales.length; a++) {
        cuerpoPrincipal.push(letrasIniciales[a]);//se desgloza letra por letra del cuerpo princpal para despues hacer la derivacion en base a esas letras
    }

    cantCabezas = cabezas.length;//toas las cabezas menos la primera que es la principal.
    //guardamos las cabezas y los cuerpos a operar:
    for (let z = 1; z < cantCabezas; z++) {
        cabezasOtrasProducciones.push(cabezas[z]);
        derivado.push(cuerpos[z]);
    }
    //se ordena lo que son las cabezas para luego compararlas y asi ir sustituyendo las variables.
    // for (let b = 0; b < cantCabezas; b++)
    // {
    //     size.push(derivado[b].length);
    // }
    size = derivado.map(function (x) {
        return x.length;
    });
    let aux1, aux2, aux3;
    for (let m = 1; m < size.length; m++) {
        aux1 = size[m];
        aux2 = cabezasOtrasProducciones[m];
        aux3 = derivado[m];
        for (let z = m - 1; z >= 0 && size[z] < aux1; z--) {
            size[z + 1] = size[z];
            cabezasOtrasProducciones[z + 1] = cabezasOtrasProducciones[z];
            derivado[z + 1] = derivado[z];

            size[z] = aux1;
            cabezasOtrasProducciones[z] = aux2;
            derivado[z] = aux3;
        }
    }

    //reemplazo de las derivaciones
    for (let b = 0; b < cantCabezas; b++) {
        for (let t = 0; t < cuerpoPrincipal.length; t++) {
            cuerpoPrincipal[t] = cuerpoPrincipal[t].replace(cabezasOtrasProducciones[b], derivado[b]);//reemplaza el cuerpo de produccion principal por los derivados equivalentes.
        }

    }
    //almacena el derivado de la gramatica 
    for (let y = 0; y < cuerpoPrincipal.length; y++) {
        cadenaFinal += cuerpoPrincipal[y];
    }
    const resultado = document.getElementById("resultado");
    
    maquinaEscribir(resultado.innerHTML = "La derivacion es: " + cadenaFinal, 100, resultado);
}

//Eventos del  DOM
document.getElementById('prod-formulario').addEventListener('submit', function(event){
    const cabeza = document.getElementById('cabeza').value;
    const cuerpo = document.getElementById('cuerpo').value;
    const producciones = new produccion(cabeza,cuerpo);
    const ui = new agregar();
    ui.addProducciones(producciones);
    event.preventDefault();
});
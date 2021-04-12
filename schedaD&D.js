const tabellaValori = document.querySelector('#tabellaValori');
const tabellaAssegnazioni = document.querySelector('#tabellaAssegnazioni');
const tabellaDefinizione = document.querySelector('#tabellaDefinizione');

const h2 = document.querySelector('h2');

const genera = document.querySelector('#genera');
const riesegui_conferma = document.querySelector('#riesegui_conferma');
const riesegui = document.querySelector('#riesegui');
const conferma = document.querySelector('#conferma');
const ripristina = document.querySelector('#ripristina');
const scaricaSchedina = document.querySelector('#scaricaSchedina');

let sestina = Array(6);
let bonus = Array(6);
let contatoreFinale=0;

const caratteristiche = ["Forza", "Destrezza", "Costituzione", "Intelligenza", "Saggezza", "Carisma"];


genera.addEventListener('click', start);
riesegui.addEventListener('click', resetta);
conferma.addEventListener('click', assegnazione);
ripristina.addEventListener('click', ripristinaAssegnazione);
scaricaSchedina.addEventListener('click', scarica);
let pulsante=0;


function start() {
    //Generazione SESTINA e BONUS
    for (var i = 0; i < sestina.length; i++) {
        sestina[i] = dado();
        bonus[i] = calcolaBonus(sestina[i]);
    }

    stampaTabella(sestina, bonus);
    tabellaValori.className = 'tabella1On';
    genera.className = 'containerOff';
    riesegui_conferma.className = 'container1On';
}



function stampaTabella(sestina, bonus) {
    const tr = document.createElement('tr');
    const th1 = document.createElement('th');
    const th2 = document.createElement('th');
    let intestazione1 = "Tiro dado";
    let intestazione2 = "bonus";
    let cellaSx = "";
    let cellaDx = "";
    let contenutoSx = "";
    let contenutDx = "";

    tr.className = 'tr';
    th1.className = 'th';

    head1 = document.createTextNode(intestazione1);
    head2 = document.createTextNode(intestazione2);
    th1.appendChild(head1);
    tr.appendChild(th1);
    th2.appendChild(head2);
    tr.appendChild(th2);
    tabellaValori.appendChild(tr);

    for (var i = 0; i < sestina.length; i++) {
        cellaSx = sestina[i];
        cellaDx = bonus[i];

        riga = document.createElement('tr');
        td1 = document.createElement('td');
        td2 = document.createElement('td');
        riga.className = 'tr';
        td1.className = 'th';
        td2.className = 'th';

        contenutoSx = document.createTextNode(cellaSx);
        contenutDx = document.createTextNode(cellaDx);
        td1.appendChild(contenutoSx);
        riga.appendChild(td1);
        td2.appendChild(contenutDx);
        riga.appendChild(td2);
        tabellaValori.appendChild(riga);
    }
}


// - - - PULSANTI - - - 

function assegnazione() {
    h2.setAttribute('class', 'container1On ');
    for (var i = 0; i < sestina.length; i++) {
        const riga = document.createElement('tr');
        riga.setAttribute('id', 'riga'+i);
        const colonnaCaratteristiche= document.createElement('td');
        colonnaCaratteristiche.setAttribute('class', 'colonnaCaratteristiche')
        let cellaCaratteristiche = caratteristiche[i];
        let caratteristica = document.createTextNode(cellaCaratteristiche);
        colonnaCaratteristiche.appendChild(caratteristica);
        riga.appendChild(colonnaCaratteristiche);
        riga.className='rigaAssegnazione';
            for(var j = 0; j < caratteristiche.length; j++){
                let pulsante = document.createElement('input');
                pulsante.setAttribute('type', 'submit');
                pulsante.setAttribute('value', sestina[j]);
                pulsante.setAttribute('id', j);
                pulsante.setAttribute('class', 'pulsanteSestina');
                pulsante.setAttribute('onclick', "definisci(" + i + "," + sestina[j] +","  + j + ")");
                riga.appendChild(pulsante);   
            }
        tabellaAssegnazioni.appendChild(riga);
        } 
    tabellaAssegnazioni.className='tabella2On';   
    riesegui_conferma.className = 'containerOff';
}


function resetta() {
    tabellaValori.innerHTML = "";
    start();
}



// - - - ONCLICK DEFINISCI - - - 

function definisci(caratteristica, valore, indicePulsante){
    contatoreFinale++;
    ripristina.setAttribute('class', 'ripristina');
    stampaTabellaDefinizione(caratteristica, valore, indicePulsante);
    eliminaColonna(caratteristica, indicePulsante);
    if (contatoreFinale==6)
    scaricaSchedina.setAttribute('class', 'ripristina');
    
}

function stampaTabellaDefinizione(caratteristica, valore, indicePulsante){
    for(var i=0; i<6; i++){
        const riga = document.createElement('tr');
        const td1 = document.createElement('td');
           if (caratteristica===i) {
            let cellaDefinita = caratteristiche[i] + " = " + valore + " "+ bonus[indicePulsante];
            let stringaDefinita = document.createTextNode(cellaDefinita);
            td1.appendChild(stringaDefinita);
            riga.appendChild(td1);
            tabellaDefinizione.appendChild(riga);
            tabellaDefinizione.className='tabella1On';    
        }
    }
}

function eliminaColonna(caratteristica, indicePulsante) {
    document.getElementById("riga"+caratteristica).setAttribute('class', 'pulsanteOff');
    for(var j=0; j<tabellaAssegnazioni.children.length; j++){
        for(var k=0; k<tabellaAssegnazioni.children[j].children.length; k++){
                tabellaAssegnazioni.children[j].children[indicePulsante+1].setAttribute('class', 'pulsanteOff'); 
            }
    }    
}

function ripristinaAssegnazione () {
    tabellaDefinizione.innerHTML="";
    tabellaAssegnazioni.innerHTML="";
    scaricaSchedina.setAttribute('class', 'containerOff');
    contatoreFinale = 0;
    assegnazione();
}

function scarica (stringa) {
alert("Funzione ancora da implementare");

   // var doc = new jsPdf();
   
        // for(var j=0; j<tabellaDefinizione.children.length; j++){
        //     for(var k=0; k<tabellaDefinizione.children[j].children.length; k++){
        //         console.log( tabellaDefinizione.children[j].children[k]); 
        //         }
        // }
    



    // doc.text(20, 30, 'Utente: ' + nome);
	// doc.text(20, 40, 'Telefono: ' + tel);
	// doc.text(20, 50, 'Email: ' + email);
	// doc.text(20, 60, 'Sesso: ' + sesso);
	// doc.addPage();
    // var host = "http://"+window.location.hostname;
    // doc.save('schedina.pdf');

}


// - - - LOGICHE PER LA SCHEDINA - - - 


// Generazione numero casuale
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Tiro del dado
function dado() {
    let appoggio = 0;
    let risultato = 0;
    for (var i = 0; i < 3; i++) {
        appoggio = getRandomIntInclusive(3, 18);
        if (appoggio > risultato) { risultato = appoggio }
    }
    return risultato;
}

// Calcolo del Bonus
function calcolaBonus(valore) {

    if (valore == 3 || valore == 4) {
        return "-3";
    }
    if (valore == 5 || valore == 6) {
        return "-2";
    }
    if (valore == 7 || valore == 8) {
        return "-1";
    }
    if (valore == 9 || valore == 10 || valore == 11 || valore == 12) {
        return "+0";
    }
    if (valore == 13 || valore == 14 || valore == 15) {
        return "+1";
    }
    if (valore == 16 || valore == 17) {
        return "+2";
    }
    if (valore == 18) {
        return "+3";
    }
}
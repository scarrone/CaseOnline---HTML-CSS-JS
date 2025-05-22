let caseDisponibili = []; // Qui salviamo i dati
const container = document.getElementById("cardContainer");
const isHomePage = location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname === '/index.html';
const navToggler = document.getElementById('navToggler');
const navLinks = document.querySelector('.nav-links');

document.addEventListener('DOMContentLoaded', caricaCase);
navToggler.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });



//prendiamo i dati dal JSON e creiamo dinamicamente le card
async function caricaCase(){
fetch('../data/immobili.json') // percorso del file JSON
  .then(response => {
    if (!response.ok) {
      throw new Error('Errore nel caricamento del file JSON');
    }
    return response.json();
  })
  .then(data => {
    caseDisponibili = data; // Salviamo i dati delle case nell'array
    if(isHomePage){
    loadCards()
    }
  })
  .catch(error => {
    console. error('Errore:', error);S
  });
}

    // Funzione per creare un oggetto Casa da un indice specifico dell'array
    function creaOggettoCasa(indice) {
      // Verifico che l'indice sia valido
      if (indice < 0 || indice >= caseDisponibili.length) {
        throw new Error("Indice non valido");
      }

      const dati = datiImmobili[indice];

      // Creo prima l'oggetto Indirizzo
      const indirizzo = new Indirizzo(
        dati.indirizzo.via,
        dati.indirizzo.citta,
        dati.indirizzo.cap
      );

      // Creo l'oggetto Casa con l'oggetto Indirizzo
      const casa = new Casa(
        dati.id,
        dati.titolo,
        dati.descrizione,
        dati.prezzo,
        dati.superficie_mq,
        dati.locali,
        dati.bagni,
        indirizzo,
        dati.piano,
        dati.ascensore,
        dati.anno_costruzione,
        dati.stato,
        dati.tipologia,
        dati.immagine,
        dati.garage
      );

      return casa;
    }

    //Funzione per assegnare i valori della casa all'HTML
      function visualizzaDatiCasa(casa) {
            document.getElementById('titolo').textContent = casa.titolo;
            document.getElementById('prezzo').textContent = '€ ' + casa.prezzo.toLocaleString('it-IT');
            document.getElementById('superficie').textContent = casa.superficie_mq;
            document.getElementById('locali').textContent = casa.locali;
            document.getElementById('bagni').textContent = casa.bagni;
            document.getElementById('piano').textContent = casa.piano === 0 ? 'Piano terra' : `${casa.piano}º piano`;
            document.getElementById('ascensore').textContent = casa.ascensore ? 'Sì' : 'No';
            document.getElementById('tipologia').textContent = casa.tipologia;
            document.getElementById('anno').textContent = casa.anno_costruzione;
            document.getElementById('stato').textContent = casa.stato;
            document.getElementById('garage').textContent = casa.garage ? 'Sì' : 'No';
            document.getElementById('indirizzo').textContent = `${casa.indirizzo.via}, ${casa.indirizzo.citta} (${casa.indirizzo.cap})`;
            document.getElementById('descrizione').textContent = casa.descrizione;
            
            if (casa.immagine) {
                document.getElementById('immagine').src = casa.immagine;
                document.getElementById('immagine').alt = casa.titolo;
            }
        }


function loadCards(){
    caseDisponibili.forEach((casa, index) => {
    const link = document.createElement("a");
    link.className = "card-link";
    link.href = `/pages/dettaglio.html?id=${index}`;
    
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${casa.immagine}" alt="${casa.titolo}">
      <div class="card-content">
        <div class="card-title">${casa.titolo}</div>
        <div class="card-description">${casa.descrizione}</div>
      </div>
    `;
    link.appendChild(card);
    container.appendChild(link);
  });
}



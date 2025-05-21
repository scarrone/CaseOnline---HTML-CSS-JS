let caseDisponibili = []; // Qui salviamo i dati
const container = document.getElementById("cardContainer");

//prendiamo i dati dal JSON e creiamo dinamicamente le card
fetch('../data/immobili.json') // percorso del file JSON
  .then(response => {
    if (!response.ok) {
      throw new Error('Errore nel caricamento del file JSON');
    }
    return response.json();
  })
  .then(data => {
    caseDisponibili = data; // Salviamo i dati delle case nell'array

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
  })
  .catch(error => {
    console.error('Errore:', error);
  });

  // const hamburger = document.getElementById('hamburger');
  // const navLinks = document.getElementById('navLinks');

  // hamburger.addEventListener('click', () => {
  //   navLinks.classList.toggle('active');
  // });



  //pagina di dettaglio

let caseDisponibili = []; // Qui salviamo i dati
const container = document.getElementById("cardContainer");


fetch('../data/immobili.json') // percorso del file JSON
  .then(response => {
    if (!response.ok) {
      throw new Error('Errore nel caricamento del file JSON');
    }
    return response.json();
  })
  .then(data => {
    caseDisponibili = data; // Salviamo i dati nell'array
    // Qui puoi poi generare le card o fare quello che vuoi

    caseDisponibili.forEach(casa => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${casa.immagine}" alt="${casa.titolo}">
      <div class="card-content">
        <div class="card-title">${casa.titolo}</div>
        <div class="card-description">${casa.descrizione}</div>
      </div>
    `;
    container.appendChild(card);
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
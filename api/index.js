document.addEventListener('DOMContentLoaded', () => {

    function getCharacters(done) {
        fetch('https://rickandmortyapi.com/api/character')
            .then(response => response.json())
            .then(data => {
                done(data)
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    const main = document.querySelector('main');
    const modal = document.createElement('div');
    modal.id = 'character-modal';
    document.body.appendChild(modal);

    getCharacters(data => {
        data.results.forEach(personaje => {

            const article = document.createRange().createContextualFragment(`
            <article data-id="${personaje.id}">
                <div class="image-container">
                    <img src="${personaje.image}" alt="${personaje.name}">
                </div>
                <h2>${personaje.name}</h2>
            </article>
            `);

            main.append(article);
        });

        document.querySelectorAll('article').forEach(article => {
            article.addEventListener('click', () => {
                const personaje = data.results.find(p => p.id == article.dataset.id);

                modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <img src="${personaje.image}" alt="${personaje.name}">
                    <h2>${personaje.name}</h2>
                    <h3>Origin: ${personaje.origin.name}</h3>
                    <h4>Location: ${personaje.location.name}</h4>
                    <span>Status: ${personaje.status}</span>
                </div>
                `;

                modal.style.display = 'block';

                document.querySelector('.close').onclick = () => {
                    modal.style.display = 'none';
                }

                window.onclick = (event) => {
                    if (event.target == modal) {
                        modal.style.display = 'none';
                    }
                }
            });
        });
    });
});

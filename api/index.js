function getCharacters (done){

    const results = fetch("https://rickandmortyapi.com/api/character");

    results
        .then (response => response.json())
        .then (data => {
            done (data)
        });


}

getCharacters (data => {

    data.results.forEach(personaje => {

        const article = document.createRange().createContextualFragment( `   
        <article>

            <div class="image-container">
                <img src="${personaje.image}" alt="personaje">
            </div>
            <h2>${personaje.name}</h2>
            <h3>${personaje.origin.name}</h3>
            <h4>${personaje.location.name}</h4>
            <span>${personaje.status}</span>
    

        </article>
            
        `);

        const main = document.querySelector("main");

        main.append(article);
    })
});
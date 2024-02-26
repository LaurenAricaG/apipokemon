const pokemonLista = document.querySelector('#pokemonLista')
let URL = "https://pokeapi.co/api/v2/pokemon/"

document.addEventListener("keyup", e => {
    if(e.target.matches("#buscar")){
        document.querySelectorAll(".pokemon").forEach(nombre => {
            nombre.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ?nombre.classList.remove("filtro")
                :nombre.classList.add("filtro")
        })
    }
});

function fetchPokemon(valor) {
    fetch(URL + valor)
        .then((res) => res.json())
        .then((data) => createPokemon(data))
}
  
function fetchPokemons(limite) {
    for (let i = 1; i <= limite; i++) {
        fetchPokemon(i);
    }
}       

function createPokemon(data) {

    let tipos = data.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let color = data.types.map((type) => (type.type.name))
    
    const contenedor = document.createElement('div');
    contenedor.classList.add("pokemon", color[0]+"-bg");
    contenedor.innerHTML = 
    `
        <div class="pokemon__datos">
            <p class="pokemon_id">#${data.id}</p>
            <h2 class="pokemon_nombre">${data.name}</h2>
            <div class="pokemon_tipo">
                ${tipos}
            </div>
        </div>
        <div class="pokemon_img">
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
        </div>
    `;

    pokemonLista.appendChild(contenedor)
}

fetchPokemons(150)
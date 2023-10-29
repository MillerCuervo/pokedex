import {
  buscarPokemon,
  buscarPokemonPorNombre,
} from "./controllers/controllers.js";

let root = document.getElementById("root");
let botonDeBusqueda = document.getElementById("buscar-pokemon");
let barraDeBusqueda = document.getElementById("barra-pokemon");
let previousBtn = document.getElementById("previous");
let nextBtn = document.getElementById("next");
let previousUrl = ""; 
let nextUrl = ""; 


root.innerHTML = `CARGANDO`;

async function mostrarPokemones(url) {
  
  root.innerHTML = `CARGANDO`;
  
  let objetoPokemon = await buscarPokemon(url);

  previousUrl = objetoPokemon.previous;
  nextUrl = objetoPokemon.next;

  let html = "";
  objetoPokemon.arrayDePokemones.forEach((pokemon) => {
    let cardPokemon = `<div class='card'>
                            <span>${pokemon.nombre}</span>
                            <span>${pokemon.id}</span>
                            <span>${pokemon.tipos[0].type.name}</span>
                            <img class='card-image' src='${pokemon.imagen}'/>
                        </div>`;

    html += cardPokemon;
  });
  root.innerHTML = html;
}


botonDeBusqueda.addEventListener("click", async function (event) {
  event.preventDefault();
  let pokemonBuscado = await buscarPokemonPorNombre(barraDeBusqueda.value);
  let cardPokemon = `<div class='card'>
                          <span>${pokemonBuscado.nombre}</span>
                          <span>${pokemonBuscado.id}</span>
                          <span>${pokemonBuscado.tipos[0].type.name}</span>
                          <img class='card-image' src='${pokemonBuscado.imagen}'/>
                    </div>`;

  root.innerHTML = cardPokemon;
});


previousBtn.addEventListener("click", async () => {
  mostrarPokemones(previousUrl);
});
nextBtn.addEventListener("click", async () => {
  mostrarPokemones(nextUrl);
});

mostrarPokemones();

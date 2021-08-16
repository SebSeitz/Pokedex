let pokenames = ['charmander', 'squirtle', 'pikachu', 'venusaur', 'mewtwo'];
let currentPokemon; //dadurch kann man in allen Funktionen auf diese Variable zu greifen
let currentSpecies;
async function loadPokemon() {

    for (let i = 0; i < pokenames.length; i++) {
        const pokename = pokenames[i]
        let url = `https://pokeapi.co/api/v2/pokemon/${pokename}`;

        let response = await fetch(url);
        currentPokemon = await response.json();
        console.log('loaded Pokemon', currentPokemon);
        await loadSpecies(currentPokemon);
        renderPokemonInfo(currentPokemon, currentSpecies, i);

    }
}

async function loadSpecies(currentPokemon) {
    let url = currentPokemon['species']['url'];
    let response = await fetch(url);
    currentSpecies = await response.json(); //currentSpecies ist global als leere Variable definiert
    console.log('loaded Species', currentSpecies);

}

//function renderSpecies(species) {
//let color = species['color'].name;
// createCard(color);



function renderPokemonInfo(pokemon, species, i) {
    let name = pokemon['name'];
    let image = pokemon['sprites']['other']['dream_world'].front_default;
    let weight = pokemon['weight'];
    let height = pokemon['height'];
    let ability1 = pokemon['abilities']['0']['ability']['name'];
    let ability2 = pokemon['abilities']['1']['ability']['name'];
    let type = pokemon['types']['0']['type'].name;
    let hp = pokemon['stats']['0']['base_stat'];
    let attack = pokemon['stats']['1']['base_stat'];
    let defense = pokemon['stats']['2']['base_stat'];
    let specialAttack = pokemon['stats']['3']['base_stat'];
    let specialDefense = pokemon['stats']['4']['base_stat'];
    let speed = pokemon['stats']['5']['base_stat'];
    let eggGroup = species['egg_groups']['0'].name;
    let genus = species['genera']['7']['genus'];
    let captureRate = species['capture_rate'];
    let image2 = pokemon['sprites'].front_default;
    let image3 = pokemon['sprites'].back_default;

    createCard(name, image, weight, height, ability1, ability2, hp, attack, defense, specialAttack, specialDefense, speed, type, i, eggGroup, genus, captureRate, image2, image3);
}

function createCard(name, image, weight, height, ability1, ability2, hp, attack, defense, specialAttack, specialDefense, speed, type, i, eggGroup, genus, captureRate, image2, image3) {


    document.getElementById(`wholeCard`).innerHTML += `

           <div class="pokedex d-none" id="pokedex${i}">
           <h1>${name}</h1>
           <span class="badge badge-secondary" id="badge${i}">${type}</span>
            </div>

            <div class="info-container d-none" id="info-container${i}">
            <img src="${image}" id="pokemonImage">
            <div class="top-bar" id="top-bar">
                 <a href="#pokedex${i}" onclick="showAbout(${i})">About</a>
                 <a href="#pokedex${i}" onclick="showBaseStats(${i})">Base Stats</a>
                 <a href="#">Evolution</a>
                 <a href="#">Moves</a>
            </div>

                <div class="info" id="about${i}">
                <div class="top-info">
                <div class="sub-info">
                <span class="left">Weight</span>    <span class="right">${weight} lbs</span>
                </div>
                <div class="sub-info">
                <span class="left">Height</span>    <span class="right">${height}0 cm</span>
                </div>
                <div class="sub-info">
                <span class="left">Ability</span>    <span class="right">${ability1}, ${ability2}</span>
                </div> 
                <div class="sub-info">
                <span class="left">Capture Rate</span>    <span class="right">${captureRate}</span>
                </div> 
                </div>
                 <div class="breeding-info" id="breeding-info">
                 <div class="h2">Breeding</div>
                 <div class="sub-info">
                 <span class="left">Egg Group</span>    <span class="right">${eggGroup}</span>
                 </div> 
                 <div class="sub-info">
                 <span class="left">Genus</span>    <span class="right">${genus}</span>
                 </div> 
                 </div>
                 </div>

            <div class="info d-none" id="base-stats${i}">
            <div class="sub-info">
            <span class="left">HP</span>        <span class="right">${hp}</span> 
            <div class="progress">
            <div class="progress-bar1" role="progressbar" style="width: ${hp}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            </div>
            <div class="sub-info">
            <span class="left">Attack</span>    <span class="right">${attack}</span>
            <div class="progress">
            <div class="progress-bar2" role="progressbar" style="width: ${attack}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            </div>
            <div class="sub-info">
            <span class="left">Defense</span>    <span class="right">${defense}</span>
            <div class="progress">
            <div class="progress-bar3" role="progressbar" style="width: ${defense}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            </div>
            <div class="sub-info">
            <span class="left">Sp.Attack</span>    <span class="right">${specialAttack}</span>
            <div class="progress">
            <div class="progress-bar4" role="progressbar" style="width: ${specialAttack}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            </div>
          
            <div class="sub-info">
            <span class="left">Sp.Defense</span>    <span class="right">${specialDefense}</span>
            <div class="progress">
            <div class="progress-bar5" role="progressbar" style="width: ${specialDefense}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            </div>
            <div class="sub-info">
            <span class="left">Speed</span>    <span class="right">${speed}</span>
            <div class="progress">
            <div class="progress-bar6" role="progressbar" style="width: ${speed}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            </div>
            </div>
            `
    document.getElementById('pokedex-overview').innerHTML += `
            <div class="deck" id="deck${i}" onclick="showCurrentCard(${i});checkCard(${i})">
            <div class="small-card">
            <div class="h3">${name}</div>
            <span class="badge badge-primary" id="badge2${i}">${type}</span>
            <div class="small-card-images">
            <img src="${image2}">
           
            </div>
            </div>
            </div>

            `
    if (type == 'water') {
        document.getElementById(`badge${i}`).classList.add('blueish');
        document.getElementById(`badge2${i}`).classList.add('blueish');
        document.getElementById(`pokedex${i}`).classList.add('blueish2');
        document.getElementById(`deck${i}`).classList.add('blueish2');
    }
    if (type == 'electric') {
        document.getElementById(`badge${i}`).classList.add('dark-yellow');
        document.getElementById(`badge2${i}`).classList.add('dark-yellow');
        document.getElementById(`pokedex${i}`).classList.add('dark-yellow2');
        document.getElementById(`deck${i}`).classList.add('dark-yellow2');
    }

    if (type == 'fire') {
        document.getElementById(`badge${i}`).classList.add('reddish');
        document.getElementById(`badge2${i}`).classList.add('reddish');
        document.getElementById(`pokedex${i}`).classList.add('reddish2');
        document.getElementById(`deck${i}`).classList.add('reddish2');
    }
    if (type == 'grass') {
        document.getElementById(`badge${i}`).classList.add('greenish');
        document.getElementById(`badge2${i}`).classList.add('greenish');
        document.getElementById(`pokedex${i}`).classList.add('greenish2');
        document.getElementById(`deck${i}`).classList.add('greenish2');
    }
    if (type == 'psychic') {
        document.getElementById(`badge${i}`).classList.add('silverish');
        document.getElementById(`badge2${i}`).classList.add('silverish');
        document.getElementById(`pokedex${i}`).classList.add('silverish2');
        document.getElementById(`deck${i}`).classList.add('silverish2');
    }
}


function showCurrentCard(i) {
    document.getElementById('wholeCard').classList.remove('d-none');
    document.getElementById(`pokedex${i}`).classList.remove('d-none');
    document.getElementById(`info-container${i}`).classList.remove('d-none');
}

function checkCard(i) {
    if (document.getElementById(`pokedex${i}`).style != "d-none") {
        document.getElementById(`pokedex${i}`).style = "d-none";
        document.getElementById(`info-container${i}`).style = "d-none";

    }
}

function showBaseStats(i) {
    document.getElementById(`base-stats${i}`).classList.remove('d-none');
    document.getElementById(`about${i}`).classList.add('d-none');
}

function showAbout(i) {
    document.getElementById(`about${i}`).classList.remove('d-none');
    document.getElementById(`base-stats${i}`).classList.add('d-none');

}


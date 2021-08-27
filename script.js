let pokenames = ['charmander', 'charmeleon', 'charizard', 'squirtle', 'wartortle', 'blastoise', 'pichu', 'pikachu', 'raichu', 'bulbasaur', 'ivysaur', 'venusaur', 'mewtwo', 'abra', 'kadabra', 'alakazam'];
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
    let move1 = pokemon['moves']['0']['move'].name;
    let move2 = pokemon['moves']['1']['move'].name;
    let move3 = pokemon['moves']['2']['move'].name;
    let move4 = pokemon['moves']['3']['move'].name;
    let move5 = pokemon['moves']['4']['move'].name;
    let move6 = pokemon['moves']['5']['move'].name;
    let move7 = pokemon['moves']['6']['move'].name;


    createCard(name, image, weight, height, ability1, ability2, hp, attack, defense, specialAttack, specialDefense, speed, type, i, eggGroup, genus, captureRate, image2, move1, move2, move3, move4, move5, move6, move7);
}

function createCard(name, image, weight, height, ability1, ability2, hp, attack, defense, specialAttack, specialDefense, speed, type, i, eggGroup, genus, captureRate, image2, move1, move2, move3, move4, move5, move6, move7) {


    document.getElementById('pokedex-overview').innerHTML += `
    <div class="deck" id="deck${i}" onclick="showCurrentCard(${i}, '${name}', '${type}', '${image}', ${weight}, ${height}, '${ability1}', '${ability2}', ${hp}, ${attack}, ${defense}, ${specialAttack}, ${specialDefense}, ${speed}, '${type}', '${eggGroup}', '${genus}', ${captureRate}, '${move1}', '${move2}', '${move3}', '${move4}', '${move5}', '${move6}', '${move7}')">
    <div class="small-card">
    <div class="h3">${name}</div>
    <span class="badge badge-primary" id="badge2${i}">${type}</span>
    <div class="small-card-images">
    <img src="${image2}">
   
    </div>
    </div>
    </div>
    `
    document.getElementById('table-small').innerHTML += `
      <tr>
        <th scope="row">${i + 1}</th>
        <td id="table-down${i}" onclick="showCurrentCard(${i}, '${name}', '${type}', '${image}', ${weight}, ${height}, '${ability1}', '${ability2}', ${hp}, ${attack}, ${defense}, ${specialAttack}, ${specialDefense}, ${speed}, '${type}', '${eggGroup}', '${genus}', ${captureRate}, '${move1}', '${move2}', '${move3}', '${move4}', '${move5}', '${move6}', '${move7}')">${name}</td>
        <td>${type}</td>
      </tr>
    `
    checkDeckColor(i, type);
}

function getBadgeColor(type){
    if(type == 'water'){
        return 'blueish';
    } else if (type =='electric'){
        return 'dark-yellow';
    } else if (type == 'fire'){
        return 'reddish';
    } else if (type == 'grass'){
        return 'greenish';
    } else if (type =='psychic'){
        return 'silverish';
    }
}
function getDeckColor(type){
    if (type=='water'){
        return 'blueish2';
    } else if (type =='electric'){
        return 'dark-yellow2';
    } else if (type =='fire'){
        return 'reddish2';
    } else if (type == 'grass'){
        return 'greenish2';
    } else if(type =='psychic'){
        return 'silverish2';
    }
}

function getTableColor(type){
    if (type == 'water'){
        return "rgb(148, 148, 223)";
    } else if (type == 'electric'){
        return "#e9de8f";
    } else if (type == 'fire'){
        return "#FB6C6C";
    } else if (type == 'grass'){
        return "rgb(100, 187, 100)";
    } else if (type == 'psychic'){
        return "rgb(236, 221, 221)";
    }
}

function checkDeckColor(i, type) {
    let badgeColor = getBadgeColor(type);
    let deckColor = getDeckColor(type);
    let tableColor = getTableColor(type);
    document.getElementById(`badge2${i}`).classList.add(badgeColor);
    document.getElementById(`deck${i}`).classList.add(deckColor);
    document.getElementById(`table-down${i}`).style.backgroundColor = tableColor;
   
}


/** This function generates the zoomed-in card on click
 * 
 * @param {number} i - index of the Pokemon
 * @param {string} name - name of the Pokemon  
 * @param {string} type - type of the Pokemon
 * @param {url} image - front image of the Pokemon
 * @param {number} weight - weight of the Pokemon 
 * @param {number} height - height of the Pokemon
 * @param {string} ability1 - 1st ability of the Pokemon
 * @param {string} ability2 - 2nd ability of the Pokemon
 * @param {number} hp - hit points of the Pokemon 
 * @param {number} attack - attack value of the Pokemon 
 * @param {number} defense - defense valut of the Pokemon
 * @param {number} specialAttack - value of special attack
 * @param {number} specialDefense - value of special defense
 * @param {number} speed - speed of the Pokemon
 * @param {string} type - elemental type of the Pokemon
 * @param {string} eggGroup - egg group of the Pokemon
 * @param {string} genus - genus of the Pokemon
 * @param {number} captureRate frequency of the Pokemon
 * @param {string} move1 
 * @param {string} move2 
 * @param {string} move3 
 * @param {string} move4 
 * @param {string} move5 
 * @param {string} move6 
 * @param {string} move7 
 */
function showCurrentCard(i, name, type, image, weight, height, ability1, ability2, hp, attack, defense, specialAttack, specialDefense, speed, type, eggGroup, genus, captureRate, move1, move2, move3, move4, move5, move6, move7) {
    document.getElementById(`wholeCard`).innerHTML = '';
    document.getElementById(`wholeCard`).innerHTML += `
       <div class="pokedex" id="pokedex${i}">
       <h1>${name}</h1>
       <span class="badge badge-secondary" id="badge${i}">${type}</span>
        </div>
        <div class="info-container" id="info-container${i}">
        <img src="${image}" id="pokemonImage">
        <div class="top-bar" id="top-bar">
             <a href="#" onclick="showAbout(${i})">About</a>
             <a href="#" onclick="showBaseStats(${i})">Base Stats</a>
             <a href="#" onclick="showMoves(${i})">Moves</a>
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
        

        <div class="info d-none" id="moves${i}">
            <div class="top-info">
            <div class="sub-info">
            <span class="left">Move 1</span>    <span class="right">${move1}</span>
            </div>
            <div class="sub-info">
            <span class="left">Move 2</span>    <span class="right">${move2}</span>
            </div>
            <div class="sub-info">
            <span class="left">Move 3</span>    <span class="right">${move3}</span>
            </div> 
            <div class="sub-info">
            <span class="left">Move 4</span>    <span class="right">${move4}</span>
            </div> 
            <div class="sub-info">
            <span class="left">Move 5</span>    <span class="right">${move5}</span>
            </div> 
            <div class="sub-info">
            <span class="left">Move 6</span>    <span class="right">${move6}</span>
            </div> 
            <div class="sub-info">
            <span class="left">Move 7</span>    <span class="right">${move7}</span>
            </div> 
            </div>
        `
    checkCardColor(i, type);
}




function checkCardColor(i, type) {
    if (type == 'water') {
        document.getElementById(`badge${i}`).classList.add('blueish');
        document.getElementById(`pokedex${i}`).classList.add('blueish2');
    }
    if (type == 'electric') {
        document.getElementById(`badge${i}`).classList.add('dark-yellow');
        document.getElementById(`pokedex${i}`).classList.add('dark-yellow2');
    }
    if (type == 'fire') {
        document.getElementById(`badge${i}`).classList.add('reddish');
        document.getElementById(`pokedex${i}`).classList.add('reddish2');
    }
    if (type == 'grass') {
        document.getElementById(`badge${i}`).classList.add('greenish');
        document.getElementById(`pokedex${i}`).classList.add('greenish2');
    }
    if (type == 'psychic') {
        document.getElementById(`badge${i}`).classList.add('silverish');
        document.getElementById(`pokedex${i}`).classList.add('silverish2');
    }
}


function showBaseStats(i) {
    document.getElementById(`base-stats${i}`).classList.remove('d-none');
    document.getElementById(`about${i}`).classList.add('d-none');
    document.getElementById(`moves${i}`).classList.add('d-none');
}
function showAbout(i) {
    document.getElementById(`about${i}`).classList.remove('d-none');
    document.getElementById(`base-stats${i}`).classList.add('d-none');
    document.getElementById(`moves${i}`).classList.add('d-none');

}

function showMoves(i) {
    document.getElementById(`moves${i}`).classList.remove('d-none');
    document.getElementById(`about${i}`).classList.add('d-none');
    document.getElementById(`base-stats${i}`).classList.add('d-none');

}

function showTable() {
    let x = window.matchMedia("(max-width: 900px)")
    if (x.matches) {
        document.getElementById('table-whole').classList.remove('d-none');
        document.getElementById('pokedex-overview').classList.add('d-none');
        document.getElementById('wholeCard').classList.add('p-fixed');
    }
}
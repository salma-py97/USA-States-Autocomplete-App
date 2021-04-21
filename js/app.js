const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search states.json and filter it
const searchStates = async searchText => {
    const res = await fetch('../data/states.json');
    const states = await res.json();

    // console.log(states);

    // We need to filter through data and get a match to the input
    // Get matches to current text input
    let matches = states.filter(state => {
        // the data has to begin with searchText
        const regex = new RegExp(`^${searchText}`, 'gi');
        // return an array of the state name or state abbreviation that matches the beginning of searchText
        return state.name.match(regex) || state.abbr.match(regex);

    });
    if (searchText.length === 0){
        matches = [];
        matchList.innerHTML ='';
    }

    outputHtml(matches);
    // console.log(matches);
}
// Show Result
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
        <div class="card card-body mb-4">
            <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
            <small>Lat: ${match.lat}</small>
            <small>Long: ${match.long}</small>
        </div>
        `).join("");
        // console.log(html);
        matchList.innerHTML=html;
    } else if(matches.length === 0 && search.value != ""){
        const alert = `        
        <div class="card card-body bg-danger mb-4">
            <p class="card-text text-white">Please Enter a valid input</p>
        </div>`;
        matchList.innerHTML = alert;
    }
    
}
search.addEventListener('input', () => searchStates(search.value));


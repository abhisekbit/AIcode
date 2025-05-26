// Sample country data (you can replace this with an API call)
const countries = [
    { name: 'Afghanistan', capital: 'Kabul' },
    { name: 'Albania', capital: 'Tirana' },
    { name: 'Algeria', capital: 'Algiers' },
    { name: 'Andorra', capital: 'Andorra la Vella' },
    { name: 'Angola', capital: 'Luanda' },
    { name: 'Argentina', capital: 'Buenos Aires' },
    { name: 'Australia', capital: 'Canberra' },
    { name: 'Austria', capital: 'Vienna' },
    { name: 'Belgium', capital: 'Brussels' },
    { name: 'Brazil', capital: 'Brasília' },
    { name: 'Canada', capital: 'Ottawa' },
    { name: 'China', capital: 'Beijing' },
    { name: 'Denmark', capital: 'Copenhagen' },
    { name: 'Egypt', capital: 'Cairo' },
    { name: 'France', capital: 'Paris' },
    { name: 'Germany', capital: 'Berlin' },
    { name: 'India', capital: 'New Delhi' },
    { name: 'Italy', capital: 'Rome' },
    { name: 'Japan', capital: 'Tokyo' },
    { name: 'United Kingdom', capital: 'London' },
    { name: 'United States', capital: 'Washington, D.C.' }
];

const countryInput = document.getElementById('countryInput');
const suggestionsDiv = document.getElementById('suggestions');
const resultDiv = document.getElementById('result');

countryInput.addEventListener('input', handleInput);
countryInput.addEventListener('keydown', handleKeyDown);

function handleInput(e) {
    const value = e.target.value.toLowerCase();
    
    if (value.length === 0) {
        suggestionsDiv.style.display = 'none';
        return;
    }

    const matches = countries.filter(country => 
        country.name.toLowerCase().includes(value)
    );

    displaySuggestions(matches);
}

function displaySuggestions(matches) {
    suggestionsDiv.innerHTML = '';
    
    if (matches.length === 0) {
        suggestionsDiv.style.display = 'none';
        return;
    }

    matches.forEach(country => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = country.name;
        div.addEventListener('click', () => selectCountry(country));
        suggestionsDiv.appendChild(div);
    });

    suggestionsDiv.style.display = 'block';
}

function handleKeyDown(e) {
    if (e.key === 'Enter') {
        const value = countryInput.value.toLowerCase();
        const country = countries.find(c => 
            c.name.toLowerCase() === value
        );

        if (country) {
            selectCountry(country);
        }
    }
}

function selectCountry(country) {
    countryInput.value = country.name;
    suggestionsDiv.style.display = 'none';
    
    resultDiv.innerHTML = `
        <h3>${country.name}</h3>
        <p>Capital: ${country.capital}</p>
    `;
    resultDiv.classList.add('show');
}

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        suggestionsDiv.style.display = 'none';
    }
}); 
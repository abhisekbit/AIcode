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
let activeSuggestionIndex = -1; // Initialize active suggestion index

countryInput.addEventListener('input', handleInput);
countryInput.addEventListener('keydown', handleKeyDown);

function handleInput(e) {
    const value = e.target.value.toLowerCase();
    activeSuggestionIndex = -1; // Reset index on new input
    highlightSuggestion(-1); // Remove any existing highlights

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
    activeSuggestionIndex = -1; // Reset index when suggestions are redisplayed

    if (matches.length === 0) {
        suggestionsDiv.style.display = 'none';
        return;
    }

    matches.forEach((country, index) => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = country.name;
        div.setAttribute('data-index', index); // Set data-index for mouseover

        div.addEventListener('click', () => selectCountry(country));
        div.addEventListener('mouseover', () => {
            activeSuggestionIndex = index;
            highlightSuggestion(index);
        });
        suggestionsDiv.appendChild(div);
    });

    suggestionsDiv.style.display = 'block';
}

function highlightSuggestion(index) {
    const items = document.querySelectorAll('.suggestion-item');
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add('highlighted');
        } else {
            item.classList.remove('highlighted');
        }
    });
}

function handleKeyDown(e) {
    const items = suggestionsDiv.querySelectorAll('.suggestion-item');
    if (!items.length && e.key !== 'Enter') return; // No suggestions to navigate, unless it's Enter

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeSuggestionIndex++;
        if (activeSuggestionIndex >= items.length) {
            activeSuggestionIndex = 0;
        }
        highlightSuggestion(activeSuggestionIndex);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeSuggestionIndex--;
        if (activeSuggestionIndex < 0) {
            activeSuggestionIndex = items.length - 1;
        }
        highlightSuggestion(activeSuggestionIndex);
    } else if (e.key === 'Enter') {
        if (activeSuggestionIndex > -1 && items[activeSuggestionIndex]) {
            e.preventDefault(); // Prevent form submission if any
            const selectedCountryName = items[activeSuggestionIndex].textContent;
            const country = countries.find(c => c.name === selectedCountryName);
            if (country) {
                selectCountry(country);
            }
            activeSuggestionIndex = -1; // Reset after selection
        } else {
            // Default Enter behavior: if input matches a country name exactly
            const value = countryInput.value.toLowerCase();
            const country = countries.find(c =>
                c.name.toLowerCase() === value
            );
            if (country) {
                selectCountry(country);
            }
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
        activeSuggestionIndex = -1; // Reset index when clicking outside
        highlightSuggestion(-1); // Remove highlights
    }
});

// Theme toggle functionality
const themeToggleBtn = document.getElementById('themeToggleBtn');
const currentTheme = localStorage.getItem('theme');
const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Apply saved theme or system preference on load
if (currentTheme === 'dark' || (!currentTheme && userPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
} else {
    document.documentElement.setAttribute('data-theme', 'light'); // Default to light
}

function toggleTheme() {
    const currentThemeAttribute = document.documentElement.getAttribute('data-theme');
    if (currentThemeAttribute === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}
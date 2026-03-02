const countryInput = document.getElementById('country-input');
const btnSearch = document.getElementById('search-btn');
const spinner = document.getElementById('loading-spinner')

document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});
countryInput.addEventListener("keypress",(event) => {
    if(event.key == "Enter"){
        const country = document.getElementById('country-input').value;
        searchCountry(country)
    };

})

async function searchCountry(countryName) {
    try {
        
        spinner.style.display = "block";
        document.getElementById('error-message').innerText = "";

        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        const data = await response.json();
        const [country] = data;
        console.log(country);
        document.getElementById('country-info').innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital[0]}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;
        const borders = country.borders;

        if(!borders){
            return;
        }

        borders.forEach(async border => {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
            const data = await response.json();
            const [country] = data;
            console.log(country);

            const card = document.createElement('div');
            card.classList.add('border-grid');

            card.innerHTML = `
                <h2>${country.name.common}</h2>
                <img src="${country.flags.svg}" alt="${country.name.common} flag">
            `;

            // Add the new card to the container
            document.getElementById('bordering-countries').appendChild(card);

        });
        // Fetch country data
        // Update DOM
        // Fetch bordering countries
        // Update bordering countries section
    } catch (error) {
        // Show error message
        document.getElementById('error-message').innerText = "couldnt find country";

    } finally {
        spinner.style.display = "none";
    }
}
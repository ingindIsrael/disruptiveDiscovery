document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fetchDataBtn').addEventListener('click', function() {
        const startupInputElement = document.getElementById('startupname');
        if (startupInputElement) {
            console.log("startupInputElement.value:", startupInputElement.value);
            fetchData(startupInputElement.value); // Pass the input's value, not the element itself
        } else {
            console.log("Startup input element not found");
        }
    });
});

async function fetchData(startup) {
    const url = 'https://crunchbase-crunchbase-v1.p.rapidapi.com/autocompletes?query=';
    
    console.log("Inside fetchData");
    console.log(startup);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'API_KEY',
            'X-RapidAPI-Host': 'crunchbase-crunchbase-v1.p.rapidapi.com'
        }
    };
    
    try {
        console.log("Inside try");
        
        const fullUrl = url + encodeURIComponent(startup) + "&limit=5";
        console.log("URL with startup name:", fullUrl);
        const response = await fetch(fullUrl, options);
        const result = await response.json();
        console.log("result", result.entities[0].short_description);
        
        document.getElementById("datapoint").innerHTML = result.entities.map(item => `<li class="translucent"><strong>${item.identifier.value}:</strong> ${item.short_description}</li>`).join('');
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

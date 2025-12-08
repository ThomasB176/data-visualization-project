let csvData = null;
let chart = null;

fetch("data/climate.csv")
    .then(response => response.text())
    .then(csv => {
        csvData = csv;
        const lines = csv.split("\n");
        const headers = lines[0].split(",");
        
        // Extracts the names of each country in the csv file
        const countries = [];
        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].trim();
            if (row) {
                const countryName = row.split(",")[0];
                if (countryName && !countries.includes(countryName)) {
                    countries.push(countryName);
                }
            }
        }
        
        
        countries.sort();
        
        // fills the country selector with the variables extracted from the csv by the code above this
        const countrySelect = document.getElementById('countrySelect');
        countrySelect.innerHTML = '';
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.text = country;
            countrySelect.appendChild(option);
        });
        
        const usIndex = countries.indexOf("United States");
        if (usIndex !== -1) {
            countrySelect.selectedIndex = usIndex;
        }
        
        updateChart("United States");
        
        countrySelect.addEventListener('change', (e) => {
            updateChart(e.target.value);
        });
    });

function updateChart(selectedCountry) {
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    
    // grabs the corresponding country data from climate.csv
    let countryData = null;
    for (let i = 1; i < lines.length; i++) {
        const row = lines[i].trim();
        if (row) {
            const rowData = row.split(",");
            if (rowData[0] === selectedCountry) {
                countryData = rowData;
                break;
            }
        }
    }
    
    if (!countryData) return;
    
    const years = headers.slice(1);
    const values = countryData.slice(1).map(v => parseFloat(v) || null);
    
    if (chart) {
        chart.destroy();
    }
    
    const ctx = document.getElementById('myChart');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Temperature Anomaly (°C) (1961 - 2024) (baseline temperature is based off temperatures from 1951-1980)',
                data: values,
                backgroundColor: '#ff6384'
            }]
        },
        options: {
            animation: true,
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'easeInOutQuad',
                    from: 1,
                    to: 0,
                    loop: false
                }
            },
            scales: {
                x: {title: {display: true, text: 'Year'}},
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: (context) => { return 'Value: ' + context.parsed.y + ' °C'; }
                    }
                }
            }
        }
    });
}
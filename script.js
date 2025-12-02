// Loads the data
fetch("data/climate.csv")
    .then(response => response.text())
    .then(csv => {
        const lines = csv.split("\n");
        const headers = lines[0].split(",");
        
        // basically just finds the data for USA, 
        // later ill make it so you can search for a specific country
        //  and that country's data will be displayed
        let CountryData = null;
        for (let i = 1; i < lines.length; i++) {
            const row = lines[i];
            if (row.includes("United States")) {
                CountryData = row.split(",");
                break;
            }
        }
        
        // Extract years and values
        const years = headers.slice(1);
        const values = CountryData.slice(1).map(v => parseFloat(v) || null);
        
        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: 'Temperature Anomaly (°C)',
                    data: values,
                    backgroundColor: '#ff6384'
                }]
            },
            options: {
                animation: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
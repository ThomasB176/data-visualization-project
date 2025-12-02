fetch("data/MUSEUM.csv")
    .then(response => response.text())
    .then(csv => {
        const rows = csv.split("\n").slice(1);
        const labels = [];
        const values = [];

        rows.forEach(row => {
            const cols = row.split(",");
            labels.push(cols[0]);
            values.push(parseInt(cols[1]));
        });
        
const ctx = document.getElementById( 'myChart');

    new Chart(ctx, { 
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Example Data',
                data: values,
                borderWidth: 1,
                backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0cO', '#000000'],
            }]
        },
        options: {
            scales: {   
                y: {beginAtZero: true }
            }
        }
    });
});
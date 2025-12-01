fetch('data/MUSEUM.csv')
.then(response => response.text)
.then(data => {
    console.log(data);
});

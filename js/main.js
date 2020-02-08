// Traer la data
$.ajax({
    method: 'GET',
    url: 'https://cors-anywhere.herokuapp.com/https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json',
    dataType: 'JSON',
    crossDomain: true,
    success: (data) => {
        console.log(data);
        printCard(data);
    },
    error: (error) => {
        console.log(error);
    },
    complete: () => {
        console.log('acá termina el spinner');
    }
});

// hacer el conteo de estrellas pushear el número de estrellas chidas y el de estrellas chafas

const starRating = (stars) => {
    let totalRating = [];
    const starPlace = document.getElementById('star-place');
    for (let i = stars; i >= 1; i--) { console.log(i);
        totalRating.push('<i class="material-icons sm-icon"> star</i>');
    };
    if (5 - stars >= 0) {
        for (let i = (5 - stars); i >= 1; i--) {
            totalRating.push('<i class="material-icons sm-icon"> star_border</i>')
        };
    };
    console.log(starPlace.innerHTML = totalRating.join(''));
};

// Pintar la data en cards 
const printCard = (data) => {
    const cards = document.getElementById('cards');
    data.map((r) => {
        const cardTemplate = `
        <div class="col-sm-4">
<div class="card border-dark mb-3" style="max-width: 18rem;">
<ul class="list-inline">
    <li class="list-inline-item" id="star-place">
    <i class="material-icons sm-icon">
    star
    </i>
       
    </li>
</ul>
<div class="card-header">
    <ul class="list-inline" id="card-header">
        <li class="list-inline-item">
            <i class="material-icons">restaurant</i>
        </li>
        <li class="list-inline-item">
            <h4 id="restaurant-name">${r.name}</h4>
        </li>
    </ul>
</div>
<div class="card-body text-dark">
    <ul class="list-inline">
        <li class="list-inline-item">
            <i class="material-icons">
                location_city
            </i>
        </li>
        <li class="list-inline-item">
            <p class="card-title">Estado: <br> <span id="state">${r.address.state}</span></p>
        </li>
    </ul>
    <ul class="list-inline">
        <li class="list-inline-item">
            <i class="material-icons">
                house
            </i>
        </li>
        <li class="list-inline-item">
            <p class="card-title">Ciudad: <br> <span id="city">${r.address.city}</span></p>
        </li>
    </ul>
    <ul class="list-inline">
        <li class="list-inline-item">
            <i class="material-icons">
                web
            </i>
        </li>
        <li class="list-inline-item">
            <p class="card-title">Sitio web: <br> <span id="web-site"><a href="${r.contact.site}">${r.contact.site}</a></span></p>
        </li>
    </ul>
</div>
</div>
</div>
`
        cards.insertAdjacentHTML('afterbegin', cardTemplate);
        starRating(r.rating);
    });
};


// acomodar las tarjetas pa que se vean bonitas
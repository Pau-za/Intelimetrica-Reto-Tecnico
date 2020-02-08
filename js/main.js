// Traer la data
var restaurants = [];


const printCard = (data) => {
    data.map((r) => {
        const cardTemplate = `
        <div class="col-sm-4">
<div class="card border-dark mb-3" id="${r.id}" style="max-width: 18rem;">
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
`;
        cards.insertAdjacentHTML('afterbegin', cardTemplate);
        starRating(r.rating);
    });
};

$.ajax({
    method: 'GET',
    url: 'https://cors-anywhere.herokuapp.com/https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json',
    dataType: 'JSON',
    crossDomain: true,
    success: (data) => {
        console.log(data);
        printCard(data);
        return restaurants = data;
    },
    error: (error) => {
        console.log(error);
    },
    complete: () => {
        console.log('acá termina el spinner');
    }
});

// fetch('https://cors-anywhere.herokuapp.com/https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json')
// .then((response) => {
//     console.log(response.blob());
// }).catch((error) => {
//     console.log(error.message);
// })
// hacer el conteo de estrellas pushear el número de estrellas chidas y el de estrellas chafas

const starRating = (stars) => {
    let totalRating = [];
    const starPlace = document.getElementById('star-place');
    for (let i = stars; i >= 1; i--) {
        totalRating.push('<i class="material-icons sm-icon"> star</i>');
    };
    if (5 - stars >= 0) {
        for (let i = (5 - stars); i >= 1; i--) {
            totalRating.push('<i class="material-icons sm-icon"> star_border</i>')
        };
    };
    starPlace.innerHTML = totalRating.join('');
};
// Pintar la data en cards 
const cards = document.getElementById('cards');


const printSorted = (sortedArr, data) => {
    sortedArr.map((r) => {
        data.forEach(element => {
            if (element.name == r) {
                console.log(element);
                const cardTemplate = `
                <div class="col-sm-4">
        <div class="card border-dark mb-3" id="${element.id}" style="max-width: 18rem;">
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
                    <h4 id="restaurant-name">${element.name}</h4>
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
                    <p class="card-title">Estado: <br> <span id="state">${element.address.state}</span></p>
                </li>
            </ul>
            <ul class="list-inline">
                <li class="list-inline-item">
                    <i class="material-icons">
                        house
                    </i>
                </li>
                <li class="list-inline-item">
                    <p class="card-title">Ciudad: <br> <span id="city">${element.address.city}</span></p>
                </li>
            </ul>
            <ul class="list-inline">
                <li class="list-inline-item">
                    <i class="material-icons">
                        web
                    </i>
                </li>
                <li class="list-inline-item">
                    <p class="card-title">Sitio web: <br> <span id="web-site"><a href="${element.contact.site}">${element.contact.site}</a></span></p>
                </li>
            </ul>
        </div>
        </div>
        </div>`;
        cards.insertAdjacentHTML('afterbegin', cardTemplate);
        starRating(r.rating);
            }
        });
    })
}

// sort alphabetically
const alphabetically = (val) => {
    console.log(restaurants);
    var restNames = [];
    restaurants.map((e) => {
        restNames.push(e.name);
    })
    console.log(restaurants);
    console.log(restNames);
    cards.innerHTML = '';
    if (val == 2) {
        restNames.sort();
        printSorted(restNames, restaurants);
    } else {
        restNames.sort();
        restNames.reverse();
        printSorted(restNames, restaurants);
    }
    console.log(restNames);
};

const sortSelect = document.getElementById('inlineFormCustomSelectPref');

sortSelect.addEventListener('change', () => {
    const valueSelected = sortSelect.options[sortSelect.selectedIndex].value;
    if (valueSelected == 1 || valueSelected == 2) {
        alphabetically(valueSelected);
    } else {
        ranking(valueSelected);
    }
});
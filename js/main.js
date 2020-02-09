// Traer la data
var restaurants = [];

var allCards = '';

const printCard = (data) => {
    data.map((r) => {
        const cardTemplate = `
        <div class="col-lg-4 col-md-6 col-sm-12">
<div class="card border-dark mb-3" style="max-width: 18rem;">
<ul class="list-inline">
    <li class="list-inline-item" id="star-place">
    <i class="material-icons sm-icon">
    star
    </i></li>
    <li class="list-inline-item"><a href="#more-info" id="${r.id}" class="information btn btn-primary">Más información</a></li>
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
        // allCards = document.getElementsByClassName('information');
        // addButtonEv(allCards);
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


const starRating = (stars) => {
    let totalRating = [];
    const starPlace = document.getElementById('star-place');
    for (let i = stars; i >= 1; i--) {
        totalRating.push('<i class="material-icons sm-icon"> star</i>');
    };
    if (4 - stars >= 0) {
        for (let i = (4 - stars); i >= 1; i--) {
            totalRating.push('<i class="material-icons sm-icon"> star_border</i>')
        };
    };
    starPlace.innerHTML = totalRating.join('');
};


const cards = document.getElementById('cards');

const printSorted = (sortedArr, type, sort) => {
    cards.innerHTML = '';
    if (type == 'alphabet') {
        sortedArr.map((r) => {
            const cardTemplate = `
                    <div class="col-sm-4">
            <div class="card border-dark mb-3" id="${r.id}" style="max-width: 18rem;">
            <ul class="list-inline">
                <li class="list-inline-item" id="star-place">
                <i class="material-icons sm-icon">
                star
                </i>
                </li>
                <li class="list-inline-item"><a href="#more-info" id="${r.id}" class="information btn btn-primary">Más información</a></li>
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
            </div>`;
            if (sort == 'descendent') {
                cards.insertAdjacentHTML('beforeend', cardTemplate);
            } else {
                cards.insertAdjacentHTML('afterbegin', cardTemplate);
            }
            starRating(r.rating);
        })
    } else if (type == 'rating') {
        console.log('ordenando por rating');
        sortedArr.map((r) => {
                const cardTemplate = `
             <div class="col-sm-4">
                <div class="card border-dark mb-3" style="max-width: 18rem;">
                <ul class="list-inline">
                <li class="list-inline-item" id="star-place">
                    <i class="material-icons sm-icon">star</i> 
                </li>
                <li class="list-inline-item"><a href="#more-info" id="${r.id}" class="information btn btn-primary">Más información</a></li>
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
                        <i class="material-icons">location_city</i>
                    </li>
                    <li class="list-inline-item">
                        <p class="card-title">Estado: <br> <span id="state">${r.address.state}</span></p>
                    </li>
                </ul>
                <ul class="list-inline">
                    <li class="list-inline-item">
                        <i class="material-icons">house</i>
                    </li>
                    <li class="list-inline-item">
                        <p class="card-title">Ciudad: <br> <span id="city">${r.address.city}</span></p>
                    </li>
                </ul>
                <ul class="list-inline">
                    <li class="list-inline-item">
                        <i class="material-icons">web</i>
                    </li>
                    <li class="list-inline-item">
                        <p class="card-title">Sitio web: <br> <span id="web-site"><a href="${r.contact.site}">${r.contact.site}</a></span></p>
                    </li>
                </ul>
            </div>
        </div>
    </div>`;
                cards.insertAdjacentHTML('afterbegin', cardTemplate);
                starRating(r.rating);
            })
        }
}

// sort alphabetically
const alphabetically = (val) => {
    cards.innerHTML = '';
    restaurants.sort((a, b) => {
        if (a.name < b.name) {
            return -1
        } else if (a.name > b.name) {
            return 1
        } else {
            return 0
        }
    });
    console.log(restaurants);
    if (val == 2) {
        sorting = 'ascendent';
    } else {
        sorting = 'descendent';
    }
    printSorted(restaurants, 'alphabet', sorting);
};

const starsNumber = (val) => {
    cards.innerHTML = '';
    if (val == 3) {
        restaurants.sort((a, b) => {
            return (a.rating - b.rating)
        });
        console.log(restaurants);
        printSorted(restaurants, 'rating')
    } else {
        restaurants.sort((a, b) => {
            return (b.rating - a.rating)
        });
        console.log(restaurants);
        printSorted(restaurants, 'rating')
    };
}

const sortSelect = document.getElementById('inlineFormCustomSelectPref');

sortSelect.addEventListener('change', () => {
    const valueSelected = sortSelect.options[sortSelect.selectedIndex].value;
    if (valueSelected == 1 || valueSelected == 2) {
        alphabetically(valueSelected);
    } else {
        starsNumber(valueSelected);
    }
});

// maps
// Initialize and add the map
const initMap = (lat, long) => {
    // The location of Uluru
    const coords = {
        lat: lat,
        lng: long
    };
    // The map, centered at Uluru
    const map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 4,
            center: coords
        });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({
        position: coords,
        map: map
    });
}

// const addButtonEv = (buttons) => {
//     for (let i = 0; i < buttons.length; i++) {
//         buttons[i].addEventListener('click', () => {
//             console.log(buttons[i]);
//         })
//     };
// };

$(window).on('load', () => {
    const buttons = $('.information');
    console.log($('.information'))
    $(buttons).each((e) => {
        buttons[e].click(() => {
            console.log(buttons[e]);
        })
    })
})
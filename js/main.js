var restaurants = [];

var allCards = '';

const printCard = (data, val) => {
    if (!val) {
        n = 10;
    } else {
        n = val * 10;
    };
    cards.innerHTML = '';
    shortData = data.slice(0, n);
    shortData.map((r) => {
        console.log(shortData);
        const cardTemplate = `
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card border-dark mb-3" style="max-width: 18rem;">
                <ul class="list-inline">
                    <li class="list-inline-item" id="star-place">
                        <i class="material-icons sm-icon">star</i>
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
                <li class="list-inline-item d-flex justify-content-center">
                    <button id="${r.id}" type="button" class="info btn btn-info">Más información</button>
                </li>
            </ul>
        </div>
    </div>`;
        cards.insertAdjacentHTML('afterbegin', cardTemplate);
        starRating(r.rating);
    });
};

var infoBtn = [];

const initMap = (lat, long) => {
    const coords = {
        lat: lat,
        lng: long
    };
    const map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 15,
            center: coords
        });
    const marker = new google.maps.Marker({
        position: coords,
        map: map
    });
};


const getSelectedEl = (id, data) => {
    data.map((el) => {
        if (el.id == id) {
            street = el.address.street;
            city = el.address.city;
            state = el.address.state;
            const completeAddress = street + ', ' + city + ', ' + state;
            document.getElementById('rest-name').innerHTML = el.name;
            document.getElementById('phone').innerHTML = el.contact.phone;
            document.getElementById('email').innerHTML = el.contact.email;
            document.getElementById('site').innerHTML = el.contact.site;
            document.getElementById('address').innerHTML = completeAddress;
            initMap(el.address.location.lat, el.address.location.lng);
            starRating(el.rating, 'word');
        };
    });
};

const watchInfo = (btns) => {
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', () => {
            document.getElementById('general').classList.add('hidden');
            document.getElementById('more-info').classList.remove('hidden');
            const idRest = btns[i].id;
            getSelectedEl(idRest, restaurants);
        });
    };
};

$.ajax({
    method: 'GET',
    url: 'https://cors-anywhere.herokuapp.com/https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json',
    dataType: 'JSON',
    crossDomain: true,
    success: (data) => {
        printCard(data);
        return restaurants = data;
    },
    error: (error) => {
        alert(error);
    },
    complete: () => {
        infoBtn = $('.info');
        watchInfo(infoBtn);
    }
});


const starRating = (stars, word) => {
    var totalRating = [];
    const starPlace = document.getElementById('star-place');
    for (let i = stars; i >= 1; i--) {
        totalRating.push('<i class="material-icons sm-icon"> star</i>');
    };
    if (4 - stars >= 0) {
        for (let i = (4 - stars); i >= 1; i--) {
            totalRating.push('<i class="material-icons sm-icon"> star_border</i>')
        };
    };
    if (word) {
        uniqueRating = document.getElementById('unique-rating');
        uniqueRating.innerHTML = totalRating.join('');
    } else {
        starPlace.innerHTML = totalRating.join('');
    };
};


const cards = document.getElementById('cards');

const printSorted = (sortedArr, type, val, sort) => {
    cards.innerHTML = '';
    if (!val) {
        n = 10;
    } else {
        n = val * 10;
    };
    if (type == 'alphabet') {
        shortSortedData = sortedArr.slice(0, n);
        shortSortedData.map((r) => {
            console.log(shortSortedData);
            const cardTemplate = `
        <div class="col-sm-4">
            <div class="card border-dark mb-3" id="${r.id}" style="max-width: 18rem;">
                <ul class="list-inline">
                    <li class="list-inline-item" id="star-place">
                        <i class="material-icons sm-icon">star</i>
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
                    <li class="list-inline-item d-flex justify-content-center">
                        <button id="${r.id}" type="button" class="info btn btn-info">Más información</button>
                    </li>
                </ul>
            </div>
        </div>`;
            if (sort == 'descendent') {
                console.log('orden descendente');
                cards.insertAdjacentHTML('beforeend', cardTemplate);
            } else if (sort == 'ascendent') {
                console.log('orden ascendente');
                cards.insertAdjacentHTML('afterbegin', cardTemplate);
            }
            starRating(r.rating);
        })
    } else if (type == 'rating') {
        console.log('ordenando por rating');
        shortSortedData = sortedArr.slice(0, n);
        shortSortedData.map((r) => {
            const cardTemplate = `
             <div class="col-sm-4">
                <div class="card border-dark mb-3" style="max-width: 18rem;">
                <ul class="list-inline">
                    <li class="list-inline-item" id="star-place">
                        <i class="material-icons sm-icon">star</i> 
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
                    <li class="list-inline-item d-flex justify-content-center">
                        <button id="${r.id}" type="button" class="info btn btn-info">Más información</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>`;
            cards.insertAdjacentHTML('afterbegin', cardTemplate);
            starRating(r.rating);
        });
    };
};

// sort alphabetically
const alphabetically = (val, btn) => {
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
    printSorted(restaurants, 'alphabet', btn, sorting);
};

const starsNumber = (val, btn) => {
    cards.innerHTML = '';
    if (val == 3) {
        restaurants.sort((a, b) => {
            return (a.rating - b.rating)
        });
        printSorted(restaurants, 'rating', btn)
    } else {
        restaurants.sort((a, b) => {
            return (b.rating - a.rating)
        });
        printSorted(restaurants, 'rating', btn)
    };
};

const sortSelect = document.getElementById('inlineFormCustomSelectPref');

sortSelect.addEventListener('change', () => {
    const valueSelected = sortSelect.options[sortSelect.selectedIndex].value;
    if (valueSelected == 1 || valueSelected == 2) {
        alphabetically(valueSelected);
    } else {
        starsNumber(valueSelected);
    };
});

// click en botones de paginación
const buttons = document.getElementsByClassName('pgn');

for (let i = 0; i <= buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        const selected = document.getElementById('inlineFormCustomSelectPref').options.selectedIndex;
        val = buttons[i].innerHTML;
        if (selected == 0) {
            printCard(restaurants, val);
        } else if (selected == 1 || selected == 2) {
            alphabetically(selected, val);
        } else if (selected == 3 || selected == 4) {
            starsNumber(selected, val);
        };
    });
};
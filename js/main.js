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
})

// Pintar la data en cards 


const printCard = (data) => {
    data.map((r) => {
        const cardTemplate = `
<div class="card border-dark mb-3" style="max-width: 18rem;">
<ul class="list-inline">
    <li class="list-inline-item">
        <i class="material-icons sm-icon">
            star
        </i>
        <i class="material-icons sm-icon">
            star_border
        </i>
        <i class="material-icons sm-icon">
            star_border
        </i>
        <i class="material-icons sm-icon">
            star_border
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
            <h5 class="card-title">Estado: <span id="state">${r.address.state}</span></h5>
        </li>
    </ul>
    <ul class="list-inline">
        <li class="list-inline-item">
            <i class="material-icons">
                house
            </i>
        </li>
        <li class="list-inline-item">
            <h5 class="card-title">Ciudad: <span id="city">${r.address.city}</span></h5>
        </li>
    </ul>
    <ul class="list-inline">
        <li class="list-inline-item">
            <i class="material-icons">
                web
            </i>
        </li>
        <li class="list-inline-item">
            <h5 class="card-title">Sitio web: <span id="web-site">${r.contact.site}</span></h5>
        </li>
    </ul>
</div>
</div>
`
$('#cards').html(cardTemplate);
    })
    
}
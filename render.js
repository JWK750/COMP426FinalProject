
/**
Note: We used the code Josh built in assignment five and edited it to create a prototype for our project, which will likely
use a similar dynamic rendering technique as the user clicks through houses.
 */

import {handleLogout, postUser, postLike} from "../api/Restaurants.js";


const baseUrl = 'https://developers.zomato.com/api/v2.1/'

let searchPosition = 0;
let currResponse;

let searchCity = async function(city){
    city = encodeURIComponent(city.trim());
    let requestUrl = baseUrl + 'locations?query=' + city;
    const result = await axios({
        method: 'get',
        url: requestUrl,
        headers: {
            "Accept": "application/json",
            "user-key": "e1ff70aa222cdce72627c3ac30d6d6e2",
        }
    });

    let response = JSON.parse(result.request.response);
    return response.location_suggestions[0].city_id;
}

let searchRestaurants = async function(cityId) {
    searchPosition = 0;
    let requestUrl = baseUrl + 'search?entity_id=' +cityId + '&entity_type=city';
    const result = await axios({
        method: 'get',
        url: requestUrl,
        headers: {
            "Accept": "application/json",
            "user-key": "e1ff70aa222cdce72627c3ac30d6d6e2",
        }
    })

    let response = JSON.parse(result.request.response);
    return response;
}


 export const renderRestaurantCard = function(restaurant) {
    let restaurantCard = $("<div></div>").attr("class", "box card RestaurantCard")

    restaurantCard.append($('<div class="card-header" id=name></div>').append(`<h2 class="card-header-title is-centered">${restaurant.name}</h2>`));

    let image = ($("<img>").attr("src", `${restaurant.featured_image}`));
    let figure = $("<figure></figure>").attr("class","image is-4by3");
    figure.append(image);
    restaurantCard.append($("<div class=card-image></div>").append(figure));
    
    restaurantCard.append($(`<div class="card-content">
        <div class="columns">
            <div class="column">
                <div class="box">${restaurant.location.locality}</div>
            </div>
            <div class="column">
                <div class="box">Cost for Two: ${restaurant.average_cost_for_two}</div>
            </div>  
        </div>
    </div>`));
    
    let footer = $('<footer></footer>').attr("class","card-footer")
    if (localStorage.getItem('token')){
        footer.append($(`<a>Dislike</a>`).attr("class", "card-footer-item Dislike"));
        footer.append($(`<a>Like</a>`).attr("class", "card-footer-item Like"));
    } else {
        footer.append($(`<p class="card-footer-item">Login to start liking restaurants!</p>`));
    }

    restaurantCard.append(footer);
    

    $('#display').empty();
    $('#display').append(restaurantCard);
};

let displayRestaurant = function(response, searchPosition){
    renderRestaurantCard(response.restaurants[searchPosition].restaurant);
}

// Button handlers

let handleSearch = async function(){
    let city = $('#city').val();
    let cityId = await searchCity(city);

    currResponse = await searchRestaurants(cityId);
    displayRestaurant(currResponse, searchPosition);
    window.scrollTo(0,document.body.scrollHeight);
};

let handleDislike = function(){
    searchPosition += 1;
    displayRestaurant(currResponse, searchPosition);
}

let handleLike = async function(){
    postUser(currResponse.restaurants[searchPosition].restaurant);
    postLike(currResponse.restaurants[searchPosition].restaurant);
    searchPosition += 1;
    displayRestaurant(currResponse, searchPosition);
}
    
//searchRestaurants(35.921250,-79.054420);



$(function() {
    $(document).on('click','#searchButton', handleSearch);
    $(document).on('click','.Dislike', handleDislike);
    $(document).on('click','.Like', handleLike);
    $(document).on('click','.Logout', handleLogout);
});

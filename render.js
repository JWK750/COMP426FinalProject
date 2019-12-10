
/**
Note: We used the code Josh built in assignment five and edited it to create a prototype for our project, which will likely
use a similar dynamic rendering technique as the user clicks through houses.
 */

import {handleLogout, postUser, postLike} from "../api/Restaurants.js";


const baseUrl = 'https://developers.zomato.com/api/v2.1/'

let searchPosition = 0;
let currResponse;

let searchRestaurants = async function(latitude, longitude) {
    searchPosition = 0;
    let requestUrl = baseUrl + 'search?lat=' + latitude + '&lon=' + longitude;
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
    
    restaurantCard.append($(`<p>${restaurant.location.locality_verbose}</p>`));
    
    if (localStorage.getItem('token')){
        restaurantCard.append($(`<button>Dislike</button>`).attr("class", "button is-danger Dislike"));
        restaurantCard.append($(`<button>Like</button>`).attr("class", "button is-success Like"));
    } else {
        restaurantCard.append($(`<p>Login to start liking restaurants!</p>`));
    }
    

    $('#display').empty();
    $('#display').append(restaurantCard);
};

let displayRestaurant = function(response, searchPosition){
    renderRestaurantCard(response.restaurants[searchPosition].restaurant);
}

// Button handlers

let handleSearch = async function(){
    let lat = $('#lat').val();
    let long = $('#long').val();
    currResponse = await searchRestaurants(lat,long);
    displayRestaurant(currResponse, searchPosition);
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

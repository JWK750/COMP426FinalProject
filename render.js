
/**
Note: We used the code Josh built in assignment five and edited it to create a prototype for our project, which will likely
use a similar dynamic rendering technique as the user clicks through houses.
 */

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
    let restaurantCard = $("<div></div>").attr("class", "RestaurantCard")
    let topPanel = $("<div></div>").attr("class","topPanel");
    let bottomPanel = $("<div></div>");
    restaurantCard.append(topPanel);
    restaurantCard.append(bottomPanel);

    topPanel.append($("<div id='name'></div>").text(`${restaurant.name}`));
    topPanel.attr("style", `background-color: yellow; height: 450px;`);
    topPanel.append($("<img>").attr("src", `${restaurant.photos[0].photo.url}`));
    
    bottomPanel.attr("style", `background-color: pink;`);
    bottomPanel.append($(`<p>${restaurant.location.locality_verbose}</p>`));
    bottomPanel.append($(`<button>Dislike</button>`).attr("class", "button is-danger Dislike"));
    bottomPanel.append($(`<button>Like</button>`).attr("class", "button is-success Like"));

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

let handleLike = function(){
    searchPosition += 1;
    displayRestaurant(currResponse, searchPosition);
}


export const loadHouseesIntoDOM = function(housees) {
    


    //searchRestaurants(35.921250,-79.054420);
    

};


$(function() {
    $(document).on('click','#searchButton', handleSearch);
    $(document).on('click','.Dislike', handleDislike);
    $(document).on('click','.Like', handleLike);
});

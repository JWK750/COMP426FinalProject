
/**
Note: We used the code Josh built in assignment five and edited it to create a prototype for our project, which will likely
use a similar dynamic rendering technique as the user clicks through houses.
 */

const baseUrl = 'https://developers.zomato.com/api/v2.1/'

let searchRestaurants = async function(latitude, longitude) {
    let requestUrl = baseUrl + 'search?lat=' + latitude + '&lon=' + longitude;
    const result = await axios({
        method: 'get',
        url: requestUrl,
        headers: {
            "Accept": "application/json",
            "user-key": "e1ff70aa222cdce72627c3ac30d6d6e2",
        }
    })
    const response = JSON.parse(result.request.response);
    response.restaurants.forEach(function(r){
        renderRestaurantCard(r.restaurant);
    })
}


 export const renderRestaurantCard = function(restaurant) {
    let restaurantCard = $("<div></div>").attr("class", "RestaurantCard")
    let topPanel = $("<div></div>");
    let bottomPanel = $("<div></div>");
    restaurantCard.append(topPanel);
    restaurantCard.append(bottomPanel);

    topPanel.append($("<span id='name'></span>").text(`${restaurant.name}`));
    topPanel.attr("style", `background-color: yellow;`);
    topPanel.append($('<div></div>').append($("<img>").attr("src", `${restaurant.photos[0].photo.url}`)));
    
    bottomPanel.append($(`<p>${restaurant.location.locality_verbose}</p>`));
    bottomPanel.append($(`<button>Dislike</button>`).attr("class", "Edit"));
    bottomPanel.append($(`<button>Like</button>`).attr("class", "Edit"));

    $('#display').append(restaurantCard);
};


export const loadHouseesIntoDOM = function(housees) {
    


    //searchRestaurants(35.921250,-79.054420);
    

};


$(function() {
    loadHouseesIntoDOM(houseicData);
});

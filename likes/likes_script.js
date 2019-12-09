import {handleLogout, getUser} from "../api/Restaurants.js";

let renderTableRow = function(restaurant) {
    let row = $("<tr></tr>");
    row.append(`<td>${restaurant.name}</td>`);
    row.append(`<td>${restaurant.location.city}</td>`);
    row.append(`<td>${restaurant.cuisines}</td>`);
    row.append(`<td>${restaurant.average_cost_for_two}</td>`);
    row.append(`<td>${restaurant.phone_numbers}</td>`);
    row.append(`<td>${restaurant.url}</td>`);
    $(".likes").append(row);
}


$(async function() {
    $(document).on('click','.Logout', handleLogout);
    $(".likes").empty();
    $('#loggedOut').empty();

    if(!localStorage.getItem('token')){
        $('#loggedOut').append('<h3 class=title>Login to see restaurants you have liked!</h3>');
    }
    else {
        let response = await getUser();
        for (let id in response){
            renderTableRow(response[id].restaurant);
        }
    }
});
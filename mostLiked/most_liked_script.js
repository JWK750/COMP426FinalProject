import {handleLogout, getTopLiked} from "../api/Restaurants.js";

let renderTableRow = function(restaurant, count, likes) {
    let row = $("<tr></tr>");
    row.append(`<td>${count}</td>`);
    row.append(`<td>${likes}</td>`);
    row.append(`<td>${restaurant.name}</td>`);
    row.append(`<td>${restaurant.location.city}</td>`);
    row.append(`<td>${restaurant.cuisines}</td>`);
    row.append(`<td>${restaurant.average_cost_for_two}</td>`);
    row.append(`<td>${restaurant.phone_numbers}</td>`);
    $(".likes").append(row);
}


$(async function() {
    $(document).on('click','.Logout', handleLogout);
    $(".likes").empty();

    let response = await getTopLiked();
    let responseArray = [];
    for (let id in response){
        responseArray.push(response[id]);
    }
    responseArray.sort(function(a,b){
        if (a.likes.length > b.likes.length){
            return -1;
        } else {
            return 1;
        }
    })
    console.log(responseArray);
    for (let count = 0; count < Math.min(responseArray.length,10); count++){
        renderTableRow(responseArray[count].restaurant, count+1, responseArray[count].likes.length);
    }
});
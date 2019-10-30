/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */

 let parseDate = function(date) {
     if (typeof(date) == 'string') {return date;}

     let year = date.getFullYear().toString();
     let month =(date.getMonth()+1).toString();
     if (month.length == 1) {month = '0'+month;}
     let day = date.getDate().toString();
     if (day.length == 1) {day = '0'+day;}
     return year+'-'+month+'-'+day;
 }



/**
 * Given a house object (see data.js), this function generates a "card" showing
 *     the house's name, information, and colors.
 * @param house  A house object (see data.js)
 */
export const renderHouseCard = function(house) {
    // TODO: Copy your code from a04 to render the house card
    let houseCard = $("<div></div>").attr("class", "HouseCard").attr("id", `HouseCard ${house.id}`);
    let topPanel = $("<div></div>");
    let bottomPanel = $("<div></div>");
    houseCard.append(topPanel);
    houseCard.append(bottomPanel);

    topPanel.append($("<span id='name'></span>").attr("style", `color: ${house.color};`).text(`${house.name}`));
    topPanel.attr("style", `background-color: ${house.backgroundColor};`);
    topPanel.append($('<div></div>').append($("<img>").attr("src", `${house.img}`)));
    

    let date = house.firstSeen;
    console.log(date);
    bottomPanel.append($(`<div><b>Date Built: </b>${parseDate(date)}</div>`));
    bottomPanel.append($(`<p>${house.description}</p>`));
    bottomPanel.append($(`<button>Dislike</button>`).attr("id", `Edit ${house.id}`).attr("class", "Edit"));
    bottomPanel.append($(`<button>Like</button>`).attr("id", `Edit ${house.id}`).attr("class", "Edit"));

    return houseCard;
};



/**
 * Given a house object, this function generates a <form> which allows the
 *     user to edit the fields of the house. The form inputs should be
 *     pre-populated with the initial values of the house.
 * @param house  The house object to edit (see data.js)
 */
export const renderHouseEditForm = function(house) {
    // TODO: Copy your code from a04 to render the house edit form
    let houseEditForm = $("<div></div>").attr('class', 'EditForm').attr('id', `EditForm ${house.id}`);
    let topPanel = $("<div></div>");
    let bottomPanel = $("<form></form>");
    houseEditForm.append(topPanel);
    houseEditForm.append(bottomPanel);

    topPanel.attr("style", `background-color: ${house.backgroundColor};`);
    topPanel.append($('<div></div>').append($("<img>").attr("src", `${house.img}`)));

    bottomPanel.append($('<div>House Name:</div>'));
    bottomPanel.append($('<input>').attr('value',`${house.name}`).attr('id', `nameInput ${house.id}`));
    bottomPanel.append($('<div>Date Built:</div>'));
    bottomPanel.append($('<input>').attr('value',`${parseDate(house.firstSeen)}`).attr('type', 'date').attr('id', `firstSeenInput ${house.id}`));
    bottomPanel.append($('<div>Description:</div>'));
    bottomPanel.append($('<textarea></textarea>').text(`${house.description}`).attr('id', `descriptionInput ${house.id}`));

    bottomPanel.append($('<button>Swipe Left</button>').attr('type', 'button').attr('class', 'Cancel').attr('id', `Cancel ${house.id}`));
    bottomPanel.append($('<button>Swipe Right</button>').attr('type', 'submit').attr('class', 'Save').attr('id', `Save ${house.id}`));

    return houseEditForm;
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular house.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the house edit form for the clicked house and replace the
    //       house's card in the DOM with their edit form instead
    let houseId = $(event.target).attr("id").substr(5);
    let houseCards = document.querySelectorAll('.HouseCard');
    for(let i = 0; i<houseCards.length; i++){
        let currentCard = $(houseCards[i])
        if (currentCard.attr("id").substr(9) == houseId){
            let house = houseicData.find(a => a.id == parseInt(houseId));
            renderHouseEditForm(house).insertBefore(currentCard);
            currentCard.remove();
        }
    }
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular house.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the house card for the clicked house and replace the
    //       house's edit form in the DOM with their card instead
    let houseId = $(event.target).attr("id").substr(7);
    let editForms = document.querySelectorAll('.EditForm');
    for(let i = 0; i<editForms.length; i++){
        let currentForm = $(editForms[i])
        if (currentForm.attr("id").substr(9) == houseId){
            let house = houseicData.find(a => a.id == parseInt(houseId));
            renderHouseCard(house).insertBefore(currentForm);
            currentForm.remove();
        }
    }
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular house.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the house card using the updated field values from the
    //       submitted form and replace the house's edit form in the DOM with
    //       their updated card instead
    let houseId = $(event.target).attr("id").substr(5);
    let editForms = document.querySelectorAll('.EditForm');
    for(let i = 0; i<editForms.length; i++){
        let currentForm = $(editForms[i])
        if (currentForm.attr("id").substr(9) == houseId){
            let house = houseicData.find(a => a.id == parseInt(houseId));
            house.name = document.getElementById('nameInput '+houseId).value;
            house.first = document.getElementById('firstNameInput '+houseId).value;
            house.last = document.getElementById('lastNameInput '+houseId).value;
            let newDate = document.getElementById('firstSeenInput '+houseId).value;
            let year = parseInt(newDate.substr(0,4));
            let month = parseInt(newDate.substr(5,2))-1;
            let day = parseInt(newDate.substr(8,2));
            house.firstSeen = new Date(year,month, day);
            house.description = document.getElementById('descriptionInput '+houseId).value;
            renderHouseCard(house).insertBefore(currentForm);
            currentForm.remove();
        }
    }
    
};



/**
 * Given an array of house objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  housees  An array of house objects to load (see data.js)
 */
export const loadHouseesIntoDOM = function(housees) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the housees using renderHouseCard()
    //       NOTE: Copy your code from a04 for this part

    // TODO: Append the house cards to the $root element
    //       NOTE: Copy your code from a04 for this part

    $root.append(renderHouseCard(houseicData[0]));
    


    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button
    $(document).on('click', '.Edit', handleEditButtonPress);

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
    $(document).on('click', ".Save", handleEditFormSubmit);
    
    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    $(document).on('click', ".Cancel", handleCancelButtonPress);
};



/**
 * Use jQuery to execute the loadHouseesIntoDOM function after the page loads
 */
$(function() {
    loadHouseesIntoDOM(houseicData);
});

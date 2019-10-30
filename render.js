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
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Copy your code from a04 to render the hero card
    let heroCard = $("<div></div>").attr("class", "HeroCard").attr("id", `HeroCard ${hero.id}`);
    let topPanel = $("<div></div>");
    let bottomPanel = $("<div></div>");
    heroCard.append(topPanel);
    heroCard.append(bottomPanel);

    topPanel.attr("style", `background-color: ${hero.backgroundColor};`);
    topPanel.append($('<div></div>').append($("<img>").attr("src", `${hero.img}`)));
    topPanel.append($("<span></span>").attr("style", `color: ${hero.color};`).text(`${hero.name}`));

    bottomPanel.append($(`<div><b>Alter Ego: </b>${hero.first} ${hero.last}</div>`));
    let date = hero.firstSeen;
    console.log(date);
    bottomPanel.append($(`<div><b>First Appearance: </b>${parseDate(date)}</div>`));
    bottomPanel.append($(`<p>${hero.description}</p>`));
    bottomPanel.append($(`<button>Edit</button>`).attr("id", `Edit ${hero.id}`).attr("class", "Edit"));

    return heroCard;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Copy your code from a04 to render the hero edit form
    let heroEditForm = $("<div></div>").attr('class', 'EditForm').attr('id', `EditForm ${hero.id}`);
    let topPanel = $("<div></div>");
    let bottomPanel = $("<form></form>");
    heroEditForm.append(topPanel);
    heroEditForm.append(bottomPanel);

    topPanel.attr("style", `background-color: ${hero.backgroundColor};`);
    topPanel.append($('<div></div>').append($("<img>").attr("src", `${hero.img}`)));

    bottomPanel.append($('<div>Hero Name:</div>'));
    bottomPanel.append($('<input>').attr('value',`${hero.name}`).attr('id', `nameInput ${hero.id}`));
    bottomPanel.append($('<div>First Name:</div>'));
    bottomPanel.append($('<input>').attr('value',`${hero.first}`).attr('id', `firstNameInput ${hero.id}`));
    bottomPanel.append($('<div>Last Name:</div>'));
    bottomPanel.append($('<input>').attr('value',`${hero.last}`).attr('id', `lastNameInput ${hero.id}`));
    bottomPanel.append($('<div>First Seen:</div>'));
    bottomPanel.append($('<input>').attr('value',`${parseDate(hero.firstSeen)}`).attr('type', 'date').attr('id', `firstSeenInput ${hero.id}`));
    bottomPanel.append($('<div>Description:</div>'));
    bottomPanel.append($('<textarea></textarea>').text(`${hero.description}`).attr('id', `descriptionInput ${hero.id}`));

    bottomPanel.append($('<button>Cancel</button>').attr('type', 'button').attr('class', 'Cancel').attr('id', `Cancel ${hero.id}`));
    bottomPanel.append($('<button>Save</button>').attr('type', 'submit').attr('class', 'Save').attr('id', `Save ${hero.id}`));

    return heroEditForm;
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    let heroId = $(event.target).attr("id").substr(5);
    let heroCards = document.querySelectorAll('.HeroCard');
    for(let i = 0; i<heroCards.length; i++){
        let currentCard = $(heroCards[i])
        if (currentCard.attr("id").substr(9) == heroId){
            let hero = heroicData.find(a => a.id == parseInt(heroId));
            renderHeroEditForm(hero).insertBefore(currentCard);
            currentCard.remove();
        }
    }
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    let heroId = $(event.target).attr("id").substr(7);
    let editForms = document.querySelectorAll('.EditForm');
    for(let i = 0; i<editForms.length; i++){
        let currentForm = $(editForms[i])
        if (currentForm.attr("id").substr(9) == heroId){
            let hero = heroicData.find(a => a.id == parseInt(heroId));
            renderHeroCard(hero).insertBefore(currentForm);
            currentForm.remove();
        }
    }
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    let heroId = $(event.target).attr("id").substr(5);
    let editForms = document.querySelectorAll('.EditForm');
    for(let i = 0; i<editForms.length; i++){
        let currentForm = $(editForms[i])
        if (currentForm.attr("id").substr(9) == heroId){
            let hero = heroicData.find(a => a.id == parseInt(heroId));
            hero.name = document.getElementById('nameInput '+heroId).value;
            hero.first = document.getElementById('firstNameInput '+heroId).value;
            hero.last = document.getElementById('lastNameInput '+heroId).value;
            let newDate = document.getElementById('firstSeenInput '+heroId).value;
            let year = parseInt(newDate.substr(0,4));
            let month = parseInt(newDate.substr(5,2))-1;
            let day = parseInt(newDate.substr(8,2));
            hero.firstSeen = new Date(year,month, day);
            hero.description = document.getElementById('descriptionInput '+heroId).value;
            renderHeroCard(hero).insertBefore(currentForm);
            currentForm.remove();
        }
    }
    
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part

    heroes.forEach(function (hero) {
        $root.append(renderHeroCard(hero));
    })


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
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});

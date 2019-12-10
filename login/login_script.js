import {handleLogout} from "../api/Restaurants.js";


$(document).ready(() => {
    $(document).on('click','#login-button', handleLogin);
    $(document).on('click','#create-account', handleCreateAccount);
    $(document).on('click','.Logout', handleLogout);
});

const accountRoot = new axios.create({
    baseURL: "http://localhost:3000/account"
  });

async function handleLogin(e) {
    let email = $("#email").val();
    let password = $("#password").val();
    try {
        const result = await accountRoot.post('/login', {
            "name": email,
            "pass": password
        });
        let token = result.data.jwt;
        localStorage.setItem('token', token);
        localStorage.setItem('name', email);
        window.open("http://localhost:3001/","_self");
    } catch (error){
        alert(error.response.data.msg);
    }
}

async function handleCreateAccount(e) {
    let email = $("#email").val();
    let password = $("#password").val();
    try {
        const result = await accountRoot.post('/create', {
            "name": email,
            "pass": password
        });
        $('#create-account-message').removeClass("is-hidden");
    } catch (error){
        alert(error.response.data.msg);
    }
}
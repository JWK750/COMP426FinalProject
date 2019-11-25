$(document).ready(() => {
    $(document).on('click','#login-button', handleLogin);
    $(document).on('click','#create-account', handleCreateAccount);
});

const accountRoot = new axios.create({
    baseURL: "http://localhost:3000/account"
  });

async function handleLogin(e) {
    let email = $("#email").val();
    let password = $("#password").val();
    const result = await accountRoot.post('/login', {
        "name": email,
        "pass": password
    });
    console.log(result);
}

async function handleCreateAccount(e) {
    let email = $("#email").val();
    let password = $("#password").val();
    const result = await accountRoot.post('/create', {
        "name": email,
        "pass": password
    });
    console.log(result);
}
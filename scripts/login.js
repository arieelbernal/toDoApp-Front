window.addEventListener('load', function(){
    /* -------------------------------------------------------------------------- */
    /*                              logica del login                              */
    /* -------------------------------------------------------------------------- */

    const form =  this.document.forms[0];
    const inputEmail =  this.document.querySelector('#inputEmail');
    const inputPassword = this.document.querySelector('#inputPassword');
    const apiUrl = "https://ctd-todo-api.herokuapp.com/v1";
    let settings={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    const payload= new Object();
    
    form.addEventListener('submit', function(event){
        event.preventDefault();
        payload.email= inputEmail.value;
        payload.password= inputPassword.value;
        login(apiUrl,payload,settings);
        form.reset();
    });





});

function normalizacion(texto){
    return texto.trim().toLowerCase();
}

function login(url,usuario,settings){
    settings.body=JSON.stringify(usuario);
    fetch(`${url}/users/login`, settings)
        .then(respuesta =>respuesta.json())
        .then(token =>{
            if(token){
                localStorage.setItem("token", token.jwt);
                location.href= "/mis-tareas.html";
            }
    });
}
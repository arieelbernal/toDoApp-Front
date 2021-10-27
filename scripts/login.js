window.addEventListener('load', function(){
    /* -------------------------------------------------------------------------- */
    /*                              logica del login                              */
    /* -------------------------------------------------------------------------- */

    const formulario =  this.document.forms[0];
    const inputEmail =  this.document.querySelector('#inputEmail');
    const inputPassword = this.document.querySelector('#inputPassword');
    const apiUrl = "https://ctd-todo-api.herokuapp.com/v1";
    let settings={};
    const usuario= new Object();
    
    formulario.addEventListener('submit', function(event){
        event.preventDefault();
        usuario.email= inputEmail.value;
        usuario.password= inputPassword.value;
        console.log(usuario);
        settings={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(usuario)
        }

        fetch(`${apiUrl}/users/login`, settings)
        .then(respuesta =>respuesta.json())
        .then(token =>{
            if(token){
                localStorage.setItem("token", token.jwt);
                location.href= "/mis-tareas.html";
            }
        });
 
    });





});

function normalizacion(texto){
    return texto.trim().toLowerCase();
}
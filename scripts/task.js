window.addEventListener("load", function(){
    const apiUrl="https://ctd-todo-api.herokuapp.com/v1";
    let settings= {
        method: "GET",
        headers: {
            authorization: localStorage.getItem("token"),
            'Content-type': 'application/json'
        }
    };
    const pUsername= document.querySelector(".user-info>p");
    fetch(`${apiUrl}/users/getMe`,settings)
    .then(respuesta => respuesta.json())
    .then(objetoUsuario=> pUsername.innerHTML= `${objetoUsuario.firstName} ${objetoUsuario.lastName}`);
    fetch(`${apiUrl}/tasks`,settings)
    .then(respuesta=> respuesta.json())
    .then(objeto => console.log(objeto));
})
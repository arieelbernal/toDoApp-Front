window.addEventListener("load", function(){
    const apiUrl="https://ctd-todo-api.herokuapp.com/v1";
    const form= document.querySelector('.nueva-tarea');
    const btnCerrarSesion=document.querySelector('#closeApp');
    const settings= {
        method: "GET",
        headers: {
            authorization: localStorage.getItem("token"),
            'Content-type': 'application/json'
        }
    };
    if(localStorage.getItem("token")!=null){
        renderNombre(apiUrl,settings);
        obtencionTareas(apiUrl,settings);
        form.addEventListener("submit", function(e){
        e.preventDefault();
        crearNuevaTask(apiUrl,settings);
        obtencionTareas(apiUrl,settings);
    })
    }
    
    btnCerrarSesion.addEventListener("click", function(e){
        localStorage.clear();
        location.href="/index.html";
    })
    
})

function renderNombre(url, settings){
    //obtengo los datos de usuario y renderizo el nombre
    fetch(`${url}/users/getMe`, settings)
    .then(response => response.json())
    .then(obj =>{
        document.querySelector(".user-info>p").innerText = `¡Hola, ${obj.firstName} ${obj.lastName}!`;
    });
};
function obtencionTareas(url,settings){
    settings.method = "GET";
    if(settings.method === "GET" && settings.body !== undefined){
        delete settings.body;
    }
    fetch(`${url}/tasks`,settings)
    .then(respuesta=> respuesta.json())
    .then(arrayTasks => {
        console.log(arrayTasks);
        renderTasks(arrayTasks);
    });
}
function crearNuevaTask(url, settings){
    //config del body para la API
    const payload={
        description: document.querySelector('#nuevaTarea').value,
        completed: false
    };
    settings.method = 'POST';
    settings.body=JSON.stringify(payload);
    
    fetch(`${url}/tasks`, settings)
    .then(response => response.json())
    .then(task =>{
        console.log(task);
    });
}



function renderTasks(array){
    let skeleton =document.querySelector("#skeleton");
    skeleton.innerHTML="";
    array.forEach(element => {
        skeleton.innerHTML+=`
        <li class="tarea">
        <div class="not-done"></div>
        <div class="descripcion">
            <p class="nombre">${element.description[0].toUpperCase()+element.description.slice(1)}</p>
            <p class="timestamp">Creada: ${element.createdAt.substr(0,element.createdAt.indexOf("T"))}</p>
        </div>
        </li>`
    });
}

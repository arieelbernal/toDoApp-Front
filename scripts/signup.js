window.addEventListener('load', function(){
    const form=document.forms[0];
    const inputNombre= document.querySelector('input#nombre');
    const inputApellido= document.querySelector('input#apellido');
    const inputMail= document.querySelector('input#mail');
    const inputPass= document.querySelector('input#pass');
    const inputVerificacion= document.querySelector('input#verificacion');
    const btnSubmit= document.querySelector('#btnSubmit');
    let usuario= new Object();
    let apiUrl= "https://ctd-todo-api.herokuapp.com/v1"
    inputNombre.addEventListener('change', ()=>{
        if(!validTexto(inputNombre.value)){
            inputNombre.classList.add('error');
        }
        else{
            inputNombre.classList.remove('error');
        }
    });
    inputApellido.addEventListener('change', ()=>{
        if(!validTexto(inputApellido.value)){
            inputApellido.classList.add('error');
        }
        else{
            inputApellido.classList.remove('error');
        }
    });
    inputMail.addEventListener('change', ()=>{
        if(!validEmail(inputMail.value)){
            inputMail.classList.add('error');
        }
        else{
            inputMail.classList.remove('error');
        }
    });
    inputPass.addEventListener('change', () =>{
        if(!validPass(inputPass.value)){
            inputPass.classList.add('error');
        }
        else{
            inputPass.classList.remove('error');
        }
    });
    inputVerificacion.addEventListener('keyup', ()=>{
        if(!validVerif(inputPass.value, inputVerificacion.value)){
            inputVerificacion.classList.add('error');
            btnSubmit.setAttribute('disabled','');
        }
        else{
            inputVerificacion.classList.remove('error');
            btnSubmit.removeAttribute('disabled');
        }
    });
    form.addEventListener('submit', (e) =>{
        e.preventDefault();
        usuario.firstName= normalizarConUpper(inputNombre.value);
        usuario.lastName= normalizarConUpper(inputApellido.value);
        usuario.email= normalizarMail(inputMail.value);
        usuario.password= inputPass.value;
        let settings= {
            "method": "POST",
            "headers": {
                "content-type": "application/json; charset=UTF-8",
            },
            "body": JSON.stringify(usuario)
        }
        registroApi(apiUrl,settings);
        form.reset();
    })
    
});

function registroApi(url,settings){
    fetch(`${url}/users`, settings)
        .then(respuesta =>respuesta.json())
        .then(token =>{
            if(token){
                location.href= "/index.html";
            }
        });
}

function validTexto(texto){
    let verificacion=true;
    let caracteresInvalidos=['!','"','#','$','%','&','\'','(',')','*','+',',','-','.','/','0','1','2','3','4','5','6','7','8','9',':',';','=','?','@','[','\\',']','^','_','\`','{','|','}','~'];
    if(texto.length<3 || texto.length>24){
        verificacion=false;
    }
    caracteresInvalidos.forEach(elemento => {
        if(texto.includes(elemento)){
            verificacion=false;
        }
    });
    return verificacion;
}

function validEmail(email){
    let verificacion=true;
    let caracteresInvalidos=['!','"','#','$','%','&','\'','(',')','*','+',',','/',':',';','=','?','[','\\',']','^','\`','{','|','}','~',' '];
    caracteresInvalidos.forEach(elemento => {
        if(email.includes(elemento)){
            verificacion= false;
        }
    });
    if(!email.includes('@') || !email.includes('.',email.indexOf('@'))){
        verificacion=false;
    }
    return verificacion;
}

function validPass(pass){
    let verificacion=true;
    let caracteresInvalidos=['!','"','#','$','%','&','\'','(',')','*','+',',','/',':',';','=','?','[','\\',']','^','\`','{','|','}','~',' ','@'];
    if(pass.length<5 || pass.length>20){
        verificacion=false;
    }
    caracteresInvalidos.forEach(elemento => {
        if(pass.includes(elemento)){
            verificacion=false;
        }
    });
    return verificacion;
}

function validVerif(pass,verif){
    let verificacion=true;
    if(verif!=pass){
        verificacion=false;
    }
    return verificacion;
}

function normalizarConUpper(texto){
    texto.toLowerCase();
    return texto[0].toUpperCase()+texto.slice(1);
}

function normalizarMail(email){
    email.toLowerCase();
    return email;
}



function ingresoLogin(){
    console.log("Usuario");
    var usuario = document.querySelector('#usuario').value;
    var contrasenia = document.querySelector('#contrasenia').value;
    console.log(document.querySelector('#usuario').value);
    console.log("Contraseña");
    console.log(document.querySelector('#contrasenia').value);
    if (usuario == "admin" & contrasenia == 1234) 
    {

       
        localStorage.setItem("usuario", usuario);
        localStorage.setItem("tipo", "Administrador");
        localStorage.setItem("nombre", "Carlos");
        localStorage.setItem("apellido", "Jimenez");
        location.href = "Administrador.html";


    }else{

        sessionStorage.setItem("buscar", usuario);
        var usuario = sessionStorage.buscar;
        fetch(`http://localhost:3000/Usuarios/${usuario}`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',}})
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
    
        .then(response =>{
            console.log(response);
            localStorage.setItem("usuario", usuario);
            localStorage.setItem("nombre", response.Nombre);
            localStorage.setItem("apellido", response.Apellido);
            if (response.UserName == usuario & response.Contrasenia == contrasenia ) {
                if (response.Tipo == 0) 
                {

                    console.log("paciente");
                    localStorage.setItem("tipo", "Paciente");

                    location.href = "Paciente.html";

                }else if (response.Tipo == 1) 
                {
                    console.log("Doctor");
                    localStorage.setItem("tipo", "Doctor");

                    location.href = "Doctor.html";
                    
                }else if (response.Tipo == 2)
                {
                    console.log("Enfermero");
                    localStorage.setItem("tipo", "Enfermero");
                    location.href = "Enfermera.html";
                }else if (response.Tipo == 3)
                {
                    console.log("Administrador");
                    localStorage.setItem("tipo", "Administrador");
                    location.href = "Administrador.html";
                    
                }else if (response.Tipo == 4)
                {
                    console.log("auxiliar");

                }

            }else
            {
                document.querySelector('#error-ingresar').innerHTML =  `<div class="alert alert-danger" role="alert">
                Error: Alguno de los datos es incorrecto
              </div>`;

            }
            // document.querySelector('#nombre').value = response.Nombre;
            // document.querySelector('#apellido').value = response.Apellido;
            // document.querySelector('#edad').value = response.Edad;
    
        })
        

    }
}
 function ObtenerDatos()
 {
     

    document.querySelector('#usuario-nombre').innerHTML = localStorage.getItem("usuario");
    document.querySelector('#nombre-inicio').innerHTML = localStorage.getItem("nombre") + " " + localStorage.getItem("apellido") +  `<small>` + localStorage.getItem("tipo") +`</small>`;

 }

function cerrarSesionAdmin()
{
    location.href = "index.html"
}

function cerrarSesion()
{
    location.href = "../index.html"
}


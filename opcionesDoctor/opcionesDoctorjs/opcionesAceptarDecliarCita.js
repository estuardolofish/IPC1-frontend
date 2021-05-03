// para llenar la tabla de datos y realizar acciones
function accionesDoctor() {
    var usuario = localStorage.getItem("usuario");
    localStorage.setItem("userAuxiliar", usuario);

   
    localStorage.setItem("userAuxiliar", usuario);
    fetch(`https://proyecto2-backend-ipc1.herokuapp.com/Usuarios/${usuario}`, {
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
      
        document.querySelector('#editarUserName').value = response.UserName;
        document.querySelector('#editarNombre').value = response.Nombre;
        document.querySelector('#editarApellido').value = response.Apellido;
        document.querySelector('#editarContrasenia').value = response.Contrasenia;
        document.querySelector('#editarFechaNacimiento').value = response.FechaNacimiento;
        document.querySelector('#editarEspecialidad').value = response.Especialidad;
        document.querySelector('#editarTelefono').value = response.Telefono;

    })
    
}

function modificarDoctor() {
   
    console.log(localStorage.getItem("userAuxiliar"));
     // Recopilamos la informacion de los objetos de HTML
     var nombre = document.querySelector('#editarNombre').value;
     var apellido = document.querySelector('#editarApellido').value;
     var fechaNacimiento = document.querySelector('#editarFechaNacimiento').value;
     var userName = document.querySelector('#editarUserName').value;
     var contrasenia = document.querySelector('#editarContrasenia').value;
     var especialidad = document.querySelector('#editarEspecialidad').value;
     var telefono = document.querySelector('#editarTelefono').value;
     var objeto = {
         'nombre': nombre,
         'apellido': apellido,
         'fecha': fechaNacimiento,
         'contrasenia': contrasenia,
         'userName': userName,
         'userAuxiliar':localStorage.getItem("userAuxiliar"),
         'especialidad':especialidad,
         'telefono': telefono
     }
     console.log(objeto)
 
     // La estructura del fetch no cambia, solo la URL donde consume la API y el method.
     fetch(`https://proyecto2-backend-ipc1.herokuapp.com/Usuarios/${userName}`, {
     method: 'PUT',
     body: JSON.stringify(objeto),
     headers:{
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',}})
     .then(res => res.json())
     .catch(err => {
         console.error('Error:', err)
         alert("Ocurrio un error, ver la consola")
     })
     .then(response =>{
        if (response.Mensaje == "El usuario ya existe") {
            alert(response.Mensaje)
             
         }else{
             
             localStorage.setItem("usuario", userName);
             localStorage.setItem("nombre", nombre);
             localStorage.setItem("apellido", apellido);
             document.querySelector('#usuario-nombre').innerHTML = localStorage.getItem("usuario");
             document.querySelector('#nombre-inicio').innerHTML = localStorage.getItem("nombre") + " " + localStorage.getItem("apellido") +  `<small>` + localStorage.getItem("tipo") +`</small>`;
             location.reload();
             alert(response.Mensaje)
         }


         
     })
    
}

function MostrarCitas() {

    var tabla = document.querySelector('#tCitas');
    var cadena = ``;
    fetch('https://proyecto2-backend-ipc1.herokuapp.com/Citas', {
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
       
        // console.log(response);
        for(var i in response)
        {
            if (response[i].Estado == "Pendiente") {
                if (response[i].IdCita == 0) {
                    
                }else{
                    cadena += 
                `
                    <tr>
                   
                        <td>${response[i].IdCita}</td>
                        <td>${response[i].Fecha}</td>
                        <td>${response[i].Hora}</td>
                        <td>${response[i].Motivo}</td>
                        <td><input type="button" onclick="aceptarCita(this)" class="btn btn-success" name="${response[i].IdCita}" value="Aceptar"></td>
                        <td><input type="button" onclick="rechazarCita(this)" class="btn btn-danger"  name="${response[i].IdCita}" value="Rechazar"></td>
                      
    
                    </tr>
                `

                }

                
                
            }            
           
           
                
             
           
        }
        tabla.innerHTML = cadena;
    })
}

function aceptarCita(boton) {
  
    
  
        
        var idCitaAux = boton.name;
        var usuarioDoctorAux = document.querySelector('#listaDoctores').value.split('-');
        var usuarioDoctor = usuarioDoctorAux[0];

        var objeto = {
            'usuarioDoctor': usuarioDoctor,
            'Estado': "Aceptada"
        }
        // console.log(objeto)
    
        // La estructura del fetch no cambia, solo la URL donde consume la API y el method.
        fetch(`https://proyecto2-backend-ipc1.herokuapp.com/Citas/${idCitaAux}`, {
        method: 'PUT',
        body: JSON.stringify(objeto),
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',}})
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response =>{
        

            
        
            // alert(response.Mensaje)
            alert("Se asigno Doctor Exitosamente");
            location.reload();
            
        })
     
    

}

function rechazarCita(boton) {
    var idCitaAux = boton.name;
    var usuarioDoctorAux = document.querySelector('#listaDoctores').value.split('-');
    var usuarioDoctor = usuarioDoctorAux[0];

     var objeto = {
         'usuarioDoctor': "",
         'Estado': "Rechazada"
     }
    //  console.log(objeto)
 
     // La estructura del fetch no cambia, solo la URL donde consume la API y el method.
     fetch(`https://proyecto2-backend-ipc1.herokuapp.com/Citas/${idCitaAux}`, {
     method: 'PUT',
     body: JSON.stringify(objeto),
     headers:{
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',}})
     .then(res => res.json())
     .catch(err => {
         console.error('Error:', err)
         alert("Ocurrio un error, ver la consola")
     })
     .then(response =>{
     

         
     
        // alert(response.Mensaje)
        alert("Cita Rechazada");
        location.reload();
         
     })
     
    
}

function aceptarCita(boton) {
  
    
   
        
    var idCitaAux = boton.name;
    var usuarioDoctorAux = localStorage.getItem("usuario");
    
    console.log(usuarioDoctorAux);
    var usuarioDoctor =  localStorage.getItem("usuario");

    var objeto = {
        'usuarioDoctor': usuarioDoctor,
        'Estado': "Aceptada"
    }
    // console.log(objeto)

    // La estructura del fetch no cambia, solo la URL donde consume la API y el method.
    fetch(`https://proyecto2-backend-ipc1.herokuapp.com/Citas/${idCitaAux}`, {
    method: 'PUT',
    body: JSON.stringify(objeto),
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',}})
    .then(res => res.json())
    .catch(err => {
        console.error('Error:', err)
        alert("Ocurrio un error, ver la consola")
    })
    .then(response =>{
    

        
    
        // alert(response.Mensaje)
        alert("Se asigno Doctor Exitosamente");
        location.reload();
        
    })
 


}

function rechazarCita(boton) {
    var idCitaAux = boton.name;


    var objeto = {
        'usuarioDoctor': "",
        'Estado': "Rechazada"
    }
   //  console.log(objeto)
   
    // La estructura del fetch no cambia, solo la URL donde consume la API y el method.
    fetch(`https://proyecto2-backend-ipc1.herokuapp.com/Citas/${idCitaAux}`, {
    method: 'PUT',
    body: JSON.stringify(objeto),
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',}})
    .then(res => res.json())
    .catch(err => {
        console.error('Error:', err)
        alert("Ocurrio un error, ver la consola")
    })
    .then(response =>{
    
   
        
    
       // alert(response.Mensaje)
       alert("Cita Rechazada");
       location.reload();
        
    })
 

}




function MostrarCitasAceptadas() {

var tabla = document.querySelector('#tCitasAceptadas');
var cadena = ``;
fetch('https://proyecto2-backend-ipc1.herokuapp.com/Citas', {
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
    var doctorUser =  localStorage.getItem("usuario");
   
    console.log(doctorUser);
    for(var i in response)
    {
        if (response[i].IdCita == 0) {
            
        }else{
        if (response[i].Estado == "Aceptada") {
            
            if (response[i].UsuarioDoctor == doctorUser) {
                cadena += 
                `
                    <tr>
                   
                        <td>${response[i].IdCita}</td>
                        <td>${response[i].Fecha}</td>
                        <td>${response[i].Hora}</td>
                        <td>${response[i].Motivo}</td>
                        <td><input type="checkbox" onclick="completarCita(this)" value="${response[i].IdCita}" id="chekCompletarcita"></td>
    
                    </tr>
                `
                
            }

           
            
        }            
    }
       
            
         
       
    }
    tabla.innerHTML = cadena;
})
}
function completarCita(boton) {
    var chek = document.querySelector('#chekCompletarcita').checked;

    if (chek == true) {
        console.log("esta en azul");
        var idCitaAux = boton.value;
        var usuarioDoctorAux = localStorage.getItem("usuario");
        
        console.log(usuarioDoctorAux);
        var usuarioDoctor =  localStorage.getItem("usuario");
    
        var objeto = {
            'usuarioDoctor': usuarioDoctor,
            'Estado': "Completada"
        }
        // console.log(objeto)
    
        // La estructura del fetch no cambia, solo la URL donde consume la API y el method.
        fetch(`https://proyecto2-backend-ipc1.herokuapp.com/Citas/${idCitaAux}`, {
        method: 'PUT',
        body: JSON.stringify(objeto),
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',}})
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response =>{
        
    
            
        
            // alert(response.Mensaje)
            // alert("Se asigno Doctor Exitosamente");
            // location.reload();
            
        })


      

        var objeto = {
            'top': 1
        }
        console.log(objeto)
    
        fetch(`https://proyecto2-backend-ipc1.herokuapp.com/UsuariosTop/${usuarioDoctor}`, {
        method: 'PUT',
        body: JSON.stringify(objeto),
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
          
        })



    }else if (chek == false) {
        console.log("esta en gris");
        var idCitaAux = boton.value;
        var usuarioDoctorAux = localStorage.getItem("usuario");
        
        console.log(usuarioDoctorAux);
        var usuarioDoctor =  localStorage.getItem("usuario");
    
        var objeto = {
            'usuarioDoctor': usuarioDoctor,
            'Estado': "Pendiente"
        }
        // console.log(objeto)
    
        // La estructura del fetch no cambia, solo la URL donde consume la API y el method.
        fetch(`https://proyecto2-backend-ipc1.herokuapp.com/Citas/${idCitaAux}`, {
        method: 'PUT',
        body: JSON.stringify(objeto),
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',}})
        .then(res => res.json())
        .catch(err => {
            console.error('Error:', err)
            alert("Ocurrio un error, ver la consola")
        })
        .then(response =>{
        
    
            
        
            // alert(response.Mensaje)
            // alert("Se asigno Doctor Exitosamente");
            // location.reload();
            
        })
        
    }

}
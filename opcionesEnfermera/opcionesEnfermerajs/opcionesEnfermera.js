function accionesEnfemera() {

    var usuario = localStorage.getItem("usuario");
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
        document.querySelector('#editarTelefono').value = response.Telefono;

    })
}

function modificarEnfermera() {
   
    console.log(localStorage.getItem("userAuxiliar"));
     // Recopilamos la informacion de los objetos de HTML
     var nombre = document.querySelector('#editarNombre').value;
     var apellido = document.querySelector('#editarApellido').value;
     var fechaNacimiento = document.querySelector('#editarFechaNacimiento').value;
     var userName = document.querySelector('#editarUserName').value;
     var contrasenia = document.querySelector('#editarContrasenia').value;
     var telefono = document.querySelector('#editarTelefono').value;
     var especialidad = "";
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
    //  console.log(objeto)
 
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

         console.log(response);
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
                    
                }else
                {
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
  
    
    if (document.querySelector('#listaDoctores').value == '') 
    {
        alert("Debe elegir un Doctor"); 
    }
    else
    {
        
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

function cargarComboDoctores()
{
  
    var combo = document.querySelector('#listDoctores');
    var cadenalist = ``;
    fetch('https://proyecto2-backend-ipc1.herokuapp.com/Usuarios', {
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
       
        for(var i in response)
        {
            if (response[i].Tipo == 1) {
                // console.log(response);
                cadenalist +=
                `
                 <option value="${response[i].UserName}-${response[i].Nombre} ${response[i].Apellido}"></option>
                `
            }
        }
        combo.innerHTML = cadenalist;
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
                    
                }else
                {
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
       
        // console.log(response);
        for(var i in response)
        {
            if (response[i].Estado == "Aceptada") {
    
                cadena += 
                `
                    <tr>
                   
                        <td>${response[i].IdCita}</td>
                        <td>${response[i].Fecha}</td>
                        <td>${response[i].Hora}</td>
                        <td>${response[i].Motivo}</td>
                        <td>${response[i].Estado}</td>
    
                    </tr>
                `
                
            }            
           
           
                
             
           
        }
        tabla.innerHTML = cadena;
    })
    }
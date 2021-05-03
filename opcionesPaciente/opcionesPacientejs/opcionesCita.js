function modificarPacienteCita() {
   
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
     
              console.log(response);
            location.href = "/Frontend/opcionesPaciente/Cita.html";
              alert(response.Mensaje)
         }
     })
    
}

// Registro de citas
function registroCita()
{
    
    var idCita = 0;
    var usuarioPaciente = localStorage.getItem("usuario");
    var fecha = document.querySelector('#fechaCita').value;
    var hora = document.querySelector('#horaCita').value;
    var motivo = document.querySelector('#motivoCita').value;
    var estado = "Pendiente";
    var usuarioDoctor = "";

    if (fecha == "" || hora =="" || motivo == "" ) 
    {
        alert("Algun campo esta vacio");
    }
    else
    {
        var objeto = 
        {
            'idCitas': idCita,
            'usuarioPaciente': usuarioPaciente,
            'fecha': fecha, 
            'hora': hora, 
            'motivo': motivo, 
            'estado': estado, 
            'usuarioDoctor': usuarioDoctor
        }
        // console.log(objeto);

        fetch('https://proyecto2-backend-ipc1.herokuapp.com/Citas', {
        method: 'POST',
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
            console.log(response.Mensaje);
            alert(response.Mensaje);
            document.querySelector('#fechaCita').value = "";
            document.querySelector('#horaCita').value= "";
            document.querySelector('#motivoCita').value = "";
            CargarTablaCitas();
            // alert(response.Mensaje)
            // ObtenerDatos();
        })
    }


    

}

function CargarTablaCitas()
{
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
        var btnColor = "";
        // console.log(response);
        for(var i in response)
        {
            // paciente
            if (response[i].UsuarioPaciente == localStorage.getItem("usuario") ) {
                if (response[i].Estado == "Pendiente")
                {
                    btnColor = "btn btn-warning";
                }else if (response[i].Estado == "Aceptada")
                {
                    btnColor = "btn btn-info";
                }else if (response[i].Estado == "Completada")
                {
                    btnColor = "btn btn-success";
                }else if (response[i].Estado == "Rechazada")
                {
                    btnColor = "btn btn-danger";
                }

                 console.log(response[i]);
            cadena += 
            `
                <tr>
               
                    <td>${response[i].IdCita}</td>
                    <td>${response[i].UsuarioPaciente}</td>
                    <td>${response[i].Fecha}</td>
                    <td>${response[i].Hora}</td>
                    <td>${response[i].Motivo}</td>
                    <td><input type="button" class="${btnColor}" value="${response[i].Estado}"></td>
                    <td>${response[i].UsuarioDoctor}</td>

                </tr>
            `
                
             }
           
        }
        tabla.innerHTML = cadena;
    })
}



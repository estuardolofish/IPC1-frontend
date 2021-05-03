function registroPaciente()
{
    
    var nombre = document.querySelector('#nombre').value;
    var apellido = document.querySelector('#apellido').value;
    var fechaNacimiento = document.querySelector('#fechaNacimiento').value;
    var sexo = document.querySelector('#sexo').value;
    var userName = document.querySelector('#userName').value;
    var contrasenia = document.querySelector('#contrasenia-registro').value;
    var telefono = document.querySelector('#telefono').value;
    var tipo = 0;
    var especialidad = "";
    if (nombre == "" || apellido =="" || fechaNacimiento == "" || sexo =="" || userName =="" || contrasenia == "") 
    {
        document.querySelector('#error-ingresar-paciente').innerHTML =  `<div class="alert alert-danger" role="alert">
        Error: Alguno de los Campos esta Vacio
      </div>`;
    }
    else
    {
        var objeto = 
        {
            'nombre': nombre,
            'apellido': apellido,
            'fechaNacimiento': fechaNacimiento, 
            'sexo': sexo, 
            'userName': userName, 
            'contrasenia': contrasenia, 
            'telefono': telefono, 
            'tipo': tipo ,
            'especialidad': especialidad
        }
        console.log(objeto);

        fetch('https://proyecto2-backend-ipc1.herokuapp.com/Usuarios', {
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
            document.querySelector('#error-ingresar-paciente').innerHTML =  `<div class="alert alert-success" role="alert">
            ${response.Mensaje}
          </div>`;
          document.querySelector('#nombre').value = "";
          document.querySelector('#apellido').value = "";
          document.querySelector('#fechaNacimiento').value = "";
          document.querySelector('#sexo').value = "";
          document.querySelector('#userName').value = "";
          document.querySelector('#contrasenia-registro').value = "";
          document.querySelector('#telefono').value = "";
            // alert(response.Mensaje)
            // ObtenerDatos();
        })
    }


    

}


// opciones para Paciente
function csvPaciente() {

    Papa.parse(document.getElementById('csvPaciente').files[0], {
        complete: function(results){
            // console.log(results);
            console.log(results.data);
            var data = results.data; 
            data.shift();
            data.forEach(element => {
                console.log(data);
                var fecha = element[2].split('/');
                var dia = "";

                if (fecha[0].length >= 2) {
                    dia = fecha[0];
                }else
                {
                    dia = "0"+fecha[0];
                }
                var objeto = 
                {
                    'nombre': element[0],
                    'apellido': element[1],
                    'fechaNacimiento': fecha[2] + "-" + fecha[1] + "-" + dia , 
                    'sexo': element[3], 
                    'userName': element[4], 
                    'contrasenia': element[5], 
                    'telefono': element[6], 
                    'tipo': 0, 
                    'especialidad': ""
                }   
                console.log(objeto);    
                
                fetch('https://proyecto2-backend-ipc1.herokuapp.com/Usuarios', {
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
                        cargarTablaPacientes();
                    })   
        
            });
            // results.data.map((data, index) => {
            //     console.log(data); 
            // //     var objeto = 
            // //     {
            // //         'nombre': data.Nombre,
            // //         'apellido': data.Apellido,
            // //         'fechaNacimiento': data.Fecha, 
            // //         'sexo': data.sexo, 
            // //         'userName': data.usuario, 
            // //         'contrasenia': data.contrasenia, 
            // //         'telefono': data.telefono, 
            // //         'tipo': 0 
            // //     }
            // //     console.log(objeto);
            // //     fetch('https://proyecto2-backend-ipc1.herokuapp.com/Usuarios', {
            // //         method: 'POST',
            // //         body: JSON.stringify(objeto),
            // //         headers:{
            // //             'Content-Type': 'application/json',
            // //             'Access-Control-Allow-Origin': '*',}})
            // //         .then(res => res.json())
            // //         .catch(err => {
            // //             console.error('Error:', err)
            // //             alert("Ocurrio un error, ver la consola")
            // //         })
            
            // //         .then(response =>{
            // //             console.log(response.Mensaje);
            // //         })   
            // });
            
        }

    });


    



}

function cargarTablaPacientes()
{
    var tabla = document.querySelector('#tPaciente');
    var cadena = ``;
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
        // console.log(response);
        for(var i in response)
        {
            // paciente
            if (response[i].Tipo == 0) {

                 // console.log(response[i]);
            cadena += 
            `
                <tr>
               
                    <td>${response[i].UserName}</td>
                    <td>${response[i].Nombre} ${response[i].Apellido}</td>
                    <td>${response[i].FechaNacimiento}</td>
                    <td>${response[i].Contrasenia}</td>
                    <td>${response[i].Telefono}</td>
                    <td> 
                    <button type="button" onclick="accionesPaciente(this)" class="fa fa-pencil-square-o btn btn-success btnAccionesPaciente" aria-hidden="true" data-toggle="modal" data-target="#modalEditarPaciente"  value=${response[i].UserName}></button> 
                    </td>
                </tr>
            `
                
            }
           
        }
        tabla.innerHTML = cadena;
    })
}

// para llenar la tabla de datos y realizar acciones
function accionesPaciente(boton) {
    console.log(boton.value);
    var usuario = boton.value;
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

function modificarPaciente() {
   
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

         console.log(response);
         location.href = "../opcionesAdministrador/cargarPacientes.html";
         alert(response.Mensaje)
     })
    
}

function eliminarPaciente() {

    var userName = document.querySelector('#editarUserName').value
            
    fetch(`https://proyecto2-backend-ipc1.herokuapp.com/Usuarios/${userName}`, {
    method: 'DELETE',
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
        location.href = "../opcionesAdministrador/cargarPacientes.html";
        alert(response.Mensaje)
    })
    
}

function PDFreporte() {

    var pdf = new jsPDF('p','pt',[1000, 800]);
    pdf.text(25,25,"Reporte Pacientes");

    var tabla = document.querySelector('#tPaciente');
    var cadena = ``;
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
        console.log(response);
        var columns = ["UserNAme", "Nombre", "Apellido", "Fecha", "Contraseña","Telefono"];
        var data = [];
            response.forEach(element => {  
                if (element.Tipo == 0) {
                    var temp1 = [element.UserName,element.Nombre,element.Apellido, element.FechaNacimiento,element.Contrasenia,element.Telefono];
                    data.push(temp1);
                }
            });     
   
        console.log(data);

        pdf.autoTable(columns,data,
            {margin:{ top: 30 }}
            );
    
        pdf.save('Personas.pdf');
        
    })

   
    
}
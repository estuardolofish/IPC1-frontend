
// opciones para Doctor
function csvDoctor() {

    Papa.parse(document.getElementById('csvDoctor').files[0], {
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
                    'telefono': element[7], 
                    'tipo': 1, 
                    'especialidad': element[6]
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
                        cargarTablaDoctores();
                    })   
        
            });
            
        }

    });


    



}

function cargarTablaDoctores()
{
    var tabla = document.querySelector('#tDoctores');
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
            // Doctores
            if (response[i].Tipo == 1) {

                 // console.log(response[i]);
            cadena += 
            `
                <tr>
                 
                    <td>${response[i].UserName}</td>
                    <td>${response[i].Nombre} ${response[i].Apellido}</td>
                    <td>${response[i].FechaNacimiento}</td>
                    <td>${response[i].Contrasenia}</td>
                    <td>${response[i].Especialidad}</td>
                    <td>${response[i].Telefono}</td>
                    <td> 
                    <button type="button" onclick="accionesDoctor(this)" class="fa fa-pencil-square-o btn btn-success btnAccionesDoctor" aria-hidden="true" data-toggle="modal" data-target="#modalEditarDoctor"  value=${response[i].UserName}></button> 
                    </td>
                </tr>
            `
                
            }
           
        }
        tabla.innerHTML = cadena;
    })
}

// para llenar la tabla de datos y realizar acciones
function accionesDoctor(boton) {
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

         console.log(response);
         location.href = "../opcionesAdministrador/cargarMedicos.html";
         alert(response.Mensaje)
     })
    
}

function eliminarDoctor() {

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
        location.href = "../opcionesAdministrador/cargarMedicos.html";
        alert(response.Mensaje)
    })
    
}

function PDFreporte() {

    var pdf = new jsPDF('p','pt',[1000, 800]);
    pdf.text(25,25,"Reporte Doctores");

    var tabla = document.querySelector('#tDoctores');
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
        var columns = ["UserNAme", "Nombre", "Apellido", "Fecha", "Contraseña", "Especialidad","Telefono"];
        var data = [];
            response.forEach(element => {  
                if (element.Tipo == 1) {
                    var temp1 = [element.UserName,element.Nombre,element.Apellido, element.FechaNacimiento,element.Contrasenia,element.Especialidad,element.Telefono];
                    data.push(temp1);
                }
            });     
   
        console.log(data);

        pdf.autoTable(columns,data,
            {margin:{ top: 30 }}
            );
    
        pdf.save('Doctores.pdf');
        
    })

   
    
}
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

function obtenerDatosInicales() {


    var fecha = new Date(); //Fecha actual
    var mes = fecha.getMonth()+1; //obteniendo mes
    var dia = fecha.getDate(); //obteniendo dia
    var ano = fecha.getFullYear(); //obteniendo año
    if(dia<10)
      dia='0'+dia; //agrega cero si el menor de 10
    if(mes<10)
      mes='0'+mes //agrega cero si el menor de 10
    document.getElementById('fechaReceta').value=ano+"-"+mes+"-"+dia;


    var comboPadecimiento = document.querySelector('#listPadecimiento');
    var comboPac = document.querySelector('#listPaciente');
    var cadenalistPadecimiento = ``;
    var cadenalistPac = ``;
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
            if (response[i].Tipo == 0) {
                // console.log(response);
                cadenalistPac +=
                `
                 <option value="(${response[i].UserName}) ${response[i].Nombre} ${response[i].Apellido}"></option>
                `
            }
        }

        comboPac.innerHTML = cadenalistPac;
        
    })


    // fech padecimiento
    fetch('https://proyecto2-backend-ipc1.herokuapp.com/Receta', {
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
            if (response[i].idFactura == 0) {
                // console.log(response);
            }
            else
            {
                
                cadenalistPadecimiento +=
                `
                 <option value="${response[i].padecimiento}"></option>
                `
            }
        }

        comboPadecimiento.innerHTML = cadenalistPadecimiento;
        
    })


    
}


function guardarReceta() {
    var idFactura = 0;
    var fecha = document.querySelector('#fechaReceta').value;
    var nomPaciente = document.querySelector('#listaPacientes').value;
    var padecimiento = document.querySelector('#listaPadecimiento').value;
    var descripcion = document.querySelector('#descripcion').value;
   

    if (nomPaciente == '' || padecimiento =='' || descripcion == '') 
    {
        alert("Alguno de los datos estan Vacio")
    }
    else
    {

        var objeto = 
        {
            'idFactura': idFactura,
            'fecha': fecha,
            'nomPaciente': nomPaciente, 
            'padecimiento': padecimiento, 
            'descripcion': descripcion
        }
        console.log(objeto);

        fetch('https://proyecto2-backend-ipc1.herokuapp.com/Receta', {
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
          
            document.querySelector('#listaPacientes').value = '';
            document.querySelector('#listaPadecimiento').value= '';
            document.querySelector('#descripcion').value= 0;
            location.reload();
            alert("Factura Generada Exitosamente")
        })
    }

}


function MostrarFacturasReceta() {

    var tabla = document.querySelector('#tReceta');
    var cadena = ``;
    fetch('https://proyecto2-backend-ipc1.herokuapp.com/Receta', {
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
            if (response[i].idFactura == 0) {
                
            }    else
            {
                cadena += 
                `
                    <tr>
                   
                        <td>${response[i].idFactura}</td>
                        <td>${response[i].fecha}</td>
                        <td>${response[i].nomPaciente}</td>
                        <td>${response[i].padecimiento}</td>
                        <td>${response[i].descripcion}</td>

                        <td>
                            <input type="button" onclick="pdfReceta(this)" class="btn btn-info" name="${response[i].idFactura}" value="PDf">
                        </td>
    
                    </tr>
                `
            }        
           
           
                
             
           
        }
        tabla.innerHTML = cadena;
    })
}


function pdfReceta(boton) {
    var idFac = boton.name;

    var pdf = new jsPDF('p','pt',[1000, 800]);
    pdf.text(25,25,"Receta");


    fetch(`https://proyecto2-backend-ipc1.herokuapp.com/Receta/${idFac}`, {
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
        var columns = ["#","Fecha","Paciente","Padecimiento","Descripcion"];
        var data = [];
            // response.forEach(element => {  
                
                    var temp1 = [response.idFactura ,response.fecha,response.nomPaciente,response.padecimiento,response.descripcion];
                    data.push(temp1);
             
            // });     
   
        console.log(data);

        pdf.autoTable(columns,data,
            {margin:{ top: 30 }}
            );
    
        pdf.save('Receta.pdf');
        
    })

}

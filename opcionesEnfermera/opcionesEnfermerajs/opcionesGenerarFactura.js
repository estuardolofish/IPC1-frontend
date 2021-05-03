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
    document.getElementById('fechaFactura').value=ano+"-"+mes+"-"+dia;


    var comboDoc = document.querySelector('#listDoctor');
    var comboPac = document.querySelector('#listPaciente');
    var cadenalistDoc = ``;
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
            if (response[i].Tipo == 1) {
                // console.log(response);
                cadenalistDoc +=
                `
                 <option value="(${response[i].UserName}) ${response[i].Nombre} ${response[i].Apellido}"></option>
                `
            }
        }
        comboDoc.innerHTML = cadenalistDoc;

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
    
}

function guardarFactura() {
    var idFactura = 0;
    var fecha = document.querySelector('#fechaFactura').value;
    var nomPaciente = document.querySelector('#listaPacientes').value;
    var nomDoctor = document.querySelector('#listaDoctores').value;
    var consulta = document.querySelector('#precioConsulta').value;
    var operacion = document.querySelector('#precioOperacion').value;
    var internado = document.querySelector('#costoInternado').value;
    var total = document.querySelector('#total').value;

    if (nomPaciente == '' || nomDoctor =='' || consulta == 0 ||  total == 0) 
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
            'nomDoctor': nomDoctor, 
            'consulta': consulta, 
            'operacion': operacion, 
            'internado': internado, 
            'total': total 
        }
        console.log(objeto);

        fetch('https://proyecto2-backend-ipc1.herokuapp.com/FacturaServicio', {
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
            document.querySelector('#listaDoctores').value= '';
            document.querySelector('#precioConsulta').value= 0;
            document.querySelector('#precioOperacion').value= 0;
            document.querySelector('#costoInternado').value= 0;
            document.querySelector('#total').value = 0
            location.reload();
            alert("Factura Generada Exitosamente")
        })
    }

}


function MostrarFacturasServicios() {

    var tabla = document.querySelector('#tServisios');
    var cadena = ``;
    fetch('https://proyecto2-backend-ipc1.herokuapp.com/FacturaServicio', {
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
                        <td>${response[i].nomDoctor}</td>
                        <td>Q. ${response[i].consulta}</td>
                        <td>Q. ${response[i].operacion}</td>
                        <td>Q. ${response[i].internado}</td>
                        <td>Q. ${response[i].total}</td>
                        <td>
                            <input type="button" onclick="pdfServicios(this)" class="btn btn-info" name="${response[i].idFactura}" value="PDf">
                        </td>
    
                    </tr>
                `
            }        
           
           
                
             
           
        }
        tabla.innerHTML = cadena;
    })
}


function pdfServicios(boton) {
    var idFac = boton.name;

    var pdf = new jsPDF('p','pt',[1000, 800]);
    pdf.text(25,25,"Factura Servicios");

    var tabla = document.querySelector('#tPaciente');
    var cadena = ``;
    fetch(`https://proyecto2-backend-ipc1.herokuapp.com/FacturaServicio/${idFac}`, {
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
        var columns = ["#","Fecha","Paciente","Doctor","Consulta","Operacion","Internado","Total"];
        var data = [];
            // response.forEach(element => {  
                
                    var temp1 = [response.idFactura ,response.fecha,response.nomPaciente,response.nomDoctor,"Q. " + response.consulta,"Q. " + response.operacion,"Q. " + response.internado,"Q. " + response.total ];
                    data.push(temp1);
             
            // });     
   
        console.log(data);

        pdf.autoTable(columns,data,
            {margin:{ top: 30 }}
            );
    
        pdf.save('FacturaServicios.pdf');
        
    })

}

// opciones para Paciente
function csvMedicamento() {

    Papa.parse(document.getElementById('csvMedicamento').files[0], {
        complete: function(results){
            // console.log(results);
            console.log(results.data);
            var data = results.data; 
            data.shift();
            data.forEach(element => {
                console.log(data);

                var objeto = 
                {
                    'idMedicamento': 0,
                    'nombre': element[0],
                    'precio': element[1],
                    'descripcion': element[2], 
                    'cantidad': element[3]
                    
                }   
                console.log(objeto);    
                
                fetch('https://proyecto2-backend-ipc1.herokuapp.com/Medicamentos', {
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
                        cargarTablaMedicamentos();
                    })   
        
            });
            
        }

    });


    



}

function cargarTablaMedicamentos()
{
    var tabla = document.querySelector('#tMedicamento');
    var cadena = ``;
    fetch('https://proyecto2-backend-ipc1.herokuapp.com/Medicamentos', {
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
            // Medicamentos


                 // console.log(response[i]);
            cadena += 
            `
                <tr>
                    <td>${response[i].IdMedicamento}</td>
                    <td>${response[i].Nombre}</td>
                    <td>Q. ${response[i].Precio}</td>
                    <td>${response[i].Descripcion}</td>
                    <td>${response[i].Cantidad}</td>
                    <td> 
                    <button type="button" onclick="accionesMedicamento(this)" class="fa fa-pencil-square-o btn btn-success btnAccionesMedicamento" aria-hidden="true" data-toggle="modal" data-target="#modalEditarMedicamento"  value=${response[i].IdMedicamento}></button> 
                    </td>
                </tr>
            `
                
            
           
        }
        tabla.innerHTML = cadena;
    })
}

// para llenar la tabla de datos y realizar acciones
function accionesMedicamento(boton) {
    console.log(boton.value);
    var idMedicamento = boton.value;
    // localStorage.setItem("userAuxiliar", usuario);
    fetch(`https://proyecto2-backend-ipc1.herokuapp.com/Medicamentos/${idMedicamento}`, {
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
      
        document.querySelector('#editarId').value = response.IdMedicamento;
        document.querySelector('#editarNombre').value = response.Nombre;
        document.querySelector('#editarPrecio').value = response.Precio;
        document.querySelector('#editarDescripcion').value = response.Descripcion;
        document.querySelector('#editarCantidad').value = response.Cantidad;

    })
    
}

function modificarMedicamento() {
   

     // Recopilamos la informacion de los objetos de HTML
     var IdMedicamento =  document.querySelector('#editarId').value;
     var nombre = document.querySelector('#editarNombre').value;
     var precio = document.querySelector('#editarPrecio').value;
     var descripcion = document.querySelector('#editarDescripcion').value;
     var cantidad = document.querySelector('#editarCantidad').value;

     var objeto = {
         'nombre': nombre,
         'precio': precio,
         'descripcion': descripcion,
         'cantidad': cantidad
     }
     console.log(objeto)
 
     fetch(`https://proyecto2-backend-ipc1.herokuapp.com/Medicamentos/${IdMedicamento}`, {
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
         location.href = "../opcionesAdministrador/cargarMedicamentos.html";
         alert(response.Mensaje)
     })
    
}

function eliminarMedicamento() {

    var IdMedicamento = document.querySelector('#editarId').value
            
    fetch(`https://proyecto2-backend-ipc1.herokuapp.com/Medicamentos/${IdMedicamento}`, {
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
        location.href = "../opcionesAdministrador/cargarMedicamentos.html";
        alert(response.Mensaje)
    })
    
}

function PDFreporte() {

    var pdf = new jsPDF('p','pt',[1000, 800]);
    pdf.text(25,25,"Reporte Medicamentos");

    var tabla = document.querySelector('#tMedicamento');
    var cadena = ``;
    fetch('https://proyecto2-backend-ipc1.herokuapp.com/Medicamentos', {
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
        var columns = ["IdMedicamento", "Nombre", "Precio", "Descripción", "Cantidad"];
        var data = [];
            response.forEach(element => {  
                    var temp1 = [element.IdMedicamento,element.Nombre,"Q. "+element.Precio, element.Descripcion,element.Cantidad];
                    data.push(temp1);
            });     
   
        console.log(data);

        pdf.autoTable(columns,data,
            {margin:{ top: 30 }}
            );
    
        pdf.save('Medicamentos.pdf');
        
    })

   
    
}
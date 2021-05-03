function modificarPacienteCompra() {
   
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
              location.reload();
                            alert(response.Mensaje)
         }
     })
    
}


function cargarComboMedicamentos()
{
    var combo = document.querySelector('#listaMedicamento');
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

            if (response[i].Cantidad > 0) {

                cadena += 
                `
                <option value="${response[i].IdMedicamento} ${response[i].Nombre}">
                   ==>
                    Precio: Q. ${response[i].Precio} - 
                    Cantidad: ${response[i].Cantidad} -
                    Descripcion: ${response[i].Descripcion} 
                </option>
                `
                
            }
           
        }
        combo.innerHTML = cadena;
    })
}


let subtotales = [];

function agregarProducto()
{
    var seleccionCombo = document.querySelector("#listaMedicamentos").value;
    var idMedicamentoSplit = seleccionCombo.split(' ');
    if (document.querySelector("#listaMedicamentos").value = "" || document.querySelector('#cantidadCompra').value == "") {
        alert("Alguno de los campos esta vacio")
        document.querySelector("#listaMedicamentos").value = "";
    
    }
    else
    {

    
        localStorage.setItem("idCompraContador", 1);
      

        // console.log(localStorage.getItem("usuario"));
         console.log(seleccionCombo);
        // console.log(localStorage.getItem("idCompraContador"));
        // localStorage.setItem("idCompraContador", (parseInt(localStorage.getItem("idCompraContador")) + 1));

       

        var idCompra = 0;
        var usuarioPaciente = localStorage.getItem("usuario");
        var idMedicamento = idMedicamentoSplit[0];
        var cantidad = document.querySelector('#cantidadCompra').value;
        var objeto = 
        {
            'idCompra': idCompra,
            'usuarioPaciente': usuarioPaciente,
            'idMedicamento': idMedicamento,
            'cantidad': cantidad 
        }
       

        fetch('https://proyecto2-backend-ipc1.herokuapp.com/Compras', {
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

            var tabla = document.querySelector('#tCompra');
            var total = document.querySelector('#TotalComprafac');
            var totalComrpra = 0;
            var cadena = ``;
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
            //  console.log(response);
  
       
                    // Medicamentos
                         // console.log(response[i]);

                         $("#tCompra").append(

                            '<tr>'+
                            '<td>'+response.Nombre+'</td>'+
                            '<td>Q. '+response.Precio+'</td>'+
                            '<td>'+cantidad+'</td>'+
                            '<td>Q. '+response.Precio * cantidad+'</td>'+
                            // '<td><button type="button" onclick="eliminarPaciente()" class="fa fa-trash-o btn btn-danger" aria-hidden="true" value="Eliminar"></button></td>'+
                            '</tr>'
                            
                            
                            
              
                            ) 
                            var totalAux = response.Precio * cantidad;
                            
                            subtotales.push(totalAux);
                   
                 console.log(subtotales);
                 for (i in subtotales)
                 {

                     totalComrpra = totalComrpra + subtotales[i] ;
                 }
                                
                    



                     

                        cadena = `${totalComrpra}`;
                        total.innerHTML = cadena;

                //     cadena += 
                //     `
                //         <tr>
                //             <td>${response.Nombre}</td>
                //             <td>Q. ${response.Precio}</td>
                //             <td>${cantidad}</td>
                //             <td>${response.Precio * cantidad}</td>
                //             <td>Accion</td>
                //             <td> 
                //             <button type="button" onclick="accionesMedicamento(this)" class="fa fa-pencil-square-o btn btn-success btnAccionesMedicamento" aria-hidden="true" data-toggle="modal" data-target="#modalEditarMedicamento"  value=${response.IdMedicamento}></button> 
                //             </td>
                //         </tr>
                //     `
                        
                    
                   
            
                  
                // tabla.innerHTML = cadena;



                
            })


                        // Recopilamos la informacion de los objetos de HTML
                var IdMedicamento =  parseInt(idMedicamentoSplit[0]);
                var cantidad = document.querySelector('#cantidadCompra').value;

                var objeto = {
                    'top': cantidad
             
                }
                console.log(objeto)
            
                fetch(`https://proyecto2-backend-ipc1.herokuapp.com/MedicamentosTop/${IdMedicamento}`, {
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






             console.log(response);
            // alert(response.Mensaje)
            document.querySelector("#listaMedicamentos").value = "";
            document.querySelector("#cantidadCompra").value = "";
            // ObtenerDatos();
        })

        
        console.log(localStorage.getItem("idCompraContador"));
    }

}

function PDFreporteCompra() {
    
    var objeto = 
    {
        'cont': 0
    }

    fetch('https://proyecto2-backend-ipc1.herokuapp.com/ContCompra', {
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

        })



    var sTable = document.getElementById('tablacompradiv').innerHTML;

        var style = "<style>";
        style = style + "table {width: 100%;font: 17px Calibri;}";
        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
        style = style + "padding: 2px 3px;text-align: center;}";
        style = style + "</style>";

        // CREATE A WINDOW OBJECT.
        var win = window.open('', '');

        win.document.write('<html><head>');
        win.document.write('<title>Reporte Compra</title>');   // <title> FOR PDF HEADER.
        win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
        win.document.write('</body></html>');

        win.document.close(); 	// CLOSE THE CURRENT WINDOW.

        win.print();    // PRINT THE CONTENTS.

        

}
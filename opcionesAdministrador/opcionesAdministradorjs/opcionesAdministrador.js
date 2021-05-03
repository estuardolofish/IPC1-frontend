function cargarReportesTablas(){


    var tabla = document.querySelector('#tDoctores');
    var cadena = ``;
    fetch('https://proyecto2-backend-ipc1.herokuapp.com/UsuariosTopReporte', {
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
        var contador = 0;

     
        console.log(response);

        for(var i in response)
        {
         
        

                if (response[i].Tipo == 1) {

                    if (contador == 3) {
                        break;
                    }else
                    {
                        cadena += 
                    `
                        <tr>
                       
                            <td>${response[i].UserName}</td>
                            <td>${response[i].Nombre} ${response[i].Apellido}</td>
                            <td>${response[i].Top}</td>
                   
        
        
                        </tr>
                    `
                    contador++;
                    }
                    
                        
                    }
                    
            
                    
        }
        tabla.innerHTML = cadena;
       
     
    })



    // para los medicamentos

    var tabla2 = document.querySelector('#tMedicamentos');
    var cadena2 = ``;
    fetch('https://proyecto2-backend-ipc1.herokuapp.com/MedicamentosTopReporte', {
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
        var contador = 0;

        console.log(response);

        for(var i in response)
        {
         
        

                if (response[i].IdMedicamento == 0) {

                   
                        
                    }else{
                      

                        if (contador == 5) {
                            break;
                        }else
                        {
                            cadena2 += 
                        `
                            <tr>
                           
                                <td>${response[i].Nombre}</td>
                                <td>${response[i].Top}</td>
                       
            
            
                            </tr>
                        `
                        }
                        contador++;
                        
                    }
                    

            
                   
        }
        tabla2.innerHTML = cadena2;
       
     
    })



}

function PDFreporteMedicamentos()
{

    var pdf = new jsPDF('p','pt',[1000, 800]);
    pdf.text(25,25,"Reporte TOP Medicamentos");

    
    fetch('https://proyecto2-backend-ipc1.herokuapp.com/MedicamentosTopReporte', {
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
        var contador = 0;
        var columns = ["Medicamento", "Top"];
        var data = [];
            response.forEach(element => {  
                if (element.IdMedicamento == 0) {
                    
                }else
                {
                    contador++;
                    console.log("cont"+contador);
                    if (contador > 5) {
                     
                        
                    }else{
                        var temp1 = [element.Nombre,element.Top];
                    data.push(temp1);
                    }
                    
                }
            });     
   
        console.log(data);

        pdf.autoTable(columns,data,
            {margin:{ top: 30 }}
            );
    
        pdf.save('TOPmedicamentos.pdf');
        
    })

}


function PDFreporteDoctores()
{

    var pdf = new jsPDF('p','pt',[1000, 800]);
    pdf.text(25,25,"Reporte TOP Medicamentos");

    
    fetch('https://proyecto2-backend-ipc1.herokuapp.com/UsuariosTopReporte', {
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
        var contador = 0;
        var columns = ["Usuario", "Nombre","Citas"];
        var data = [];
            response.forEach(element => {  
                if (element.UserName == "201907622") {
                    
                }else
                {
                    contador++;
                    console.log("cont"+contador);
                    if (contador > 3) {
                     
                        
                    }else{
                        var temp1 = [element.UserName,element.Nombre + " " + element.Apellido,element.Top];
                    data.push(temp1);
                    }
                    
                }
            });     
   
        console.log(data);

        pdf.autoTable(columns,data,
            {margin:{ top: 30 }}
            );
    
        pdf.save('TOPdoctores.pdf');
        
    })

}
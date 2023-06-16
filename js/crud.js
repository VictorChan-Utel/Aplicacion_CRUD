

document.getElementById("formulario").addEventListener("submit", crear);

//crear

function crear(e)
{
    nomP= document.getElementById("nomP").value
    precio = document.getElementById("precio").value

    let producto = 
    {
        nomP,
        precio
    }

    if(localStorage.getItem("Productos") === null)
    {
        let productos = []
        productos.push(producto)
        localStorage.setItem("Productos", JSON.stringify(productos))
    }
    else
    {
        let productos = JSON.parse(localStorage.getItem("Productos"))
        productos.push(producto)
        localStorage.setItem("Productos", JSON.stringify(productos))
    }

    leer();
    document.getElementById("formulario").reset();
    console.log("Producto agregado satisfactoriamente")
    e.preventDefault();
}   

//Leer

function leer()
{
    let productos = JSON.parse(localStorage.getItem("Productos"));
    document.getElementById("tbody").innerHTML = ""
    for(let i=0; i < productos.length; i++)
    {
        let nomP = productos[i].nomP
        let precio = productos[i].precio

        document.getElementById("tbody").innerHTML +=
        `<tr>
            <td>${nomP}</td>
            <td>${precio}</td>

            <td><button  onclick="editar('${nomP}')" class="btn btn-success" ><img src="img/edit.png"></button></td>

            <td><button onclick="eliminar('${nomP}')" class="btn btn-danger"><img src="img/borrar.png"></button></td>
        
            </tr>
        `
    }
}


// Actualizar/editar

function editar(nomP)
{
    let productos = JSON.parse(localStorage.getItem("Productos"));
    for(let i=0; i<productos.length; i++)
    {

        if(productos[i].nomP === nomP)
        {

            document.getElementById("body").innerHTML = `
            <div class="row">
            <form>
                <fieldset>
                    <legend>Actualizar Nombre</legend>
                    <input type="text" class="form-control my-3" id="newnomP" placeholder="${productos[i].nomP}">
                    <legend>Actualizar PRECIO</legend>
                    <input type="number" step="0.01" class="form-control my-3" id="newprecio" placeholder="${productos[i].precio}">
                    
                    
                 
                </fieldset>
            </form>
            
            </div>
            <tr>
            <td><button class="btn btn-success" onclick="actualizar('${i}')">Actualizar</button></td>
            
            <td><button class="btn btn-danger" onclick="vistaPrincipal()">Cancelar</button></td>
            </tr>
            `
        }
        
    }
}

function actualizar(i)
{
    let entrar = false
    let productos = JSON.parse(localStorage.getItem("Productos"));

    productos[i].nomP = document.getElementById("newnomP").value;
    productos[i].precio = document.getElementById("newprecio").value;
    do
    {
        
        if(newnomP.value.length < 1 || newprecio.value.length < 1)
        {
            Swal.fire(
            {
                icon: 'error',
                title: 'Oops...',
                text: 'Debes ingresar por lo menos un caracter en Nombre y Precio'
            })
            entrar = true;    

        }
        else
        {
            Swal.fire
            ({
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
            localStorage.setItem("Productos", JSON.stringify(productos));  
            vistaPrincipal();
            
        }
    }while(entrar=false)
   
}

//ELiminar

function eliminar(nomP)
{
    let productos = JSON.parse(localStorage.getItem("Productos"));
    for(let i=0; i<productos.length; i++)
    {
        if(productos[i].nomP === nomP)
        {
            productos.splice(i,1);
        }
    }

    localStorage.setItem("Productos", JSON.stringify(productos));
    leer();
}

//Vista Principal

function vistaPrincipal()
{
    document.getElementById("body").innerHTML = 
    `
    <div class="row">
            <form id="formulario">
                <fieldset>
                    <legend>NOMBRE DEL PRODUCTO</legend>
                    <input type="text" class="form-control my-3" id="nomP">
                    <legend>PRECIO</legend>
                    <input type="number" step="0.01" class="form-control my-3" id="precio">
                    <br>
                    <button type="submit" id="crear" class="btn btn-primary">Agregar producto</button><br><br>
                
                 
                </fieldset>
            </form>
            <hr>
            <h3>LISTA DE PRODUCTOS</h3>
            <table class="table table-borderer table-hover" id="listaProductos" 
            style="width:715px"></table>

            <div class="col-md-6">
                <table class="table caption-top bg-light">
                    <thead>
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                      </tr>
                    </thead>
                    <tbody id="tbody">
                      <tr>
                        <td>Jamon</td>
                        <td>200.00</td>
                      </tr>
                    </tbody>
                  </table>
            </div>
        </div>
    `
    leer();
}


leer();
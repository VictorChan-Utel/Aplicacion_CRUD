
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
        </tr>
        `
    }
}

leer();
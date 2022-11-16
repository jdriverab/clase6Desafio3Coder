const express = require("express")
const Productos = require("./containerClass.js")

const app = express()

const PORT = 8080

const archivoBD ='productos.txt'

const productosActuales = new Productos(archivoBD)


const server = app.listen(PORT, () =>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

app.get('/', (req, res)=>{
    
    res.send('Holis')
})

app.get('/productos', async (req, res)=>{
    const productosResponseToReturn = await productosActuales.getAll()
    res.send(productosResponseToReturn)
})

app.get('/productoRandom', async (req, res)=>{

    const randomNumber = Math.ceil(Math.random() * (3 - 0) + 0)
    const productoRandomToReturn = await productosActuales.getById(randomNumber)
    res.send(productoRandomToReturn)
})

server.on('error', err =>{
    console.log(`Error en servidor: ${err}`)
})
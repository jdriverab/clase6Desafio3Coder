const fs = require('fs')

class Contenedor {
    #data
    constructor(name) {
        console.log(`El archivo tendra el siguiente nombre: ${name}`)
        this.name = name
        this.#data = null
    }

    save = async (object) => {
        console.log(`Estamos grabando el siguiente producto: ${object}`)

        if (this.#data === null) {
            await this.getAll()
        }

        const idMaxim = Math.max(...this.#data.map(res=> res.id))

        const newElement = {
            id: idMaxim + 1,
            nombreProducto: object.nombreProducto,
            thumbnail: object.thumbnail
        }

        const newData = this.#data.push(newElement)
        console.log(newData)

        await fs.promises.writeFile(this.name, JSON.stringify(newData, null, 2)).then()

        return newElement.id
    }

    getById = async (idToFind) => {
        console.log(`Estamos buscando el producto con el id: ${idToFind}`)

        if (this.#data === null) {
            await this.getAll()
        }

        const arrayResponse = this.#data.filter(res => idToFind === res.id)
        return arrayResponse ? arrayResponse : null
    }


    getAll = async () => {
        console.log(`Estamos buscando todos los registros`)

        if (this.#data !== null) {
            return this.#data
        }

        return await fs.promises.readFile(this.name, 'utf-8').then(res => {
            this.#data = JSON.parse(res)
            return this.#data
        }).catch(err => console.log('Tuvimos un error al intentar leer el archivo' + err))
    }

    deleteById = async (idToDelete) => {
        console.log(`Estamos eliminando el producto con el id: ${idToDelete}`)

        if (this.#data === null) {
            await this.getAll()
        }
        for( var i = 0; i < this.#data.length; i++){ 
            if ( this.#data[i].id === idToDelete) { 
                this.#data.splice(i, 1); 
            }
        }
        await fs.promises.writeFile(this.name, JSON.stringify(this.#data)).then(res=>{/*console.log(res)*/}).catch('Error al eliminar el id')
    }

    deleteAll = async () => {
        console.log(`Estamos eliminando todos los registros:`)
        const emptyArray = JSON.stringify([{}])
        fs.promises.writeFile(this.name, emptyArray).then(res=>{/*console.log(res)*/}).catch('Error al eliminar el todos los registros')
    }
}

//const archivoBD ='productos.txt'
//const productos = new Contenedor(archivoBD)

module.exports = Contenedor
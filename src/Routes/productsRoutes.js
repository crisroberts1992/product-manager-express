import express,{ Router } from 'express'
import {Product , ProductManager} from '../ProductManager.js'
import { randomUUID } from 'crypto'

export const productManager = new ProductManager('./productos.json')

export const productsRouter = Router()
productsRouter.use(express.json())
productsRouter.use(express.urlencoded({ extended: true }))


productsRouter.get('/', async (req, res) => {
  
  try {
    const productosLeidos = await productManager.getProducts()
    let limit = parseInt(req.query.limit)
    let productosPorPagina

    if (limit){
        productosPorPagina = productosLeidos.slice(0,limit)
        res.send(productosPorPagina)}
        res.json(productosLeidos) 
    }catch (error) {
   res.status(500).json({
    message: error.message
   }) 
  }
})


productsRouter.get('/:pid', async (req, res) => {
   

  try {
    const pId = (req.params.pid)
    const productosLeidos = await productManager.getProductById(+pId)
    res.json(productosLeidos)
    }catch (error){
        res.status(500).json(
            {message: error.message}
        )}
    })
            

productsRouter.post('/', async (req, res) => {
    try {
       // await productManager.getProducts()
        const producto2 = new Product({
            ...req.body,
            id: randomUUID()
        })
        console.log(producto2);
        
        const addProducto = await productManager.addProduct(producto2.title, producto2.description,producto2.price, producto2.thumbnail, producto2.stock, producto2.code,producto2.category)
        res.json(addProducto)
    } catch (error) {
        throw new Error('no es posible agregar el producto')
    }
})

productsRouter.put('/:pid',async( req,res)=>{
    try {
    
        
        const id= (req.params.pid)
        const prodActualizado = (req.body)
    
        const updateProducto = await productManager.updateProduct(+id,prodActualizado)
    
        res.send('Producto actualizado correctamente')
        res.json(updateProducto)
       console.log(updateProducto)
    } catch (error) { 
        throw new Error ('Error: no se encontro el producto filtrado. ')
    }
    } )

    productsRouter.delete('/:pid',async( req,res)=>{
        try {
        
            const getProds = await productManager.getProducts()
            const id= (req.params.pid)
               
            await productManager.deleteProduct(id)
        
            res.send('Producto eliminado correctamente')
           
        } catch (error) {
            throw new Error ('Error: no se encontro el producto filtrado. ')
        }
        } )




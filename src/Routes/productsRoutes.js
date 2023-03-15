import express,{ Router } from 'express'
import {ProductManager} from '../ProductManager.js'
import { randomUUID } from "crypto";

export const productsRouter = Router()
productsRouter.use(express.json())
productsRouter.use(express.urlencoded({ extended: true }))


productsRouter.get('/', async (req, res) => {
  
  try {
    const productosLeidos = await ProductManager.getProducts()
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
    const pid = (req.params.pid)
    const productosLeidos = await ProductManager.getProducts()

    if(pid) {
        let filtro = productosLeidos.find((prod) => prod.id === id)
        if(filtro){
            res.send(filtro)
        }else{
            throw new Error ("ID inexistente")
        }
    
    }}catch (error){
        res.status(500).json(
            {message: error.message}
        )}
    })
            

productsRouter.post('/', async (req, res) => {
    try {
        await ProductManager.getProducts()

        const producto1 = new ProductManager({
            ...req.body,
            id: randomUUID()
        })
        console.log(producto1);
        
        const addProducto = await ProductManager.addProduct(producto1.title, producto1.description,producto1.price, producto1.thumbnail, producto1.stock, producto1.code,producto1.category)
        res.json(addProducto)
    } catch (error) {
        throw new Error('no es posible agregar producto')
    }
})

productsRouter.put('/:pid',async( req,res)=>{
    try {
    
        const getProds = await ProductManager.getProducts()
        const id= req.params.pid
        const prodActualizado = req.body
    
        await ProductManager.updateProduct(id,prodActualizado)
    
        res.send('Producto actualizado correctamente')
       
    } catch (error) {
        throw new Error ('Error: no se encontro el producto filtrado. ')
    }
    } )

    productsRouter.delete('/:pid',async( req,res)=>{
        try {
        
            const getProds = await ProductManager.getProducts()
            const id= req.params.pid
               
            await ProductManager.deleteProduct(id)
        
            res.send('Producto eliminado correctamente')
           
        } catch (error) {
            throw new Error ('Error: no se encontro el producto filtrado. ')
        }
        } )




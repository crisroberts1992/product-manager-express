import express, {Router} from 'express';
import  { ProductManager} from '../ProductManager.js';
import { CartManager} from '../CartManager.js';



export const cartsRouter = Router()
cartsRouter.use(express.json())
cartsRouter.use(express.urlencoded({ extended: true}))


const productManager = new ProductManager('./productos.json');
const cartManager = new CartManager('./carrito.json')

cartsRouter.get('/', async (req, res) => {
    try {
        res.json(await cartManager.getCarts());
      } catch (error) {
        res.json({ error })
      }
    })

cartsRouter.get('/:cid', async (req, res) => {
    try {
        const id = (req.params.cid)
        const carritoID = await cartManager.getCartById(id)

        res.json(carritoID)
    } catch (error) {
        throw new Error("id de carrito no encontrado ")
    }

})
cartsRouter.post('/', async (req, res) =>{
    
        try {                    
        const addCart = await cartManager.createCart()
             res.json(addCart)
             res.send("Cart creado")
            } catch (error) {
             throw new Error('no es posible agregar al carrito')
         }
    }
    )
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = (req.params.cid)
        const pid = (req.params.pid)

        const productos = await productManager.getProducts()
        const carritos = await cartManager.getCarts()

        
        const productoFiltrado = await productos.filter(element => element.id === pid)
        const id = productoFiltrado[0].id
        

        const pr = carritos.filter(elemento => elemento[0].id === cid)
       
        
        pr[0].push({id})

        await cartManager.saveCart()

        res.json(pr);

    } catch (error) {
        throw new Error('id no encontrado')
    }
})
import express, {Router} from 'express';
import  {ProductManager} from '../ProductManager.js';
import { CartManager} from '../CartManager.js';


export const cartsRouter = Router()
cartsRouter.use(express.json())
cartsRouter.use(express.urlencoded({ extended: true}))


const productManager = new ProductManager('./desafio.json');
const cartManager = new CartManager('./carrito.json')

cartsRouter.get('/:cid', async (req, res) => {
    try {
        const id = req.params.cid
        const carritoID = await cartManager.getCartById(id)

        res.json(carritoID)
    } catch (error) {
        throw new Error("id de carrito no encontrado ")
    }

})


cartsRouter.get('/', async (req, res) => {

    res.send(await cartManager.getCarts())
})



cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid

        const productos = await ProductManager.getProducts()
        const carritos = await CartManager.getCarts()

        
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
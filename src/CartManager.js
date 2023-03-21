import { randomUUID } from "crypto";
import fs from "fs";



export class CartManager {
    constructor(path) {
        this.path =path;
        fs.existsSync(this.path)
       ? (this.carts = JSON.parse( fs.readFileSync(this.path, "utf-8")))
       : (this.carts = []);
   }
    
    async getCarts() {
        
        return await this.carts;
      }

async createCart (product) {
    await this.getCarts()

    const cart= [{
        "id":randomUUID(),
        
        }]
    
        cart.push(product)
        this.carts.push(cart)
    const jsonCarts = JSON.stringify(this.carts, null, 2)
    await fs.writeFileSync(this.path, jsonCarts)
    
}

async saveCart(){
   
    const jsonCarts = JSON.stringify(this.carts, null, 2)
    await fs.writeFileSync(this.path, jsonCarts)
}
async getCartById(id){
   
const carritos = await this.getCarts()

const carritoFiltrado = carritos.find(element =>element[0].id ===id)
const productos = carritoFiltrado[1]
   return productos
  
}
}
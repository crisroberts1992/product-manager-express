export class CartManager {
    constructor(path) {
        this.carts;
        this.path = path;
    }
    async readCarts() {
        const data = await fs.readFile(this.path, "utf-8");
        this.carts = JSON.parse(data);
    }
    
    async getCarts() {
        await this.readCarts();
        return this.carts;
      }

async createCart (product) {
    await this.getCarts()

    const cart= [{
        "id":randomUUID(),
        }]
    
        cart.push(product)
        this.carts.push(cart)
    const jsonCarts = JSON.stringify(this.carts, null, 2)
    await fs.writeFile(this.path, jsonCarts)
    
}

async saveCart(){
   
    const jsonCarts = JSON.stringify(this.carts, null, 2)
    await fs.writeFile(this.path, jsonCarts)
}
async getCartById(id){
   
const carritos = await this.getCarts()

const carritoFiltrado = carritos.find(element =>element[0].id ===id)
const productos = carritoFiltrado[1]
   return productos
  
}
}
import { randomUUID } from "crypto";
import fs from "fs";

export class ProductManager {
  constructor(path) {
    this.path = path;
    fs.existsSync(this.path)
      ? (this.products = JSON.parse(fs.readFileSync(this.path, "utf-8")))
      : (this.products = []);
  }

    addProduct = (title, description, price, thumbnail, code, stock) => {
    console.log("Agregando productos!:");
    let encontrado = this.products.some((el) => el.code === code);
    if (!encontrado) {
      let producto = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        id: randomUUID(),
      };
      this.products.push(producto);
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
      console.log("Producto Agregado!");
    } else {
      console.error("Error, producto repetido!");
    }
    console.log("Fin de funcion addProduct!");
  };

  getProducts = () => {
    console.log("Productos: ", this.products);
  };

  getElementById = (id) => {
    const producto = this.products.find((el) => el.id === id);
    console.log("Producto por ID:", producto || "Not Found");
  };

  updateProduct = (id, campo, valorNuevo) => {
    let index = this.products.findIndex((element) => element.id === id);
    let campoValido = Object.keys(this.products[index]).some(
      (el) => el === campo
    );
    if (campo === "id") {
      throw new Error(
        "Error actualizando producto : El id no puede ser modificado\n"
      );
    } else if (!campoValido) {
      throw new Error("Error actualizando producto: Elija un campo valido\n");
    } else {
      this.products[index][campo] = valorNuevo;
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
    }
  };
  deleteProduct = (id) => {
    let encontrado = this.products.some((el) => el.id === id);
    if (encontrado) {
      this.products.splice(id - 1, 1);     
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
      console.log("Producto eliminado exitosamente \n");
    } else {
      throw new Error("Producto no encontrado");
    }
  };
}
//const manager = new ProductManager("./desafio.json");


//Testing
/*manager.addProduct('Producto Prueba', 'Este es un producto prueba', 200, 'sin imagen', '111', 25)
manager.addProduct('Producto Prueba', 'Este es un producto prueba', 200, 'sin imagen', '222', 25)
manager.addProduct('Producto Prueba', 'Este es un producto prueba', 200, 'sin imagen', '333', 25)
manager.addProduct('Producto Prueba', 'Este es un producto prueba', 200, 'sin imagen', '444', 25)
manager.addProduct('Producto Prueba', 'Este es un producto prueba', 200, 'sin imagen', '555', 25)
manager.addProduct('Producto Prueba', 'Este es un producto prueba', 200, 'sin imagen', '666', 25)
manager.addProduct('Producto Prueba', 'Este es un producto prueba', 200, 'sin imagen', '777', 25)
manager.addProduct('Producto Prueba', 'Este es un producto prueba', 200, 'sin imagen', '888', 25)
manager.addProduct('Producto Prueba', 'Este es un producto prueba', 200, 'sin imagen', '999', 25)
manager.addProduct('Producto Prueba', 'Este es un producto prueba', 200, 'sin imagen', '010', 25)


manager.getProducts();*/

//export default manager;

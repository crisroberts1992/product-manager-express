import express from "express";
import manager from "./ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
console.log(manager.getProducts());
const productos = manager.products;
app.get("/", (req, res) => {
  res.json({ productos });
});

app.get("/products", (req, res) => {
  let limit = parseInt(req.query.limit);
  try {
    if (limit === 0 || !limit) {
      res.json({ productos });
    } else {
      const arrayOriginal = productos;
      let arrayConLimite = arrayOriginal.slice(0, limit);
      res.json(arrayConLimite);
    }
  } catch (error) {
    console.log("Error", error);
    res.send("Ocurrido un error");
  }
});

app.get("/products/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  const arrayOriginal = productos;
  const arrayPorId = await arrayOriginal.find((el) => el.id === pid);

  res.json(arrayPorId || { Error: "Producto no encontrado" });
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});

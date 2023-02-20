import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const manager = new ProductManager("./products.json");
app.get("/products", async (req, res) => {
  const { limit } = req.query;
  const products = await manager.getProducts();
  if (limit) return res.send(products.slice(0, limit));
  res.send({ products });
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await manager.getProductById(id);
  res.send(product );
});

app.listen(8080, () => {
  console.log("Server on Port 8080");
});

import fs from "fs";
class ProductManager {
  #path;
  

  constructor(path) {
    this.#path = path;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const products = await this.getProducts();
    const product = products.find((item) => item.code === code);
    let msn = ``;
    if (code === undefined) msn += `El producto debe tener un Codigo \n`;
    if (product)
      throw new Error(
        `El codigo ${code} del produto ${title} ya esta registrado `
      );
    if (title === undefined) msn += `El producto debe tener un Nombre \n`;
    if (description === undefined)
      msn += `El producto debe tener una Descripcion \n`;
    if (price === undefined) msn += `El producto debe tener Precio \n`;
    if (thumbnail === undefined) msn += `El producto debe tener una imagen \n`;
    if (stock === undefined)
      msn += `El producto debe tener un numero de stock \n`;

    if (msn.length > 0) throw new Error(msn);

    const newProduc = {
      id: products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    const updatedProducts = [...products, newProduc];
    await fs.promises.writeFile(this.#path, JSON.stringify(updatedProducts));
  }

  async getProducts() {
    try {
      const products = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      return [];
    }
  }

  async getProductById(idProdut) {
    const products = await this.getProducts();
    const product = products.find((item) =>  item.id == idProdut);
    if (!product) throw new Error(`Not found`);
    return product;
  }

  async updatedProduct(id, newProductAtributs) {
   
    const product = await this.getProductById(id);
    const newProduct = { ...product, ...newProductAtributs, id };
    await this.deleteProduct(id);
    const products = await this.getProducts();
    const updatedProducts = [...products, newProduct];
    await fs.promises.writeFile(this.#path, JSON.stringify(updatedProducts));
  }
  async deleteProduct(id) {
    const products = await this.getProducts();
    const newProducts = products.filter((product) => {
      return product.id !== id;
    });
    await fs.promises.writeFile(this.#path, JSON.stringify(newProducts));
  }
}

 

export default ProductManager;

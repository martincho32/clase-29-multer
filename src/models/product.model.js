const { readFileSync, writeFileSync } = require("fs")
const { join } = require("path")

const model = {
  products: join(__dirname, "../data", "productsDataBase.json"),
  index: () => JSON.parse(readFileSync(model.products, {encoding: 'utf-8'})),
  findOne: id => model.index().find(producto => producto.id == id),
  createProduct: (product) => {
    // 1. Traer todos los prods
    const allProducts = model.index()
    // 2. Crear identificador unico
    product.id = Date.now()
    
    // 3. pushear el producto nuevo en la lista de productos
    allProducts.push(product)
    // 4. volver a guardar los productos en el JSON
    writeFileSync(model.products, JSON.stringify(allProducts, null, 2 ))
  }
  
}

module.exports = model

const { readFileSync, writeFileSync } = require("fs")
const { join } = require("path")

const model = {
  products: join(__dirname, "../data", "productsDataBase.json"),
  index: () => JSON.parse(readFileSync(model.products, {encoding: 'utf-8'})),
  findOne: id => model.index().find(producto => producto.id == id),
  // crear método para eliminar un producto, y luego escribit en al JSON 
  // el actualizado(sin el producto)
}

module.exports = model

const { index, findOne, createProduct } = require("../models/product.model")
const fs = require("fs")
const path = require("path")

const toThousand = (n) => {
  // Separar parte entera y decimal
  const [parteEntera, parteDecimal] = n.toString().split('.')

  // Agregar puntos como separadores de miles a la parte entera
  const parteEnteraFormateada = parteEntera.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    '.'
  )

  // Devolver la parte entera formateada y la parte decimal (si existe)
  return parteDecimal
    ? `${parteEnteraFormateada},${parteDecimal}`
    : parteEnteraFormateada
}

const controller = {
	// Root - Show all products
	index: (req, res) => {
		
		res.render("products", {
			productos: index(),
			calculateDiscount: toThousand
		})

	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		console.log("llego a detail", req.params.id)
		const idProducto = req.params.id
		const producto = findOne(idProducto)
		console.log("El producto es: ", producto)


		res.render("detail", {
			calculateDiscount: toThousand,
			producto: producto
		})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		console.log("entro por el controller, req.body ", req.body)
		console.log("entro por el controller, req.file ", req.file)

		const product = req.body
		// aca llamo al metodo del modelo
		product.image = req.file.filename
		// luego redirijo
		createProduct(product)
		res.redirect("/products")
	},

	// Update - Form to edit
	edit: (req, res) => {
		const idProducto = req.params.id
		const producto = findOne(idProducto)
		res.render('product-edit-form', {productToEdit: producto})
	},
	// Update - Method to update
	update: (req, res) => {
		const productos = index()
		const id = req.params.id
		
		const productosUpdated = productos.map(producto =>{
			if(producto.id == id){
				producto = req.body
				producto.id = id
				if(req.file){			
					producto.image = req.file.filename
				}				
			}
			return producto
		})
		const productoActualizado = JSON.stringify(productosUpdated, null, 2) 
		fs.writeFileSync(path.resolve(__dirname, "../data/productsDataBase.json"), productoActualizado)		
		res.redirect(`/products/detail/${id}`)	
		
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		const productos = index()
		const id = req.params.id
		const productosRestantes = productos.filter(producto => producto.id != id)
		const productosGuardar = JSON.stringify(productosRestantes, null, 2)
		fs.writeFileSync(path.resolve(__dirname, "../data/productsDataBase.json"), productosGuardar)
		res.redirect("/")		
	}
};

module.exports = controller;
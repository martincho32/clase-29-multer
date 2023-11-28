const { index, findOne } = require("../models/product.model")

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
		// logic to create prod

	},

	// Update - Form to edit
	edit: (req, res) => {
		const idProducto = req.params.id
		const producto = findOne(idProducto)
		res.render('product-edit-form', {productToEdit: producto})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		res.send({message: "OK123123123"})
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		console.log("query", req.query)
		// Do the magic
		res.status(200).send({message: "OK"})
	}
};

module.exports = controller;
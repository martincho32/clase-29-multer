const fs = require('fs')
const path = require('path')

// const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const { index, findOne } = require('../models/product.model')
// const model = require("../models/product.model")

// const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
  index: (req, res) => {
    const products = index()
    const oferta = products.filter((product) => product.category == 'in-sale')
    const visitado = products.filter((product) => product.category == 'visited')

    res.render('index', {
      oferta: oferta,
      visitado: visitado,
      calculateDiscount: toThousand,
    })
  },
  search: (req, res) => {
    // Do the magic
  },
}

module.exports = controller

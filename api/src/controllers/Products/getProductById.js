const { Product, Collection, ProductsInCart, Reviews } = require("../../db");

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Bad request",
      });
    } else {
      const product = await Product.findByPk(id, {
        include: [
          {
            model: Collection,
            attributes: ["name"],
          },
          {
            model: Reviews,
            attributes: ["id", "review", "score"],
          },
        ],
      });
      return res.status(200).send(product);
    }
  } catch (e) {
    return res.status(400).send({ e: "Id incorrecto" });
  }
};
module.exports = { getProductById };

//get order by status

const { Cart, ProductsInCart, Product } = require("../../db");

async function getOrderByStatus(req, res, next) {
  try {
    var { status } = req.query;
    if(status){
      status = status.toUpperCase();
    if (status === "TODOS") {
      const cart2 = await Cart.findAll({
        include: [
          {
            model: ProductsInCart,
            attributes: {
              exclude: [, "productId", "CartId"],
            },
            include: [
              {
                model: Product,
                attributes: ["id", "salePrice", "productName"],
              },
            ],
          },
        ],
      });
      if (cart2) {
        return res.status(200).json(cart2);
      }
    } else {
      if (
        status !== "PENDING" &&
        status !== "COMPLETED" &&
        status !== "CANCELED" &&
        status !== "PROCESSING"
      ) {
        return res.status(400).json({
          message: "Status no valido",
        });
      }
      if (!status) {
        return res.status(400).json({
          message: "Status requerido",
        });
      } else {
        const cart = await Cart.findAll({
          where: {
            status,
          },
          include: [
            {
              model: ProductsInCart,
              attributes: {
                exclude: [, "productId", "CartId"],
              },
              include: [
                {
                  model: Product,
                  attributes: ["id", "salePrice", "productName"],
                },
              ],
            },
          ],
        });
        if (cart.length > 0) {
          return res.status(200).send(cart);
        } else {
          return res.status(404).send({
            message: "No se encontro carrito con ese status",
          });
        }
      }
    }
    }else{
      return res.status(400).send({msg:"no se le esta pasando status"})
    }
    
  } catch (error) {
    next(error);
  }
}

module.exports = { getOrderByStatus };

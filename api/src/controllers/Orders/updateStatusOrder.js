const { Cart } = require("../../db");

async function updateStatusOrder(req, res, next) {
  try {
    var { cartId, status } = req.body;

    status = status.toUpperCase();

    if (!cartId || !status) {
      res.status(400).send({ Msge: "Fata algun parametro" });
    }else{
      const cart = await Cart.update(
        { status: status },
        {
          where: {
            id: cartId,
          },
        }
      );
      if (cart[0] === 1) {
        return res.status(200).send({ Msge: "Status Updated" });
      } else {
        return res.status(404).send({ Msge: "No se actualizaron los datos." });
      }
    }

    
  } catch (error) {
    next(error);
  }
}

module.exports = { updateStatusOrder };

const { CartSold } = require("../../db");

async function getOrderByCartId(req, res, next) {
  const { userId } = req.query;

  try {
    if(userId){
      const cart = await CartSold.findAll({
        where: {
          userId: userId,
        },
      });
      if (cart) {
        return  res.status(200).send(cart);
      } else {
        return res.status(404).send("No cart found");
      }
    }else {
      return res.satus(400).send({msg : "no hay UserId"})
    }
    
  } catch (error) {
    return next(error);
  }
}

module.exports = { getOrderByCartId };

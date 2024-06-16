const { User, Product } = require("../../db");

async function removeFavorite(req, res, next) {
  try {
    const { userId, productId } = req.body;
    if(!userId && !productId){
      return res.status(400).send({msg: "no hay userId o ProductId"})
    }else {
      const user = await User.findOne({ where: { id: userId } });
      const product = await Product.findOne({ where: { id: productId } });
  
      await user.removeProduct(product);
  
      return res.status(200).send({ Mge: "Producto eliminado de favoritos" });
    }
   
  } catch (error) {
    next(error);
  }
}

module.exports = { removeFavorite };

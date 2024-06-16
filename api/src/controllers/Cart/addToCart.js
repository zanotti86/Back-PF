const { Cart, Product, ProductsInCart } = require("../../db");

async function addToCart(req, res, next) {
  const { cartId, productId } = req.body;
  try {
    if(cartId && productId){
      const cart = await Cart.findOne({
        where: {
          id: cartId,
        },
      });
      const product = await Product.findOne({
        where: {
          id: productId,
        },
      });
      const productsInCart = await ProductsInCart.findOne({
        where: {
          CartId: cartId,
          productId,
        },
      });
      if (cart && product && !productsInCart) {
        await ProductsInCart.create({
          CartId: cartId,
          productId,
        });
        res.status(200).json({
          message: "Producto agregado al carrito",
        });
      } else {
        res.status(400).json({
          message: "Producto ya agregado al carrito",
        });
      }
    }else{
      return res.status(400).send({msg:"no hay cartId o productId"})
    }
    
  } catch (error) {
    next(error);
  }
}

module.exports = { addToCart };

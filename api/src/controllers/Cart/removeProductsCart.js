const { Cart, Product, ProductsInCart } = require("../../db");

async function removeProductsCart(req, res, next) {
  const { cartId, productId } = req.body;
  try {
    if(cartId && productId ){
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
      console.log(product);
      const productsInCart = await ProductsInCart.findOne({
        where: {
          CartId: cart.id,
          productId: product.id,
        },
      });
      if (cart && product && productsInCart) {
        await productsInCart.destroy(product);
      return  res.status(200).json({
          message: "Producto eliminado del carrito",
        });
      } else {
      return   res.status(404).json({
          message: "Producto no encontrado en el carrito",
        });
      }
    }else{
      return res.satus(400).send({msg: "no hay cartID o ProductID"})
    }
    
  } catch (error) {
    next(error);
  }
}

module.exports = { removeProductsCart };

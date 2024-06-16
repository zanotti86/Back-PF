const { Product, Collection } = require("../../db");

async function createProduct(req, res, next) {
  try {
    const { productName, salePrice, images, description, collection, stock, gender } = req.body;
    if (!productName ||  !salePrice || !images ||  !description ||  !collection || !stock ||  !gender){
      return res.status(400).send({msg: "falta algun campo "})
    }else{
      const newProduct = await Product.create({
        productName,
        salePrice,
        images,
        description,
        stock,
        gender,
      });
      const newCollection = await Collection.findOrCreate({ where: { name: collection } });
  
      await newProduct.setCollection(newCollection[0]);
  
      return res.status(200).json(newProduct);
    }
    
  } catch (err) {
    next(err);
  }
}

module.exports = { createProduct };

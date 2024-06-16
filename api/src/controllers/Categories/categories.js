const { Collection } = require("../../db");
const { getProductsDataBase } = require("../Products/getProductsDataBase");

const gender = async (req, res, next) => {
  try {
    const { gender } = req.query;
    if(gender ){
      let products = await getProductsDataBase();

      if (gender === "All") {
        return res.status(200).send(products);
      }
      if (gender && gender !== "All") {
        const productFound = await products.filter(e => {
          return e.productName.toLowerCase().charAt(0) === gender.toLowerCase().charAt(0);
        });
  
        if (!productFound.length) {
          return res.status(400).send("No se encontraron productos con ese genero");
        } else {
          return res.status(200).send(productFound);
        }
      } else {
        return res
          .status(404)
          .send("There is no product with that collection or the gender was sent incorrectly");
      }
    }else{
      return res.status(400).send({msg: "no hay gender"})
    }
   
  } catch (error) {
    next(error);
  }
};

const collection = async (req, res, next) => {
  try {
    let products = await getProductsDataBase();

    const { collection } = req.query;
    if(collection){
      if (collection === "All") {
        return res.status(200).send(products);
      }
      if (collection && collection !== "All") {
        const productFound = products.filter(e => {
          return e.collection.name.toLocaleLowerCase().includes(collection.toLocaleLowerCase());
        });
  
        if (!productFound.length) {
          return res.status(400).send("No Product Was Found With That Brand");
        } else {
          return res.status(200).send(productFound);
        }
      } else {
        return res
          .status(404)
          .send("There is no product with that collection or the collection was sent incorrectly");
      }
    }else{
      return res.status(400).send({msg:"no hay collection "})
    }
    
  } catch (error) {
    console.log(error);
  }
};

async function collections(req, res, next) {
  try {
    const collections = await Collection.findAll({
      attributes: ["name"],
    });

    if (!collections.length) {
      return res.status(400).send("No hay colecciones disponibles");
    } else {
      return res.status(200).send(collections);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { gender, collection, collections };

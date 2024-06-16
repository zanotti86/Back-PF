const { Collection } = require("../../db");

async function removeCollection(req, res) {
  try {
    const { name } = req.body;
    if(name){
      await Collection.destroy({
        where: {
          name: name,
        },
      });
  
      return res.status(200).send("categoria eliminada");
    }else{
      return res.status(400).send("No hay Name");
    }
    
  } catch (error) {
    console.log(error);
  }
}

module.exports = { removeCollection };

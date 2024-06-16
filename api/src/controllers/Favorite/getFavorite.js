const { User, Product } = require("../../db");

async function getFavorite(req, res, next) {
  try {
    const { userId } = req.query;
    if(userId){
      const user = await User.findOne({
        where: { id: userId },
        attributes: ["id"],
        include: [
          {
            model: Product,
            attributes: ["id", "productName", "salePrice", "images"],
          },
        ],
      });
      return res.status(200).json(user);
    }else {
      return res.status(400).json({msg : " no hay userID"});
    }
   
  } catch (error) {
    next(error);
  }
}

module.exports = { getFavorite };

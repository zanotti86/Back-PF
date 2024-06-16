const server = require("./src/app.js");
const { conn, Product, Collection, User } = require("./src/db.js");
const adidasInfo = require("./src/parseJson/parsejson.js");
require("dotenv").config();

conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT || 3001, async () => {
    console.log("Espere a que se cree la base de datos..");
    console.time("Se creo la base de datos con exito");
    try {
      await createDB();
      console.timeEnd("Se creo la base de datos con exito");
      console.log("%s listening at 3001");
    } catch (error) {
      console.log(error, "No se pudo crear la base de datos ");
    }
  });
});

///create DB from json file
const createDB = async () => {
  const collections = ["ORIGINALS", "CORE / NEO", "SPORT PERFORMANCE"];
  collections.forEach(collection => {
    Collection.create({
      name: collection,
    });
  });
  for (let e of adidasInfo) {
    const { Gender, ProductName, SalePrice, Images, Description, Stock, Collection: category } = e;

    await Product.create({
      gender: Gender,
      productName: ProductName,
      salePrice: SalePrice,
      images: Images, //convertir el texto de Images a un array
      description: Description,
      stock: Stock,
    }).then(async product => {
      await Collection.findOne({ where: { name: category } }).then(collection => {
        product.setCollection(collection);
      });
    });
  }
  //create admin user for testing
  await User.create({
    name: "adminTest",
    lastName: "adminLastname",
    birthDay: "2000-01-01",
    password: "admin",
    gender: "Other",
    type: "Admin",
    email: "admin@email.com",
    address: "Av Libertador",
    cp: "CP1430",
    telephone: 11547894,
  });
};

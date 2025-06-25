const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize("hello_world_db", "root", "Test@1234", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(error => {
    console.error("Unable to connect to the database: ", error);
  });

const Book = sequelize.define("books", {
  title: {
    type: DataTypes?.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes?.STRING,
    allowNull: false,
  },
  release_date: {
    type: DataTypes?.DATE,
  },
  subject: {
    type: DataTypes?.INTEGER,
  },
});

sequelize
  .sync()
  .then(() => {
    //    ----------------successful table creation callback
    // console.log("Book table created successfully!");
    // -----------------------creating data-------------------------------
    // Book.create({
    //   title: "Clean Code",
    //   author: "Robert Cecil Martin",
    //   release_date: "2021-12-14",
    //   subject: 3,
    // })
    //   .then(data => {
    //     console.log("query fetched successfully", JSON.stringify(data, null, 2));
    //   })
    //   .catch(e => {
    //     console.log("error in creating data", JSON.stringify(e, null, 2));
    //   });
    // --------------------------Selecting Data-------------------------
    // Book.findAll()
    //   .then(data => {
    //     console.log("query fetched successfully", JSON.stringify(data, null, 2));
    //   })
    //   .catch(e => {
    //     console.log("error in creating data", JSON.stringify(e, null, 2));
    //   });
    // --------------------Filter data using where----------------------
    // Book.findOne({where: {subject: 2}})
    //   .then(data => {
    //     console.log("query fetched successfully", JSON.stringify(data, null, 2));
    //   })
    //   .catch(e => {
    //     console.log("error in creating data", JSON.stringify(e, null, 2));
    //   });
    // -------------------delete one data--------------------
    // Book.destroy({where: {subject: 3}})
    //   .then(data => {
    //     console.log(
    //       "query fetched successfully",
    //       JSON.stringify(data, null, 2)
    //     );
    //   })
    //   .catch(e => {
    //     console.log("error in creating data", JSON.stringify(e, null, 2));
    //   });
  })
  .catch(error => {
    console.error("Unable to create table : ", error);
  });

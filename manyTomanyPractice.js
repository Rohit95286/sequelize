const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize("student_db", "root", "Test@1234", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected to database successfully");
  })
  .catch(e => {
    console.log(JSON.stringify(e, null, 2), "Error");
  });

const Video = sequelize.define("videos", {
  title: {
    type: DataTypes?.STRING,
  },
});

const Category = sequelize?.define("category", {
  name: {
    type: DataTypes?.STRING,
  },
});

Category.belongsToMany(Video, {
  through: "video_category",
  as: "vid",
  foreignKey: "category_id",
});

Video.belongsToMany(Category, {
  through: "video_category",
  as: "Cat",
  foreignKey: "video_id",
});

sequelize.sync().then(() => {
  Category.findAll({
    include: {
      model: Video,
      as: "vid",
    },
  }).then(data => {
    console.log(
      JSON.stringify(data, null, 2),
      "DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    );
  });
  // Category.create({name: "cat"})
  //   .then(CategoryData => {
  //     Video.create({title: "About cat"})
  //       .then(VideoData => {
  //         CategoryData.addVid(VideoData).then(() => {
  //           console.log("fond on DB");
  //         });
  //       })
  //       .catch(e => {
  //         console.log("error hahah");
  //       });
  //   })
  //   .catch(e => {
  //     console.log("error heheh");
  //   });
});

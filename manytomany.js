const {Sequelize, DataTypes, Op} = require("sequelize");

const sequelize = new Sequelize("student_db", "root", "Test@1234", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("conncted to databse successfully");
  })
  .catch(e => {
    console.log("error in connecting database");
  });

const tutorial = sequelize.define("tutorials", {
  title: {type: DataTypes?.STRING},
  description: {type: DataTypes?.STRING},
});

const tag = sequelize.define("tags", {
  name: {type: DataTypes?.STRING},
});

tag.belongsToMany(tutorial, {
  through: "tutorial_tag",
  as: "tutorial",
  foreignKey: "tag_id",
});

tutorial.belongsToMany(tag, {
  through: "tutorial_tag",
  as: "tages",
  // tutorial-add=>tages || tutorial-get=>tages
  foreignKey: "tutorial_id",
  // real column of the table
});

sequelize.sync({}).then(() => {
  // ================not direct save both and add with as parameter===================
  // tutorial.findOne({where: {id: 2}}).then(tutorialData => {
  //   tag.findOne({where: {id: 1}}).then(tagData => {
  //     tutorialData.addTags(tagData);
  //   });
  // });
  // junction table ---------same for for belongsToMany
  // foriegn key ------------ my tabke name in thisjunction Table
  // as will i add other foreinf key -->  x.addY() ,  as when get also
  // alwayts add saved in DB  not with model name
  // tutorial
  //   .findAll({
  //     include: {
  //       model: tag,
  //       as: "tages",
  //     },
  //   })
  //   .then(data => {
  //     console.log(
  //       JSON.stringify(data, null, 2),
  //       "????===========??==========?????"
  //     );
  //   });
  // tutorial
  //   .bulkCreate([
  //     {title: "a", description: "a"},
  //     {title: "b", description: "b"},
  //     {title: "c", description: "c"},
  //   ])
  //   .then(() => {
  //     tag.bulkCreate([{name: "x"}, {name: "y"}, {name: "z"}]);
  //   });
  // operator
  // tutorial.findAll({where: {id: {[Op.lte]: 2}}}).then(data => {
  //   console.log(JSON.stringify(data, null, 2), "deaaaaaaaaaaaaaattttttt");
  // });
  // tutorial.findAll({where: {[Op.or]: [{id: 1}]}}).then(data => {
  //   console.log(JSON.stringify(data, null, 2), "deaaaaaaaaaaaaaattttttt");
  // });
});

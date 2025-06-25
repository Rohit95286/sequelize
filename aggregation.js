const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize("student_db", "root", "Test@1234", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(e => {
    console.log("error", JSON.stringify(e, null, 2));
  });

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes?.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes?.STRING,
  },
  marks: {
    type: DataTypes?.INTEGER,
  },
});

sequelize.sync({}).then(() => {
  // ------- part 1-------------------
  // console.log("All tables are synced");
  // ------- part 2-------------------
  // Student.bulkCreate([
  //   {
  //     name: "Srajan Kishor Gupta",
  //     marks: 89,
  //   },
  //   {
  //     name: "Kamlendra Kumar Rathour",
  //     marks: 93,
  //   },
  //   {
  //     name: "Nikhil Kumar Singh",
  //     marks: 92,
  //   },
  //   {
  //     name: "Ubaid Ahmed",
  //     marks: 92,
  //   },
  // ]).then(() => {
  //   console.log("Data inserted successfully");
  // });
  // ----------part 3 literals -----------------
  Student.findAll({
    attributes: [[sequelize.fn("SUM", sequelize.col("id")), "sumasVar"]],
    raw: true,
  })
    .then(data => console.log(JSON.stringify(data, null, 2)), "Hellllllllllo")
    .catch(e => {
      console.log(JSON.stringify(e, null, 2), "errrrorrrrrrrrr");
    });
  // ---------- offset and limit----------------------------
  // Student.findAll({
  //   offset: 2,
  //   limit: 2,
  // }).then(data => {
  //   console.log(JSON.stringify(data, null, 2), "offset and limit");
  // });
  //part 4-> group by
  // attributes: ["sum", "array", "name"];
  // group: ["name"];

  // HEllo------------------------

  // Student.findAll({
  //   attributes: ["name", sequelize.fn("SUM", sequelize.col("marks"))],
  //   raw: true,
  //   group: ["name"],
  // }).then(data => {
  //   console.log(JSON.stringify(data, null, 2), "HELLLO");
  // });
});

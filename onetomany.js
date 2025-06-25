const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize("student_db", "root", "Test@1234", {
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

const Student = sequelize.define("students", {
  student_id: {
    type: DataTypes?.UUID,
    primaryKey: true,
    defaultValue: DataTypes?.UUIDV4,
  },
  name: {
    type: DataTypes?.STRING,
    allowNull: false,
  },
});

const Grade = sequelize.define("grades", {
  grade: {type: DataTypes?.INTEGER, allowNull: false},
});

Student.belongsTo(Grade);
Grade.hasMany(Student);

sequelize.sync().then(() => {
  // --------------------------OPERATIONS----------------------------------------
  const grade_data = [{grade: 12}, {grade: 14}, {grade: 15}, {grade: 20}];
  const student_data = [
    {name: "sohan", gradeId: 41},
    {name: "mohan", gradeId: 41},
    {name: "Rohan", gradeId: 43},
    {name: "Ram", gradeId: 44},
  ];

  Grade.bulkCreate(grade_data).then(data => {
    console.log(
      "grade data created successfully",
      JSON.stringify(data, null, 2)
    );
    Student.bulkCreate(student_data).then(() => {
      let data = Grade.findAll({
        include: Student,
      }).then(stud => {
        console.log("including gradeData", JSON.stringify(stud, null, 2));
      });
    });
  });
});

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
sequelize.sync().then(() => {
  // --------------------------OPERATIONS----------------------------------------
  const grade_data = [{grade: 9}, {grade: 10}, {grade: 11}];
  const student_data = [
    {name: "John Baker", gradeId: 2},
    {name: "Max Butler", gradeId: 1},
    {name: "Ryan Fisher", gradeId: 3},
    {name: "Robert Gray", gradeId: 2},
    {name: "Sam Lewis", gradeId: 1},
  ];
  Grade.bulkCreate(grade_data).then(data => {
    // console.log(
    //   "grade data created successfully",
    //   JSON.stringify(data, null, 2)
    // )
    Student.bulkCreate(student_data).then(() => {
      let data = Student.findAll({
        include: Grade,
      }).then(stud => {
        console.log("including gradeData", JSON.stringify(stud, null, 2));
      });
    });
  });
});

// iska matlb h belongs to front key back m dalta h jab ki has key back ka front m
// key waha pe hogi jaha par wo chij birth ni le skti jab tak dusre ka birth naa hua ho.
// Grade ka bith Student k bina ho sakta h but Student ka birth bina Grade k ni ho skta.
// isliye Student m GradeId jaruri h.....................................................

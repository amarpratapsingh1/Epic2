// const sequelize=require("../connections/db")


// const {Sequelize, DataTypes}=require("sequelize");

// const Task= sequelize.define("task",{
//     task:{
//         type:DataTypes.STRING,
//         allowNull:false
//     },
//    completed:{
//     type:DataTypes.BOOLEAN,
//     allowNull:false
//    },
   
// },
// {
//     tableName: 'tasks',
//     timestamps: false,
//   }
// );
// // Task.sync()

const sequelize = require("../connections/db");
const { Sequelize, DataTypes } = require("sequelize");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  task: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: "task",
  },
  completed: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  session_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
},
{
  tableName: 'tasks',
  timestamps: false,
});

module.exports = Task;

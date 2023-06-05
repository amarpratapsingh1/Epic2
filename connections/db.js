const Sequelize= require("sequelize");


const sequelize = new Sequelize(
  'loginuser',//database name
    'root',//user name
    '',//password
    {
      host: 'localhost',
      dialect: 'mysql',
      // logging: false //when query logger in not need
      // logging:console.log
    }
  )
  sequelize.authenticate().then(()=>{
    console.log("database is connected .......")
}).catch(()=>{
    console.log("database is not connected");

})


module.exports=sequelize;


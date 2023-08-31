import dbConfig from "../config/dbConfig.js";
import Sequelize from 'sequelize'

const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host : dbConfig.HOST,
    dialect : dbConfig.dialect,
    define : {timeStamp : false}

})

sequelize.sync().then(()=>{
    console.log('connected to db');
}).catch(err=>{
    console.log('Unable to connect to db',err);
})

const db = {}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default sequelize
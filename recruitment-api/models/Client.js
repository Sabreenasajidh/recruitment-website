import Sequelize from 'sequelize'
import sequelize from './server.js'

let Client = sequelize.define('Client', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone_number: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        isUnique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    vat_status:{
        type: Sequelize.BOOLEAN,
        defaultValue:true,
        
    },
    commercial_reg_no:{
        type: Sequelize.STRING,
        allowNull: true
    },
    company_reg_no:{
        type: Sequelize.STRING,
        allowNull: true
    },
    address:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    sign_details:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    country:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    city:{
        type: Sequelize.STRING,
        allowNull: true,
    }
}, {
    freezeTableName: true
})



export default Client
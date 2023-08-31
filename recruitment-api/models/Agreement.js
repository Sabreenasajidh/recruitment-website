import Sequelize from 'sequelize'
import sequelize from './server.js'
import Client from './Client.js'

let Agreement = sequelize.define('Agreement', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    duration: {
        type: Sequelize.STRING,
        allowNull: true
    },
    fees_structure: {
        type: Sequelize.STRING,
        isIn: [['basic', 'percent']],
        defaultValue: 'basic',
        allowNull: false

    },
    status: {
        type: Sequelize.STRING,
        isIn: [['drafted', 'cancelled', 'confirmed']],
    },
    payment_schedule: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    referal_validity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    sales_person: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    additional_data: {
        type: Sequelize.STRING,
        allowNull: true
    },
    version:{
        type: Sequelize.INTEGER,
        defaultValue:1
    },
    confirmed_date:{
        type:Sequelize.DATE,
        allowNull:true
    }

}, {
    freezeTableName: true
})

Client.hasOne(Agreement, {
    foreignKey: {
        allowNull: false
    }
})
Agreement.belongsTo(Client, {
    //foreignKey : 'client_id',

})


export default Agreement
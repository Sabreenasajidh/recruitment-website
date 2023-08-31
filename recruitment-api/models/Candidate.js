import Sequelize from 'sequelize'
import sequelize from './server.js'

let Candidate = sequelize.define('Candidate', {
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
    role: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    resume: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    status:{
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue:'active',
        isIn: [['active', 'inactive']],
        
    }
}, {
    freezeTableName: true
})



export default Candidate
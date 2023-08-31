import Sequelize from 'sequelize'
import sequelize from './server.js'
import Agreement from './Agreement.js'
import Candidates from './Candidate.js'

let Recruitment = sequelize.define('Recruitment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    jobTitle:{
        type:Sequelize.STRING,
        allowNull:false
    },
    jobDesc:{
        type:Sequelize.STRING,
        allowNull:false
    },
    closingDate:{
        type:Sequelize.DATE,
        allowNull:false
    }
},
{
    freezeTableName: true
})

Agreement.hasMany(Recruitment, {
    foreignKey: {
        allowNull: false
    }
})
Recruitment.belongsTo(Agreement, {
    //foreignKey : 'client_id',

})



export default Recruitment
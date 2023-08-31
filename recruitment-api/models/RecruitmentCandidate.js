import Sequelize from 'sequelize'
import sequelize from './server.js'
import Recruitment from './Recruitment.js'
import Candidates from './Candidate.js'

let RecruitmentCandidate = sequelize.define('RecruitmentCandidate', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    interviewDate:{
        type:Sequelize.DATE,
        allowNull:true
    },
    noticePeriod:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    cv_sentDate:{
        type:Sequelize.DATE,
        allowNull:true
    },
    offerLetter:{
        type:Sequelize.STRING,
        allowNull:true
    },
    recruitment_status:{
        type:Sequelize.STRING,
        allowNull:true
    }
},
{
    freezeTableName: true
})

Candidates.hasMany(RecruitmentCandidate, {
    foreignKey: {
        allowNull: false
    }
})
Recruitment.hasMany(RecruitmentCandidate,{
    foreignKey: {
        allowNull: false
    }
})
RecruitmentCandidate.belongsTo(Candidates, {
    //foreignKey : 'client_id',

})
RecruitmentCandidate.belongsTo(Recruitment, {
    //foreignKey : 'client_id',

})



export default RecruitmentCandidate
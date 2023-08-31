import RecruitmentCandidate from '../models/RecruitmentCandidate.js';
import Candidate from '../models/Candidate.js';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;


const addRecruitmentCandidate = async (req, res) => {
    try {
        let a1 = []
        let a2 = []
        const { data, id } = req.body
        // console.log(data);
        const getDetails = await RecruitmentCandidate.findAll({ where: { RecruitmentId: id }, attributes: ['CandidateId', 'RecruitmentId'] })
        console.log(getDetails);
        if (getDetails.length) {

            const arrayOne = getDetails
            const arrayTwo = data

            if (arrayTwo.length > arrayOne.length) {
                console.log("here");
                a1 = arrayTwo
                a2 = arrayOne
            }
            else {
                console.log("yyyyy");
                a1 = arrayOne
                a2 = arrayTwo
            }


            const results = a1.filter(({ CandidateId: id1 }) => !a2.some(({ CandidateId: id2 }) => id2 === id1));
            console.log(results);

            if (results.length) {

                results.map(async x => {
                    const tt = await RecruitmentCandidate.findOne({ where: { CandidateId: x.CandidateId, RecruitmentId: x.RecruitmentId } })
                    if (tt)
                        await RecruitmentCandidate.destroy({ where: { RecruitmentId: id, CandidateId: x.CandidateId } })
                })
            }

        }
        const tt = data.map(async x => {
            const checkExist = await RecruitmentCandidate.findOne({ where: { RecruitmentId: id, CandidateId: x.CandidateId } })
            if (!checkExist) return await RecruitmentCandidate.create(x)
        })


        res.send({ data: 'Candidates created Successfully' })
        // else throw ({ error: 'Something went wrong' })

    } catch (e) {
        console.log(e);
        return res.json(e)
    }
}

const getCandidates = async (req, res) => {
    try {
        const id = req.params.id
        //select all candidates where candidate candidateId not exist in recruitmentCandidate table
        const getCandidates = await Candidate.findAll({
            include: [RecruitmentCandidate]
        })
        const filteredCandidate = getCandidates.filter(candidate => candidate.RecruitmentCandidates.length ===0);
        //console.log(getCandidates);
        const getSelectedCandidates = await Candidate.findAll({
            include: [{model:RecruitmentCandidate,where:{RecruitmentId:id}}]
        })
        console.log(filteredCandidate);
       // const existingCandidates = getCandidates.filter(candidate => candidate.RecruitmentCandidates.length !==0);
        if (getCandidates) res.send({ filteredCandidate,existingCandidates:getSelectedCandidates})
        else throw ({ error: 'No data' })

    } catch (e) {
        console.log(e);
        return res.json(e)
    }
}

const updateRecruitmentCandidates = async (req, res) => {
    try {
        if (req.file && req.file.path) req.body.offerLetter = req.file.path

        const id = req.query.id
        console.log(req.body, id);
        const updateDet = await RecruitmentCandidate.update(
            req.body,
            { where: { CandidateId: req.body.CandidateId, RecruitmentId: id } }
        )
        if (updateDet) return res.status(200).json({ data: "Updated suuccessfully" })
        else throw ({ error: 'Error' })

    } catch (e) {
        return res.json(e)

    }
}

const getRecruitmentCandidate = async (req, res) => {
    try {
        const RecruitmentId = req.params.id1
        const CandidateId = req.params.id

        const getInfo = await RecruitmentCandidate.findOne({ where: { RecruitmentId, CandidateId } })
        if (getInfo) return res.status(200).json({ data: getInfo })
        else throw ({ error: 'No data' })

    } catch (e) {
        console.log(e);
        return res.json(e)

    }

}
const getSingleRecruitment = async (req, res) => {
    try {

        console.log(req.params.id);
        // const getData = await RecruitmentCandidate
    } catch (e) {
        console.log(e);
        return res.json(e)
    }

}
export default { addRecruitmentCandidate, getCandidates, updateRecruitmentCandidates, getRecruitmentCandidate, getSingleRecruitment }
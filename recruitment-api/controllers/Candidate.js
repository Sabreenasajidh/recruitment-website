import Candidate from '../models/Candidate.js'
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

const addCandidate = async (req, res, err) => {

    try {

        const { body } = req
        const checkUser = await Candidate.findOne({ where: { email: body.email } });
        if (checkUser) throw { status: 400, error: 'Email Id already exist', };
        else {
            const reqData = ['name', 'email', 'phone_number']
            reqData.forEach(element => {
                if (!body[element] || body[element] === null)
                    throw { status: 404, error: `${element} Missing` };
            });
            if (req.file && req.file.path) body.resume = req.file.path

            const addCandidate = await Candidate.create(body)
            if (addCandidate) return res.status(200).json({ data: 'candidate added Suceesfully' });
            else throw ({ status: 400, error: 'Not Added to DB' })

        };

    } catch (e) {
        console.log(e);
        return res.status(e.status).json({ error: e.error })

    }


}
const listCandidate = async (req, res) => {
    try {
        const searchdata = req.query.searchdata
        let where_con = {}

        if (searchdata && searchdata != '') {
            where_con[Op.or] = {

                email: {
                    [Op.like]: '%' + searchdata + '%'
                },
                name: {
                    [Op.like]: '%' + searchdata + '%'
                }
            }
        }
        const candidateList = await Candidate.findAll({ where: where_con })

        if (candidateList) {
            const candidates = candidateList.map(elem => {
                return {
                    id: elem.id,
                    email: elem.email,
                    name: elem.name,
                    phone_number: elem.phone_number,
                    status: elem.status,
                    role: elem.role
                }
            })
            return res.json(candidates)
        }

    } catch (e) {
        return res.json(e)
    }
}
const getCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findOne({ where: { id: req.params.id } })

        if (candidate) {
            const candidateData = {
                name: candidate.name,
                phone_number: candidate.phone_number,
                role: candidate.role,
                email: candidate.email,
                status: candidate.status,
                resume: candidate.resume
            }
            return res.status(200).json(candidateData)
        }
        else throw ({ status: 400, error: 'No data found' })
    } catch (e) {
        return res.status(e.status).json({ error: e.error })
    }

}
const editCandidate = async (req, res) => {
    try {
        const id = req.params.id
        let data = req.body
        const candidate = await Candidate.findOne({ where: { id: id } })
        if (candidate) {
            const email_exist = await Candidate.findOne({
                where: {
                    email: data.email,
                    id: { [Op.ne]: id }
                }
            })
            if (email_exist) throw { status: 400, error: `Email already exist` }
            if (req.file && req.file.path) data.resume = req.file.path

            const candidateUpdate = await Candidate.update(
                data,
                { where: { id: req.params.id } }
            );
            return res.status(200).json({ data: "Candidate updated suuccessfully" })

        }
        else throw ({ status: 400, error: `Candidate doesn't exist` })
    } catch (e) {
        console.log(e);
        res.json({ error: e.error })
    }

}
const updateCandidates = async (req, res) => {
    try {
        const id = req.query.id
        const candidates = req.body
        const candidatesList = candidates.map(x => {
            return x.id
        })
        console.log(candidatesList);
        const test = await Candidate.findAll()
        //console.log(test);

        const testId = test.filter(({ id }) => !candidates.some(x => x.id == id))
        if (testId.length) {
            testId.map(async x => {
               
                await Candidate.update({ RecruitmentId: null },
                    { where: { id: x.id } }
                )
            })
        }
        // console.log(
        // test.filter(x=>!candidatesList.find(({ id }) => x.id === id)))

        candidatesList.map(async x => {
            await Candidate.update({ RecruitmentId: id },
                { where: { id: x } }
            )
        })
        return res.status(200).json({ data: "Candidate updated suuccessfully" })
        // else throw ({ status: 400, error: `Something went wrong` })
    }
    catch (e) {
        console.log(e);
        res.json({ error: e.error })

    }

}
export default { addCandidate, listCandidate, getCandidate, editCandidate, updateCandidates }
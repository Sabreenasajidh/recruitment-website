import recruitmentModel from '../models/Recruitment.js'
import Agreement from '../models/Agreement.js'
import RecruitmentCandidate from '../models/RecruitmentCandidate.js';
import Client from '../models/Client.js';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
const addRecruitment = async (req, res) => {
    try {
        let { body } = req
        const reqData = ['name', 'jobTitle', 'jobDesc', 'closingDate']
        reqData.forEach(element => {
            if (!body[element] || body[element] === null)
                throw { status: 404, error: `${element} Missing` };
        });
        const response = await recruitmentModel.create(body)
        if (response) res.send({ data: 'Recruitment created Successfully' })
        else throw { status: 404, error: `Not Added to Db.Something went wrong!` };

    } catch (e) {
        console.log(e);
        return res.json(e)
    }


}
const getRecruitments = async (req, res) => {
    try {
        console.log(req.query, "---------------");
        const searchdata = req.query.searchdata
        let where_con = {}
        let where_con1 = {}

        if (searchdata && searchdata != '') {
            where_con[Op.or] = {
                name: {
                    [Op.like]: '%' + searchdata + '%'
                }
            }
        }
        const recruitmentList = await recruitmentModel.findAll({
            where: where_con,
            // include: [
            //     { model: Client, where: where_con,attributes: ['name','country','city','address'] }
            // ]
        })
        if (recruitmentList) res.send({ data: recruitmentList })

        else throw ({ error: 'No agreements to display' })
    }
    catch (e) {
        console.log(e);
        return res.json(e)
    }
}
const getSingleRecruitment = async (req, res) => {
    try {
        const id = req.params.id
        const getData = await recruitmentModel.findOne({
            where: { id: id },
            include: [{ model: Agreement, attributes: ['sales_person'], include: [{ model: Client }] }]
        })
        if (getData) res.send({ data: getData })
        else throw ({ error: 'No recruitment exist' })

    } catch (e) {
        console.log(e);
        return res.json(e)
    }

}
const updateRecruitment = async (req, res) => {
    try {
        const id = req.query.id
        const op = await recruitmentModel.update(req.body, { where: { id: id } })
        if (op) {
            res.send({ data: "Updated Successfully" })
        } else throw ({ error: 'Something went wrong' })
    } catch (e) {
        console.log(e);
        return res.json(e)
    }
}


export default {
    addRecruitment, getRecruitments, getSingleRecruitment,
    updateRecruitment
}
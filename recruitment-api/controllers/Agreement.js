// 1. Client - Dropdown of client name
// 2. Duration of the Agrement - Number
// 3. Fees Structure - Dropdown percent, basic
// 4. Payment Schedule (in Days) - Number

// 5.  Status - Dropdown (Drafted,Cancelled,Generated ,Confirmed)



// Capture only in DB

// Created  date - timestamp
// Confirmed date - timestamp (date when status become confirmed)

// Default values:

// Status - Drafted

import agreementModel from "../models/Agreement.js";
import Client from "../models/Client.js";
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

const addAgreement = async (req, res) => {
    try {

        let { body } = req
        const reqData = ['ClientId','duration','fees_structure','payment_schedule','referal_validity','sales_person','status']
        reqData.forEach(element => {
            if (!body[element] || body[element] === null)
                throw { status: 404, error: `${element} Missing` };
        });
        const clientId = parseInt(body.ClientId)
        const clientVal = await agreementModel.findOne({ where: { ClientId: clientId } })

        if (clientVal) throw ({ error: `Agreement already exist with client` })
        else {
            body.ClientId = clientId
            body.sales_person = parseInt(body.sales_person)
            body.referal_validity = parseInt(body.referal_validity)
            console.log(body);
            await agreementModel.create(body)

            res.send({ data: 'Agreement created Successfully' })

        }
    } catch (e) {
        console.log(e);
        return res.send(e)
    }

}
const listAgreements = async (req, res) => {
    try {
        const searchdata = req.query.searchdata
        console.log(req.query.searchdata,"----------");
        let where_con = {}
        let where_con1 = {}

        if (searchdata && searchdata != '') {
            where_con[Op.or] = {
                name: {
                    [Op.like]: '%' + searchdata + '%'
                }
            }

            // where_con1[Op.or] = {
            //     status: {
            //         [Op.like]: '%' + searchdata + '%'
            //     },
            // }
        }
        const listAgreement = await agreementModel.findAll({
            where: where_con1,
            include: [
                { model: Client, where: where_con,attributes: ['name','country','city','address'] }
            ]
        })
       // console.log("uuuuuuuuuuuuu", listAgreement);
        if (listAgreement) res.send({ data: listAgreement })

        else throw ({ error: 'No agreements to display' })

    } catch (e) {
        res.send(e.error)
    }


}
const getAgreement = async (req, res) => {
    try {
        const id = req.params.id;
        const getData = await agreementModel.findOne({
            where: { id: id },
            include: [{ model: Client, attributes: ['name'] }]
        })
        if (getData) res.send({ data: getData })
        else throw ({ error: 'No agrrement exist' })

    } catch (e) {
        console.log(e);
        res.send(e)
    }

}
const updateAgreement = async (req, res) => {
    try {
        // console.log(req.body,req.query.id);
        const id = req.query.id
        const { body } = req
        const getData = await agreementModel.findOne({ where: { id: id } })
       
        if (body.status === 'confirmed') body.confirmed_date = new Date();
        body.version = getData.version+1;
        console.log(body);
        if (getData) {
            await agreementModel.update(body,
                { where: { id: id } }
            )
            return res.status(200).json({ data: "Candidate updated suuccessfully" })
        }
        else throw { error: "Updation failed" }
    } catch (e) {
        console.log(e);
        res.send(e.error)
    }


}
export default { addAgreement, listAgreements, getAgreement, updateAgreement }
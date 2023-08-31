import Client from '../models/Client.js'
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

const addClient = async (req, res) => {
    try {
        const { body } = req
        const reqData = ['name', 'phone_number', 'email']
        reqData.forEach(element => {
            if (!body[element] || body[element] === null)
                throw { status: 404, error: `${element} Missing` };
        });

        const checkClient = await Client.findOne({ where: { email: body.email } });
        if (checkClient) throw { status: 400, error: 'Email Id already exist', };

        const company_reg_no = body.company_reg_no ? body.company_reg_no : null
        const commercial_reg_no = body.commercial_reg_no ? body.commercial_reg_no : null

        body.company_reg_no = company_reg_no
        body.commercial_reg_no = commercial_reg_no
        console.log(body);
        const addClient = await Client.create(body)

        if (addClient) return res.status(200).json({ data: 'Client added Suceesfully' });
        else throw ({ status: 400, error: 'Not Added to DB' })

    } catch (e) {
        return res.json(e)
    }

}
const listClient = async (req, res) => {
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
        console.log(where_con);
        const clientList = await Client.findAll({ where: where_con })
        if (clientList) {
            const client = clientList.map(elem => {
                return {
                    id: elem.id,
                    email: elem.email,
                    name: elem.name,
                    phone_number: elem.phone_number,
                    vat_status: elem.vat_status,
                    commercial_reg_no: elem.commercial_reg_no,
                    company_reg_no: elem.company_reg_no,
                    address: elem.address
                }
            })
            return res.json(client)
        }

    } catch (e) {
        return res.json(e)
    }

}
const getClient = async (req, res) => {
    try {
        const client = await Client.findOne({ where: { id: req.params.id } })

        if (client) return res.status(200).json(client)

        else throw ({ status: 400, error: 'No data found' })
    } catch (e) {
        return res.status(e.status).json({ error: e.error })
    }

}
const editClient = async (req, res) => {
    try {
        const id = req.params.id
        let { body } = req

        const client = await Client.findOne({ where: { id: id } })
        if (client) {
            const email_exist = await Client.findOne({
                where: {
                    email: body.email,
                    id: { [Op.ne]: id }
                }
            })
            if (email_exist) throw { status: 400, error: `Email already exist` }
            

            const company_reg_no = body.company_reg_no ? body.company_reg_no : null
            const commercial_reg_no = body.commercial_reg_no ? body.commercial_reg_no : null

            body.company_reg_no = company_reg_no
            body.commercial_reg_no = commercial_reg_no

            await Client.update(
                body,
                { where: { id: req.params.id } }
            );
            return res.status(200).json({ data: "Client updated suuccessfully" })

        }
        else throw ({ status: 400, error: `Client doesn't exist` })
    } catch (e) {
        console.log(e);
        res.json({ error: e.error })
    }

}
const getClientNames = async(req,res)=>{
    try{
        console.log("here");
        const names = await Client.findAll({
            attributes: ['name','id']
          })
          console.log(names);

         return res.send(names)

    }
    catch(e){
        console.log(e);
        return res.send(e)
    }
}
export default { addClient, editClient, getClient, listClient,getClientNames }
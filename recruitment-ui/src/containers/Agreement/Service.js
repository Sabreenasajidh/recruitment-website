import { api } from "../helpers/axios"

// const fetchClientNames = async () => {
//     await api().get('/api/client/names').
//         then(res => { return res}).
//         catch(e => {return e })
// }

const fetchClientNames = async () => {
    const result = await api().get('/api/client/names')
        .then(res => { return res })
        .catch(err => { return err })
    return result

}
const postAgreement = async (data) => {
    const result = await api().post('/api/agreement', data)
        .then(res => { return res })
        .catch(err => { return err })
    return result
}
const ListAgreement = async (query) => {
    const result = await api().get(`/api/agreement/?${query}`)
        .then(res => { return res })
        .catch(err => { return err })
    return result
}
const getAgreement = async (id) => {
    const result = await api().get(`/api/agreement/${id}`)
        .then(res => { return res })
        .catch(err => { return err })
    return result

}
const updateAgreement = async (data) => {
    console.log(data);
    const result = await api().put(`/api/agreement/?id=${data.id}`, data)
        .then(res => { return res })
        .catch(err => { return err })
    return result
}
const updateStatusAgreement = async (info) => {
    const { id, status } = info
    console.log(id);
    const result = await api().put(`/api/agreement/?id=${id}`, info)
        .then(res => { return res })
        .catch(err => { return err })
    return result
}

export default { fetchClientNames, postAgreement, ListAgreement, getAgreement, updateAgreement, updateStatusAgreement }
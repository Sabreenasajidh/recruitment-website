import {api} from '../helpers/axios'
const addClient = async (data) => {
  const result = api().post('/api/client', data, {
  }).then(res => { return res })
    .catch(err => { return err })
  return result

}
const listClient = async (data) => {
  const result = api().get(`/api/client/?${data}`)
    .then(res => { return res })
    .catch(err => { return err })
  return result

}
const getClient = async (id) => {
  const result = api().get(`/api/client/${id}`)
    .then(res => { return res })
    .catch(err => { return err })
  return result

}
const updateClient = async (data) => {
  const { value, id } = data
  const result = await api().put(`/api/client/${id}`, value, {
  })
    .then(res => { return res })
    .catch(err => { return err })
  return result

}
// eslint-disable-next-line import/no-anonymous-default-export
export default { addClient, listClient, getClient, updateClient }
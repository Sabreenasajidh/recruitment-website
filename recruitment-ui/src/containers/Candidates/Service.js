import { api, newApi } from '../helpers/axios'
const addCandidate = async (data) => {
  const result = newApi().post('/api/candidate', data)
    .then(res => { return res })
    .catch(err => { return err })
  return result

}

const listCandidate = async (data) => {
  const result = api().get(`/api/candidate/?${data}`)
    .then(res => { return res })
    .catch(err => { return err })
  return result

}
const getCandidate = async (id) => {
  const result = api().get(`/api/candidate/${id}`)
    .then(res => { return res })
    .catch(err => { return err })
  return result

}
const updateCandidate = async (data) => {
  const { value, id } = data
  console.log(value);
  const result = newApi().put(`/api/candidate/${id}`, value, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then(res => { return res })
    .catch(err => { return err })
  return result

}

// eslint-disable-next-line import/no-anonymous-default-export
export default { addCandidate, listCandidate, getCandidate, updateCandidate }

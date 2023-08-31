import { api, newApi } from '../helpers/axios'

const newRecruitment = async (data) => {
    console.log(data);
    const result = await api().post('/api/recruitment', data)
        .then(res => { return res })
        .catch(err => { return err })
    return result

}
const getRecruitments = async (query) => {
    const result = await api().get(`/api/recruitment/?${query}`)
        .then(res => { return res })
        .catch(err => { return err })
    return result
}
const getSingleRecruitment = async (id) => {
    const result = await api().get(`/api/recruitment/${id}`)
        .then(res => { return res })
        .catch(err => { return err })
    return result
}
const updateRecruitment = async (data) => {
    // console.log(data);
    console.log(data);
    const { values, id } = data
    let uid = new URLSearchParams({ id: id }).toString();
    const result = await api().put(`/api/recruitment/?${uid}`, values)
        .then(res => { return res })
        .catch(err => { return err })
    return result

}


const newRecruitmentCandidate = async (data) => {
    console.log(data);
    const result = await api().post(`/api/recruitment-candidates`, data)
        .then(res => { return res })
        .catch(err => { return err })
    return result
}
const getRecruitmentCandidates = async (id) => {
    const result = await api().get(`/api/recruitment-candidates/candidates/${id}`)
        .then(res => { return res })
        .catch(err => { return err })
    return result
}
const updateReacruitmentCanddates = async (data) => {
    const { id, filterValues } = data
    let uid = new URLSearchParams({ id: id }).toString();
    const result = newApi().put(`/api/recruitment-candidates/?${uid}`, filterValues, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
        .then(res => { return res })
        .catch(err => { return err })
    return result
}
const getRecruitmentCandInfo = async (data) => {
    const { RecruitmentId, CandidateId } = data
    const result = await api().get(`/api/recruitment-candidates/${RecruitmentId}/${CandidateId}`)
        .then(res => { return res })
        .catch(err => { return err })
    return result
}
const getSingleRecruitmentInfo = async(id) =>{
    const result = await api().get(`/api/recruitment-candidates/${id}`)
        .then(res => { return res })
        .catch(err => { return err })
    return result
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    newRecruitment, getRecruitments, getSingleRecruitment, updateRecruitment,
    newRecruitmentCandidate,
    getRecruitmentCandidates, updateReacruitmentCanddates, getRecruitmentCandInfo,getSingleRecruitmentInfo
}
import service from './Service'
const Recruitment = {
    state: { recruitment: [] }, // initial state
    reducer: {
        RECRUITMENT: (state, data) => {

            return {
                ...data,recruitment:data
            };
        },
    },
    effects: {
        async AddNewRecruitment(data) {
            const postRecruitment = await service.newRecruitment(data)
            return postRecruitment
        },
        async ListRecruitments(query){
            const response = await service.getRecruitments(query)
            if (response.data) return response.data
            else   return response
        },
        async getRecruitment(id){
            console.log(id);
            const response = await service.getSingleRecruitment(id)
            if (response.data) return response.data
            else   return response
        },
        async UpdateRecruitment(data){
            const response = await service.updateRecruitment(data)
            if (response.data) return response.data
            else   return response
        },
        async createRecruitmentCandidate(data){
            const response = await service.newRecruitmentCandidate(data)
            console.log(response);
            if (response.data) return response.data
            else   return response
        },
        async getCandidates (id){
            const response = await service.getRecruitmentCandidates(id)
            if (response.data) return response.data
            else   return response
        },
        async updateCanidate (data){
            const response = await service.updateReacruitmentCanddates(data)
            if (response.data) return response.data
            else   return response
        },
        async getRecruitmentCandidate(status){
            const response = await service.getRecruitmentCandInfo(status)
            if (response.data) return response.data
            else   return response
            
        },
        async getSingleRecruitment(id){
            const response = await service.getSingleRecruitmentInfo(id)
            if (response.data) return response.data
            else   return response
        }
        

    }
}
export default Recruitment
import service from './Service';
const Candidate = {
    state: { candidate: [] }, // initial state
    reducer: {
        CANDIDATE: (state, data) => {

            return {
                ...data
            };
        },
    },
    effects: {
        async addCandidate(data) {
            const response = await service.addCandidate(data)

            if (response.data) {
               // toaster.successToast(response.data.data)
                return response.data
            }
            else {
                //toaster.errorToast(response.response.data.error)
                return response.response.data
                //return response
            }

        },
        async ListCandidate(query) {
            const response = await service.listCandidate(query)
            return response.data

        },
        async getCandidate(id) {
            const response = await service.getCandidate(id)
            if (response.data) {
               //this.CANDIDATE(response.data);

                return response.data
            }
        },
        async updateCandidate(data){
            const response = await service.updateCandidate(data)
            if (response.data) {
                // toaster.successToast(response.data.data)
                 return response.data
             }
             else {
                 //toaster.errorToast(response.response.data.error)
                 return response.response.data
                 //return response
             }
        }

    }

}
export default Candidate
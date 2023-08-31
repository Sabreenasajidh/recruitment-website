import service from './Service'
const Agreement = {
    state: { agreement: [] }, // initial state
    reducer: {
        AGREEMENT: (state, data) => {

            return {
                ...data,agreement:data
            };
        },
    },
    effects: {
        async getClientsNames() {
            const fetchNames = await service.fetchClientNames()
            return fetchNames
        },
        async createAgreemant(data) {
            const response = await service.postAgreement(data)
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
        async ListAgreements(query) {
            const response = await service.ListAgreement(query)
            if (response.data) {
                // toaster.successToast(response.data.data)
                return response.data
            }
            else {
                //toaster.errorToast(response.response.data.error)
                return response
                //return response
            }
        },
        async getAgreement(id) {
            const response = await service.getAgreement(id)
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
        async editAgreement(data) {
            const response = await service.updateAgreement(data)
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
        async updateStatusAgreement(data){
            console.log(data);
            const response = await service.updateStatusAgreement(data)
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
export default Agreement
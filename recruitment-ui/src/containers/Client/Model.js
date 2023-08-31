import service from './Service';
const Client = {
    state: { client: [] }, // initial state
    reducer: {
        CLIENT: (state, data) => {

            return {
                ...data
            };
        },
    },
    effects: {
        async addClient(data) {
            //console.log(data);
            const response = await service.addClient(data)
            
            if (response.data) {
               // toaster.successToast(response.data.data)
                return response.data
            }
            else {
                //toaster.errorToast(response.response.data.error)
                return response
                //.response.data
                //return response
            }

        },
        async ListClient(query) {
            const response = await service.listClient(query)
            return response.data

        },
        async getClient(id) {
            const response = await service.getClient(id)
            if (response.data) {
               //this.CANDIDATE(response.data);

                return response.data
            }
        },
        async updateClient(data){
            const response = await service.updateClient(data)
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
export default Client
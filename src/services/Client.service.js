import axios from   "axios";
class ClientService{
async  fetchUsers(){
    const cancelTokenSource = axios.CancelToken.source();

    const data= await  axios.get(`https://jsonplaceholder.typicode.com/users`,{
        cancelToken: cancelTokenSource.token
        })
        .then(({data})=>data)
    cancelTokenSource.cancel();
    return await data;
    }
    async  fetchUser(id){
        const cancelTokenSource = axios.CancelToken.source();
    
        const data= await  axios.get(`https://jsonplaceholder.typicode.com/users/`+id,{
            cancelToken: cancelTokenSource.token
            })
            .then(({data})=>data)
        cancelTokenSource.cancel();
        return await data;
    }
    
}

export default new ClientService();
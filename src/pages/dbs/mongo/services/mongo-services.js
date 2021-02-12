import Config from '../../../../config';

const MongoServices = {
    create: async function () {
        let result = await fetch(`${Config.API_URL}/mongo-restful`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: "new name", color: "purple"})
        })

        return result.ok ? await result.json() : result.ok ; 
    },
    delete: async function (id) {
        let result = await fetch(`${Config.API_URL}/mongo-restful`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })

        return result.ok ? await result.json() : result.ok ; 
    },
    edit: async function (obj) {
        let result = await fetch(`${Config.API_URL}/mongo-restful`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })

        return result.ok ? await result.json() : result.ok ; 
    },
    deleteAll: async function () {
        let result = await fetch(`${Config.API_URL}/mongo-restful/delete-all`, {
            method: "DELETE"
        })

        return result.ok ? await result.json() : result.ok ; 
    }
}


export default MongoServices;
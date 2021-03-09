import Config from '../../../../config';

const AWSCORSServices = {
    testEndpoint: async function () {
        try {
            let result = await fetch(`${Config.AWS_ENDPOINT}/test-endpoint`, {
                method: "GET"
            })
            return await result.json();
        } catch (e) {
            return 'problem'
        }
    },
    dbConnect: async function () {
        try {
            let result = await fetch(`${Config.AWS_ENDPOINT}/dbconnect`, {
                method: "GET",
                headers: {
                'Content-Type': 'application/json',
                },
            })
            return await result.json();
        } catch (e) {
            return 'problem'
        }
    },
    specifiedOrigin: async function () {
        try {
            let result = await fetch(`${Config.AWS_ENDPOINT}/db-connect-with-specified-origin`, {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            },
            })
            return await result.json();
        } catch (e) {
            return 'problem'
        }
    },
    withMiddleware: async function () {
        try {
            let result = await fetch(`${Config.AWS_ENDPOINT}/db-connect-with-middleware`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
           return await result.json();

        } catch (e) {
            return 'problem'
        }
    },
    multipleOrigins: async function () {
        try {
            let result = await fetch(`${Config.AWS_ENDPOINT}/db-connect-with-multiple-origins-and-db-call`, {
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
            },
            })
            return await result.json();
        } catch (e) {
            return 'problem'
        }
    }
}
export default AWSCORSServices;

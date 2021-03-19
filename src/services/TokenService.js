const TokenService = {
    setToken (token) {
        localStorage.setItem('token',token);
    },
    getToken (token) {
        return localStorage.getItem('token');
    },
    deleteToken () {
        localStorage.removeItem('token');
    }


}

export default TokenService;
const TokenService = {
    setToken (token) {
        localStorage.setItem('token',token);
    },
    deleteToken () {
        localStorage.removeItem('token');
    }


}

export default TokenService;
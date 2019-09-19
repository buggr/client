class Auth {
    set userData(data){
        const encodedData = btoa(JSON.stringify(data))
        localStorage.setItem('userData', encodedData)
    }
    
    get userData(){
        return JSON.parse(atob(localStorage.getItem('userData')))
    }
}

export default new Auth
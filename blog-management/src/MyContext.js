import {createContext, useEffect, useState} from "react";

export const MyContext = createContext({})
const MyContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false)
    const [currentUser, setCurrentUser] = useState({username:''})
    const [isLike, setIsLike] = useState(false);
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('dataLogin'))
        if (data){
            setIsLogin(true)
        }else {
            setIsLogin(false)
        }
    }, []);
    const login = (data) => {
        localStorage.setItem('dataLogin', JSON.stringify(data))
        setIsLogin(true)
    }
    const logout = ()=>{
        localStorage.removeItem('dataLogin');
        setIsLogin(false)
        setIsLike(false)
    }
    return(
        <MyContext.Provider value={{isLogin, login, logout, currentUser, setCurrentUser, isLike, setIsLike}}>
            {children}
        </MyContext.Provider>
    )
}
export default MyContextProvider
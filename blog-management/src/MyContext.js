import { createContext, useEffect, useState } from "react";

export const MyContext = createContext({});
const MyContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [currentUser, setCurrentUser] = useState({ username: '' });
    const [likes, setLikes] = useState({});
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('dataLogin'));
        if (data) {
            setIsLogin(true);
            setCurrentUser(data);
            
            const storedLikes = JSON.parse(localStorage.getItem(`likes_${data.username}`));
            if (storedLikes) {
                setLikes(storedLikes);
            } else {
                setLikes({}); // Nếu không có, reset về {}
            }
        } else {
            setIsLogin(false);
            setCurrentUser({ username: '' });
        }
    }, []);
    
    useEffect(() => {
        if (currentUser.username) {
            localStorage.setItem(`likes_${currentUser.username}`, JSON.stringify(likes));
        }
    }, [likes, currentUser.username]);
    
    const login = (data) => {
        localStorage.setItem('dataLogin', JSON.stringify(data));
        setIsLogin(true);
        setCurrentUser(data);
        
        const storedLikes = JSON.parse(localStorage.getItem(`likes_${data.username}`));
        if (storedLikes) {
            setLikes(storedLikes);
        } else {
            setLikes({});
        }
    };
    
   
    const logout = () => {
        localStorage.removeItem('dataLogin');
        setIsLogin(false);
        setLikes({});
        setCurrentUser({ username: '' });
    };
    const removeLike = (postId) => {
        const updatedLikes = { ...likes };
        delete updatedLikes[postId];
        setLikes(updatedLikes);
        localStorage.setItem(`likes_${currentUser.username}`, JSON.stringify(updatedLikes));
    };
    return (
        <MyContext.Provider value={{ isLogin, login, logout, currentUser, setCurrentUser, likes, setLikes, removeLike }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContextProvider;

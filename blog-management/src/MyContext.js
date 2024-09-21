import {createContext, useEffect, useRef, useState} from "react";
import axios from "axios";

export const MyContext = createContext({});

const MyContextProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState(false);
    const [currentUser, setCurrentUser] = useState({username: ''});
    const [likes, setLikes] = useState({});
    const intervalId = useRef(null)
    const [searchResults, setSearchResults] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    
    const getDataLike = () => {
        if (currentUser.username) {
            axios.get(`http://localhost:3000/likes`)
                .then(res => {
                    const dataLikesByUser = res.data.filter((like) => like.username === currentUser.username);
                    const dataLike = dataLikesByUser.reduce((acc, like) => {
                        acc[like.idPost] = true;
                        console.log(acc)
                        return acc;
                    }, {});
                    setLikes(dataLike);
                })
                .catch(err => console.error('Error fetching likes:', err));
        }
    }
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('dataLogin'));
        if (data && data.username) {
            setIsLogin(true);
            setCurrentUser(data);
        } else {
            setIsLogin(false);
            setCurrentUser({username: ''});
        }
    }, []);
    useEffect(() => {
        if (isLogin && currentUser.username) {
            getDataLike();
            
            
            intervalId.current = setInterval(() => {
                getDataLike();
            }, 5000)
        }
        
        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
                intervalId.current = null;
            }
        }
    }, [isLogin, currentUser.username]);
    const login = (data) => {
        localStorage.setItem('dataLogin', JSON.stringify(data));
        setIsLogin(true);
        setCurrentUser(data);
    };
    
    const logout = () => {
        localStorage.removeItem('dataLogin');
        setIsLogin(false);
        setLikes({});
        setCurrentUser({username: ''});
    };
    const removeLike = (idPost) => {
        setLikes(prevLikes => {
            const updatedLikes = {...prevLikes};
            delete updatedLikes[idPost];
            return updatedLikes;
        });
    };
    return (
        <MyContext.Provider value={{
            isLogin,
            login,
            logout,
            currentUser,
            setCurrentUser,
            likes,
            setLikes,
            removeLike,
            searchResults,
            setSearchResults, showSearch, setShowSearch
        }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContextProvider;

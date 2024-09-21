import {Link, useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {MyContext} from "../MyContext";
import Search from "../Pages/Search";
import SearchIcon from "../Icon/SearchIcon";

export default function Header(){
    const navigate = useNavigate();
    const {isLogin, logout} = useContext(MyContext)
    // const [showSearch, setShowSearch] = useState(false);
    const {showSearch, setShowSearch} = useContext(MyContext)
    const searchRef = useRef(null);
    const clickLogout =() =>{
        logout();
        navigate('/');
    }
    
    const clickSearch = ()=>{
        setShowSearch(true);
    }
    const clickOutside = (e)=>{
        if(searchRef.current && !searchRef.current.contains(e.target)){
            setShowSearch(false)
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', clickOutside);
        return ()=>{
            document.removeEventListener('mousedown', clickOutside);
        }
    }, []);
    return (
        <div className='header-container'>
            <div className="left">Logo</div>
            <div className="mid">
                <nav>
                    <ul>
                        <li>
                            <Link to=''>Trang chủ</Link>
                        </li>
                        <li className={!isLogin ? "disabled" : ''}>
                            <Link to={'my-blog'}>Bài viết của tôi</Link>
                        </li>
                        <li className={!isLogin ? "disabled" : ''}>
                            <Link to='create-blog'>Tạo Blog</Link>
                        </li>
                    </ul>
                </nav>
                <div className='search' ref={searchRef}>
                    <SearchIcon onClick={clickSearch}/>
                    {showSearch &&
                        <div className='search-container-form'>
                            <Search/>
                        </div>
                    }
                </div>
            </div>
            <div className="right">
                <nav>
                    <ul>
                    <li className={isLogin ? 'disabled' : ''}>
                            <Link to='login'>Đăng Nhập</Link>
                        </li>
                        <li className={!isLogin ? "disabled" : ''}>
                            <Link onClick={clickLogout}>Đăng Xuất</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

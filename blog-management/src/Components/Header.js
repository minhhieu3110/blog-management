import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {MyContext} from "../MyContext";

export default function Header(){
    const navigate = useNavigate();
    const {isLogin, logout} = useContext(MyContext)
    const clickLogout =() =>{
        logout()
        navigate('/')
    }
    return(
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
                <div className='search'>
                    tiìm kiếm
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
    )
}
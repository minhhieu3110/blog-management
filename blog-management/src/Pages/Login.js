import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {MyContext} from "../MyContext";

export default function Login() {
    const navigate = useNavigate();
    const {login, setCurrentUser} = useContext(MyContext)
    return (
        <div className='form-login'>
            <Formik
                initialValues={
                    {
                        username: '',
                        password: ''
                    }
                }
                onSubmit={values => {
                    fetch('http://localhost:3000/login',  {
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(values)
                    }).then((res)=>{
                        if(res.ok){
                            navigate('/');
                            localStorage.setItem('dataLogin', JSON.stringify(values));
                            login(values)
                            setCurrentUser(values)
                        }else {
                            console.log('Login failed.');
                        }
                    })
                        .catch(e=>{
                            console.log(e)
                        })
                }}>
                <Form>
                    <h3 style={{textAlign:'center'}}>Đăng Nhập</h3>
                    <label htmlFor="username">Username
                        <Field name='username' placeholder='Username' />
                    </label>
                    <label htmlFor="password">Password
                        <Field name='password' type='password' placeholder='Password' />
                    </label>
                    <div className='login-forgot'>
                        <button type='submit'>Đăng Nhập</button>
                        <Link to='/forgot-password'>Quên mật khẩu ?</Link>
                    </div>
                    <br/>
                    <p>Bạn chưa có tài khoản ?</p>
                    <Link to='/register'>Đăng Ký</Link>
                </Form>
            </Formik>
        </div>
    )
}
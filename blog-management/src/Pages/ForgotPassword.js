import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";

export default function ForgotPassword() {
    const navigate = useNavigate();
    return (
        <div className='form-forgot-password'>
            <Formik
                initialValues={
                    {
                        username: ''
                    }
                }
                onSubmit={values => {
                    fetch('http://localhost:3000/forgot-password', {
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(values)
                    }).then((res)=>{
                        if(res.ok){
                            navigate('/login')
                        }else {
                            console.log('Reset password failed');
                        }
                    })
                        .catch(err => console.log(err))
                }}>
                <Form>
                    <h3 style={{textAlign: 'center'}}>Quên mật khẩu</h3>
                    <label htmlFor="username">Username
                        <Field name="username" placeholder="Username"/>
                    </label>
                    <button type="submit">Reset Password</button>
                </Form>
            </Formik>
        </div>
    )
}
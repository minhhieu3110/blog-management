import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
export default function Register() {
    const navigate = useNavigate();
    return (
        <div className='form-register'>
            <Formik
                initialValues={
                    {
                        username: '',
                        password: '',
                        dob: ''
                    }
                }
                onSubmit={values => {
                    fetch('http://localhost:3000/register',  {
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(values)
                    }).then((res)=>{
                        if(res.ok){
                            navigate('/login')
                            console.log(res)
                        }else {
                            console.log('Register failed.');
                        }
                    })
                        .catch(e=>{
                            console.log(e)
                        })
                }}>
                <Form>
                    <h3 style={{textAlign:'center'}}>Đăng Ký</h3>
                    <label htmlFor="username">Username
                        <Field name='username' placeholder='Username' />
                    </label>
                    <label htmlFor="password">Password
                        <Field name='password' type='password' placeholder='Password' />
                    </label>
                    <label htmlFor="dob">Dob
                        <Field name='dob' placeholder='Dob' />
                    </label>
                    <button>Đăng Ký</button>
                </Form>
            </Formik>
        </div>
    )
}
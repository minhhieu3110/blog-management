import TextEditor from "../TextEditor";
import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {MyContext} from "../MyContext";

export default function CreateBlog() {
    const navigate = useNavigate();
    const { currentUser, isLogin } = useContext(MyContext);
    return (
        <div className='post-form'>
            <Formik
                initialValues={{
                    title: '',
                    content: '',
                    username: currentUser ? currentUser.username : '',
                    status: 'public',
                    type: ''
                }}
                onSubmit={values => {
                    values.img =
                    fetch('http://localhost:3000/posts/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(values)
                    }).then((res) => {
                        if (res.ok) {
                            console.log('Post successfully.');
                            navigate('/');
                        } else {
                            console.log('Post failed');
                        }
                    })
                        .catch(err => {
                            console.log(err);
                        });
                }}
            >
                {({ setFieldValue }) => (
                    <Form className='post-content'>
                        <h3 style={{ textAlign: 'center' }}>Đăng bài</h3>
                        <label htmlFor="title">Title
                            <Field name='title' placeholder='Title' />
                        </label>
                        <label htmlFor="content">Content
                        <TextEditor
                            name="content"
                            onChange={(data) => setFieldValue('content', data)}
                        />
                        
                        </label>
                        <label htmlFor='status'>Status &nbsp;
                            <Field as='select' name='status'>
                                <option value="public">Công khai</option>
                                <option value="private">Riêng tư</option>
                            </Field>
                        </label>
                        <label htmlFor='type'>Type
                            <Field name='type' placeholder='Type' />
                        </label>
                        <br/>
                        <button disabled={!isLogin} type="submit">Đăng</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

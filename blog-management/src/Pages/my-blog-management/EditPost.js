import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import TextEditor from "../../TextEditor";
import { MyContext } from "../../MyContext";

export default function EditPost() {
    const [editPost, setEditPost] = useState({ title: '', content: '', status: '', type: '' });
    const { id } = useParams();
    const { isLogin } = useContext(MyContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`http://localhost:3000/posts/${id}`)
            .then((res) => {
                setEditPost({
                    title: res.data.title,
                    content: res.data.content,
                    status: res.data.status,
                    type: res.data.type,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);
    
    return (
        <div className='edit-form'>
            <Formik
                initialValues={editPost}
                enableReinitialize
                onSubmit={values => {
                    fetch(`http://localhost:3000/posts/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(values)
                    })
                        .then((res) => {
                            if (res.ok) {
                                console.log('Post updated successfully.');
                                navigate('/');
                            } else {
                                console.log('Post update failed');
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }}
            >
                {({ setFieldValue, values }) => (
                    <Form className='post-content'>
                        <h3 style={{ textAlign: 'center' }}>Sửa bài</h3>
                        <label htmlFor="title">Title
                            <Field name='title' placeholder='Title' />
                        </label>
                        <label htmlFor="content">Content
                            <TextEditor
                                name="content"
                                value={values.content}
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
                        <br />
                        <button disabled={!isLogin} type="submit">Cập nhật</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

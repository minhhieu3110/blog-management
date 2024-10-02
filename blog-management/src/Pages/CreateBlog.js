import TextEditor from "../TextEditor";
import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {MyContext} from "../MyContext";
import useListBlog from "../Custom/hooks/useListBlog";

export default function CreateBlog() {
    const navigate = useNavigate();
    const { currentUser, isLogin } = useContext(MyContext);
    const { listBlog } = useListBlog('http://localhost:3000/posts');
    const getAllTypesUnique = [...new Set(listBlog.map((post) => post.type))];
    const [isAddingType, setIsAddingType] = useState(false);
    
    return (
        <div className='post-form'>
            <Formik
                initialValues={{
                    title: '',
                    content: '',
                    username: currentUser ? currentUser.username : '',
                    status: 'public',
                    type: '',
                    newType: ''
                }}
                onSubmit={values => {
                    const finalValues = {
                        ...values,
                        type: isAddingType && values.newType ? values.newType : values.type,
                    };
                    
                    fetch('http://localhost:3000/posts/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(finalValues)
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
                {({ setFieldValue, values }) => (
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
                        <label htmlFor='type'>Type  &nbsp;
                            <Field as='select' name='type'
                                   onChange={(e) => {
                                       const selectedValue = e.target.value;
                                       setFieldValue('type', selectedValue)
                                       setIsAddingType(selectedValue === 'input');
                                   }}
                            >
                                {getAllTypesUnique.map((type, index) => (
                                    <option value={type} key={index}>{type}</option>
                                ))}
                                <option value='input'>Add Type</option>
                            </Field>
                        </label>
                        {isAddingType && (
                            <label htmlFor='newType'>New Type
                                <Field name='newType' placeholder='Enter new type' />
                            </label>
                        )}
                        <br/>
                        <button disabled={!isLogin} type="submit" style={{marginBottom: '5px'}}>Đăng</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

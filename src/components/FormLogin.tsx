import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import { useUserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().required('Required'),
  });

const FormLogin = () => {
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useUserContext()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const emailReq = import.meta.env.VITE_EMAIL
            const passwReq = import.meta.env.VITE_PASSWORD
            if(values.email === emailReq && values.password === passwReq) {
                setUser({
                    isLogged: true
                })
                console.log('entra')
                localStorage.setItem('isLogged', 'true')
                navigate('/characters?page=1')
            } else {
                setError(true)
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <h1>Sign in</h1>
                    <TextField
                        type='email'
                        name='email'
                        id="email"
                        label="Email"
                        variant="filled"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        />
                    <TextField
                        type='password'
                        name='password'
                        id="password"
                        label="Password"
                        variant="filled"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    {
                        error &&
                        <p style={{
                            color: 'red',
                            margin: '0'
                        }}>Incorrect credentials</p>
                    }
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </div>
        </form>
    );
}

export default FormLogin
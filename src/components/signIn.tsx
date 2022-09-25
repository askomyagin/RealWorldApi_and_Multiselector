import { useActions } from '../hooks/useActions';
import { UserSignIn } from '../service/types/user-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import styled from '@emotion/styled';

const initialForm: UserSignIn = {
    email: '',
    password: '',
};

export const SignIn = () => {
    const { signInUser } = useActions();
    const validationSchema = yup.object({
        email: yup.string().email('Введите верный email').required('Обязательно'),
        password: yup.string().required('Обязательно'),
    });
    return (
        <Formik
            initialValues={initialForm}
            onSubmit={(values) => void signInUser(values)}
            validateOnBlur
            validationSchema={validationSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isValid,
                handleSubmit,
                dirty,
            }) => {
                const { email, password } = values;

                return (
                    <form className="form" onSubmit={handleSubmit}>
                        <p>
                            <label htmlFor="email">Email</label>
                            <input
                                type={'text'}
                                name={'email'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={email}
                            />
                        </p>
                        {touched.email && errors.email && <p className="error">{errors.email}</p>}
                        <p>
                            <label htmlFor="password">Пароль</label>
                            <input
                                type={'password'}
                                name={'password'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={password}
                            />
                        </p>
                        {touched.password && errors.password && (
                            <p className="error">{errors.password}</p>
                        )}
                        <button disabled={!isValid && !dirty} type={'submit'}>
                            Отправить
                        </button>
                    </form>
                );
            }}
        </Formik>
    );
};

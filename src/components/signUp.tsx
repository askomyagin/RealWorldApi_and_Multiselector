import { useActions } from '../hooks/useActions';
import { UserSignUp } from '../service/types/user-types';
import { Formik } from 'formik';
import * as yup from 'yup';

const initialForm: UserSignUp = {
    email: '',
    username: '',
    password: '',
    passwordСonfirmation: '',
};

export const SignUp = () => {
    const { signUpUser } = useActions();

    const validationSchema = yup.object({
        email: yup.string().email('Введите верный email').required('Обязательно'),
        password: yup.string().required('Обязательно'),
        username: yup.string().required('Обязательно'),
        passwordСonfirmation: yup
            .string()
            .oneOf([yup.ref('password')], 'Пароли не совпадают')
            .required('Обязательно'),
    });
    return (
        <Formik
            initialValues={initialForm}
            onSubmit={(values) => void signUpUser(values)}
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
                const { email, password, username, passwordСonfirmation } = values;

                return (
                    <form className="form" onSubmit={handleSubmit}>
                        <p>
                            <label htmlFor="username">Имя пользователя</label>
                            <input
                                type={'text'}
                                name={'username'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={username}
                                id={'username'}
                            />
                        </p>
                        {touched.username && errors.username && (
                            <p className="error">{errors.username}</p>
                        )}
                        <p>
                            <label htmlFor="email">Email</label>
                            <input
                                type={'text'}
                                name={'email'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={email}
                                id={'email'}
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
                                id={'password'}
                                autoComplete={'off'}
                            />
                        </p>
                        {touched.password && errors.password && (
                            <p className="error">{errors.password}</p>
                        )}
                        <p>
                            <label htmlFor="passwordСonfirmation">Подтвердите пароль</label>
                            <input
                                type={'password'}
                                name={'passwordСonfirmation'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={passwordСonfirmation}
                                id={'passwordСonfirmation'}
                                autoComplete={'off'}
                            />
                        </p>
                        {touched.passwordСonfirmation && errors.passwordСonfirmation && (
                            <p className="error">{errors.passwordСonfirmation}</p>
                        )}
                        <button disabled={!isValid && !dirty} type={'submit'}>
                            Зарегестрироваться
                        </button>
                    </form>
                );
            }}
        </Formik>
    );
};

import { useActions } from '../hooks/useActions';
import { UserSignUp } from '../service/types/user-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
    Container,
    ButtonContainer,
    Button,
    Input,
    Label,
    Form,
    FieldContainer,
    DescriptionContainer,
    SignInDescription,
} from './styled/signInUp';

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
                    <Container>
                        <DescriptionContainer>
                            <SignInDescription>Регистрация</SignInDescription>
                        </DescriptionContainer>
                        <Form onSubmit={handleSubmit}>
                            <FieldContainer>
                                <Label htmlFor="username">Имя пользователя:</Label>
                                <Input
                                    type={'text'}
                                    name={'username'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={username}
                                    id={'username'}
                                />
                                {touched.username && errors.username && (
                                    <span
                                        className="material-icons-outlined"
                                        style={{ fontSize: '20px', color: 'red' }}
                                    >
                                        priority_high
                                    </span>
                                )}
                                {touched.username && !errors.username && (
                                    <span
                                        className="material-icons-outlined"
                                        style={{ fontSize: '20px', color: 'green' }}
                                    >
                                        done
                                    </span>
                                )}
                            </FieldContainer>

                            <FieldContainer>
                                <Label htmlFor="email">Email:</Label>
                                <Input
                                    type={'text'}
                                    name={'email'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={email}
                                    id={'email'}
                                />
                                {touched.email && errors.email && (
                                    <span
                                        className="material-icons-outlined"
                                        style={{ fontSize: '20px', color: 'red' }}
                                    >
                                        priority_high
                                    </span>
                                )}
                                {touched.email && !errors.email && (
                                    <span
                                        className="material-icons-outlined"
                                        style={{ fontSize: '20px', color: 'green' }}
                                    >
                                        done
                                    </span>
                                )}
                            </FieldContainer>

                            <FieldContainer>
                                <Label htmlFor="password">Пароль:</Label>
                                <Input
                                    type={'password'}
                                    name={'password'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={password}
                                    id={'password'}
                                    autoComplete={'off'}
                                />
                                {touched.password && errors.password && (
                                    <span
                                        className="material-icons-outlined"
                                        style={{ fontSize: '20px', color: 'red' }}
                                    >
                                        priority_high
                                    </span>
                                )}
                                {touched.password && !errors.password && (
                                    <span
                                        className="material-icons-outlined"
                                        style={{ fontSize: '20px', color: 'green' }}
                                    >
                                        done
                                    </span>
                                )}
                            </FieldContainer>

                            <FieldContainer>
                                <Label htmlFor="passwordСonfirmation">Подтвердите пароль:</Label>
                                <Input
                                    type={'password'}
                                    name={'passwordСonfirmation'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={passwordСonfirmation}
                                    id={'passwordСonfirmation'}
                                    autoComplete={'off'}
                                />
                                {touched.passwordСonfirmation && errors.passwordСonfirmation && (
                                    <span
                                        className="material-icons-outlined"
                                        style={{ fontSize: '20px', color: 'red' }}
                                    >
                                        priority_high
                                    </span>
                                )}
                                {touched.passwordСonfirmation && !errors.passwordСonfirmation && (
                                    <span
                                        className="material-icons-outlined"
                                        style={{ fontSize: '20px', color: 'green' }}
                                    >
                                        done
                                    </span>
                                )}
                            </FieldContainer>

                            <ButtonContainer>
                                <Button disabled={!isValid && !dirty} type={'submit'}>
                                    Зарегистрироваться
                                </Button>
                            </ButtonContainer>
                        </Form>
                    </Container>
                );
            }}
        </Formik>
    );
};

import { useActions } from '../hooks/useActions';
import { UserSignIn } from '../service/types/user-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import {
    Container,
    RegistrationContainer,
    ButtonContainer,
    Button,
    Input,
    Label,
    Form,
    FieldContainer,
    DescriptionContainer,
    SignInDescription,
    Title,
    SignUpDescription,
} from './styled/signInUp';

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
                    <Container>
                        <Title>Добро пожаловать в Сборник Статей!</Title>
                        <DescriptionContainer>
                            <SignInDescription>Выполните вход</SignInDescription>
                        </DescriptionContainer>

                        <Form onSubmit={handleSubmit}>
                            <FieldContainer>
                                <Label htmlFor="email">Email:</Label>
                                <Input
                                    type={'text'}
                                    name={'email'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={email}
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
                            <ButtonContainer>
                                <Button disabled={!isValid && !dirty} type={'submit'}>
                                    Отправить
                                </Button>
                            </ButtonContainer>
                        </Form>
                        <DescriptionContainer>
                            <SignUpDescription>
                                или
                                <RegistrationContainer>
                                    <Link
                                        to={'/signUp'}
                                        style={{ textDecoration: 'none', color: 'black' }}
                                    >
                                        зарегистрируйтесь
                                    </Link>
                                </RegistrationContainer>
                            </SignUpDescription>
                        </DescriptionContainer>
                    </Container>
                );
            }}
        </Formik>
    );
};

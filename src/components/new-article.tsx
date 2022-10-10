import { Formik } from 'formik';
import { CreateArticle } from '../service/types/articles-types';
import * as yup from 'yup';
import styled from '@emotion/styled';
import { RealWorldService } from '../service/realworld-service';
import { useCallback, useState } from 'react';
import { Multiselect, ItemOptions } from './multiselect/multiselect';

const RealWorld = new RealWorldService();

const initialForm: CreateArticle = {
    title: '',
    description: '',
    body: '',
    tagList: [],
};

const colourOptions = [
    { value: 'programming', label: 'Programming' },
    { value: 'math', label: 'Math' },
    { value: 'science', label: 'Science' },
    { value: 'react', label: 'React' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'c++', label: 'C++' },
];

export const NewArticle = () => {
    const [articlePosted, setArticlePosted] = useState<boolean>(false);
    const [articleErrorPosted, setArticleErrorPosted] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<ItemOptions[]>([]);

    const validationSchema = yup.object({
        title: yup.string().required('Обязательно'),
        description: yup.string().required('Обязательно'),
        body: yup.string().required('Обязательно'),
    });

    const handleModalOpen = useCallback((flag: boolean) => {
        if (flag) {
            setArticlePosted(true);
            setTimeout(() => {
                setArticlePosted(false);
            }, 2500);
        } else {
            setArticleErrorPosted(true);
            setTimeout(() => {
                setArticleErrorPosted(false);
            }, 2500);
        }
    }, []);

    const postNewArticle = useCallback(
        (article: CreateArticle) => {
            article.tagList = selectedItems.map(({ label }) => label);
            RealWorld.makePostRequest('/articles', { article: { ...article } }, true)
                .then(() => handleModalOpen(true))
                .catch(() => handleModalOpen(false));
            setSelectedItems([]);
        },
        [selectedItems, handleModalOpen]
    );

    return (
        <Formik
            initialValues={initialForm}
            onSubmit={async (values, { resetForm }) => {
                await postNewArticle(values);
                resetForm();
            }}
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
                const { title, description, body } = values;

                return (
                    <Container>
                        <Form>
                            <FormItem>
                                <Label htmlFor="title">Название:</Label>
                                <Input
                                    type={'text'}
                                    name={'title'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={title}
                                />
                                {touched.title && errors.title && (
                                    <span
                                        className="material-icons-outlined"
                                        style={{ fontSize: '20px', color: 'red' }}
                                    >
                                        priority_high
                                    </span>
                                )}
                                {touched.title && !errors.title && (
                                    <span
                                        className="material-icons-outlined"
                                        style={{ fontSize: '20px', color: 'green' }}
                                    >
                                        done
                                    </span>
                                )}
                            </FormItem>
                            <FormItem>
                                <Label htmlFor="description">Описание:</Label>
                                <Textarea
                                    rows={3}
                                    name={'description'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={description}
                                />
                                {touched.description && errors.description && (
                                    <span
                                        className="material-icons-outlined"
                                        style={{ fontSize: '20px', color: 'red' }}
                                    >
                                        priority_high
                                    </span>
                                )}
                                {touched.description && !errors.description && (
                                    <span
                                        className="material-icons-outlined"
                                        style={{ fontSize: '20px', color: 'green' }}
                                    >
                                        done
                                    </span>
                                )}
                            </FormItem>
                            <FormItem>
                                <Label htmlFor="body">Текст статьи:</Label>
                                <Textarea
                                    rows={9}
                                    name={'body'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={body}
                                />
                                {touched.body && errors.body && (
                                    <span
                                        className="material-icons-outlined"
                                        style={{ fontSize: '20px', color: 'red' }}
                                    >
                                        priority_high
                                    </span>
                                )}
                                {touched.body && !errors.body && (
                                    <span
                                        className="material-icons-outlined"
                                        style={{ fontSize: '20px', color: 'green' }}
                                    >
                                        done
                                    </span>
                                )}
                            </FormItem>

                            <FormItem>
                                <Label>Теги: </Label>
                                <Multiselect
                                    items={colourOptions}
                                    updateSelectedItems={setSelectedItems}
                                    selectedItems={selectedItems}
                                    name={'tagList'}
                                />
                            </FormItem>
                            {articlePosted && <Posted>Статья успешно добавлена!</Posted>}
                            {articleErrorPosted && (
                                <ErrorPosted>Произошла ошибка при создании статьи!</ErrorPosted>
                            )}
                            <ButtonContainer>
                                <Button
                                    disabled={!isValid && !dirty}
                                    type={'button'}
                                    onClick={() => handleSubmit()}
                                >
                                    Создать
                                </Button>
                            </ButtonContainer>
                        </Form>
                    </Container>
                );
            }}
        </Formik>
    );
};

const Posted = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    color: #00ff15;
    font-weight: 600;
`;

const ErrorPosted = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    color: #ff0000;
    font-weight: 600;
`;

const Container = styled.div`
    width: 95%;
    margin: auto;
    margin-top: 20px;
`;

const Form = styled.div`
    margin: auto;
    width: 50%;
`;

const FormItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const Label = styled.label`
    font-size: 17px;
    padding-right: 10px;
    text-align: right;
    white-space: normal;
    width: 20%;
`;

const Input = styled.input`
    width: 76%;
    padding: 8px;
`;

const Textarea = styled.textarea`
    width: 76%;
    padding: 8px;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
const Button = styled.button`
    border: none;
    padding: 10px;
    height: 40px;
    background-color: #99ffa2;
    border-radius: 5px;
    font-size: 15px;
    cursor: pointer;
    :hover {
        border: 1px solid black;
    }
`;

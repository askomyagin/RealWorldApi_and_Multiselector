import styled from '@emotion/styled';

const Container = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Title = styled.div`
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const SignInDescription = styled.div`
    font-size: 20px;
`;
const SignUpDescription = styled.div`
    font-size: 15px;
    font-weight: 500;
    text-align: center;
`;
const DescriptionContainer = styled.div`
    width: 30%;
    justify-content: center;
    display: flex;
`;

const Form = styled.form`
    width: 35%;
    margin-bottom: 10px;
`;

const FieldContainer = styled.div`
    margin: 15px;
    display: flex;
    width: 95%;
    align-items: center;
`;

const Label = styled.label`
    width: 30%;
    font-size: 17px;
    padding-right: 10px;
    text-align: right;
    white-space: normal;
`;
const Input = styled.input`
    width: 53%;
    padding: 8px;
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

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const RegistrationContainer = styled.div`
    cursor: pointer;
    :hover {
        color: gray;
        text-decoration: underline;
    }
`;

export {
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
};

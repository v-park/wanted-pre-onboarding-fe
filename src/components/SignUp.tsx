import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface PropsType {
  signup: { description: string; url: string };
  closeModal: () => void;
}

export default function SignUp({
  signup: { description, url },
  closeModal,
}: PropsType) {
  const [inputUser, setInputUser] = useState({ email: '', password: '' });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputUser({ ...inputUser, [name]: value });
  };

  const navigate = useNavigate();

  const { email, password } = inputUser;

  const postUserData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/users/${url}`, {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem('access_token', res.data.token);
        if (res.data.token) {
          closeModal();
          alert('login success');
        }
      });
  };
  const emailRegExp = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
  const isPasswordValid = password.length > 7;
  const isEmailValid = emailRegExp.test(email);
  const isUserInfoValid = isEmailValid && isPasswordValid;

  const removeToken = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };

  return (
    <InputBox>
      <Form onSubmit={postUserData}>
        {description}
        <InputEmail name='email' onChange={handleInput} placeholder='email' />
        <InputPW
          name='password'
          onChange={handleInput}
          placeholder='password'
        />
        <Button disabled={!isUserInfoValid}>{description}</Button>
        <CloseButton onClick={closeModal}>X</CloseButton>

        {localStorage.getItem('access_token') && (
          <LogoutButton onClick={removeToken}>LOGOUT</LogoutButton>
        )}
      </Form>
    </InputBox>
  );
}

const InputBox = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const InputEmail = styled.input`
  margin: 15px;
  height: 40px;
`;
const InputPW = styled(InputEmail)``;

const Button = styled.button`
  width: 150px;
  height: 40px;
  background-color: #3e9d72;

  &: disabled {
    background-color: white;
    color: black;
    border: 1px solid lavender;
  }
`;

const CloseButton = styled.button`
  width: 50px;
  margin: 20px;
`;

const LogoutButton = styled.button`
  width: 100px;
  height: 70px;
`;

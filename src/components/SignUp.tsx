import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MAIN_URL } from '../config/config';
import { customAxios } from '../Auth/customAxios';

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
    customAxios
      .post(`${url}`, {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem('access_token', res.data.access_token);
        if (res.data.access_token) {
          closeModal();
          alert('login success');
        }
      });
  };

  const isUserInfoValid = email.includes('@') && password.length > 7;

  const removeToken = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };

  return (
    <MainWrapper>
      <Overlay></Overlay>
      <MainWrap>
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
      </MainWrap>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  position: relative;
  margin: auto 0;
  max-width: 100vw;
  padding: 16px;
  width: 100%;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: white;
`;

const MainWrap = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  z-index: 11;
  background: #fff;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  z-index: 11;
  background-color: #fff;
`;
const InputEmail = styled.input`
  margin: 15px;
  height: 40px;
`;
const InputPW = styled(InputEmail)``;

const Button = styled.button`
  width: 150px;
  height: 40px;
  background-color: #ffe356;

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

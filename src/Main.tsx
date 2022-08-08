import React, { useState } from 'react';
import SignUp from './components/SignUp';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const [modal, setModal] = useState('');

  const openLogin = () => {
    localStorage.getItem('access_token') ? navigate('/') : setModal('login');
  };

  const openSignUp = () => {
    setModal('signUp');
  };

  const closeModal = () => {
    setModal('');
  };

  const navigate = useNavigate();
  const removeToken = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };
  return (
    <TabWrapper>
      <LoginTab onClick={openLogin}>LOGIN</LoginTab>
      {modal === 'login' && (
        <SignUp signup={LOGIN_DATA} closeModal={closeModal} />
      )}
      {!localStorage.getItem('access_token') && (
        <SignUpTab onClick={openSignUp}>SIGNUP</SignUpTab>
      )}

      {modal === 'signUp' && (
        <SignUp signup={SIGNUP_DATA} closeModal={closeModal} />
      )}
      {localStorage.getItem('access_token') && (
        <LogoutButton onClick={removeToken}>LOGOUT</LogoutButton>
      )}
    </TabWrapper>
  );
}

const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const LoginTab = styled.button`
  width: 100px;
  height: 70px;
`;

const SignUpTab = styled(LoginTab)``;

interface UserInfo {
  description: string;
  url: string;
}

const LogoutButton = styled.button`
  width: 100px;
  height: 70px;
`;

const SIGNUP_DATA: UserInfo = {
  description: 'signup',
  url: '/create',
};

const LOGIN_DATA: UserInfo = {
  description: 'login',
  url: '/login',
};

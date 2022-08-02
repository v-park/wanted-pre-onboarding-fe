import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import TodoList from './components/TodoList';

export default function Todo() {
  const [todo, setTodo] = useState({ title: '', content: '' });

  const { title, content } = todo;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const headers = {
    Authorization: localStorage.getItem('access_token')!,
  };

  const createTodo = () => {
    axios.post(
      'http://localhost:8080/todos',
      {
        title: title,
        content: content,
      },
      {
        headers: headers,
      }
    );
  };

  return (
    <div>
      <TodoBox>
        <InputTitle name='title' onChange={handleInput} placeholder='title' />
        <InputContent
          name='content'
          onChange={handleInput}
          placeholder='content'
        />
        <TodoList />
        <AddButton onClick={createTodo}>Add</AddButton>
      </TodoBox>
    </div>
  );
}

const TodoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  border: 4px solid green;
`;

const InputTitle = styled.input`
  width: 300px;
  height: 30px;
  margin: 10px;
`;

const InputContent = styled(InputTitle)``;

const AddButton = styled.button`
  display: flex;
  width: 150px;
  height: 40px;
`;

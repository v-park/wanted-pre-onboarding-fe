import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodoList from './components/TodoList';
import Detail from './components/Detail';

export default function Todo() {
  const [todo, setTodo] = useState({ title: '', content: '' });
  const [list, setList] = useState([]);     
  const [detail, setDetail] = useState({
    title: '',
    content: '',
    id: '',
    createdAt: '',
    updatedAt: '',
  });

  const { title, content } = todo;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const detailHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
    getData();
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
    getData();
  };

  interface elementType {
    title: string;
    content: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  }

  const openModal = (id: string) => {
    // axios
    //   .get(`http://localhost:8080/todos/${id}`, {
    //     headers: headers,
    //   })
    //   .then((res) => console.log(res.data));
    const result = list.filter((element: elementType) => element.id === id)[0];
    setDetail(result);
  };
  const getData = () => {
    axios
      .get('http://localhost:8080/todos', {
        headers: headers,
      })
      .then((res) => {
        setList(res.data.data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <TodoWrapper>
      <TodoBox>
        <InputTitle name='title' onChange={handleInput} placeholder='title' />
        <InputContent
          name='content'
          onChange={handleInput}
          placeholder='content'
        />
        <TodoList openModal={openModal} list={list} />
        <AddButton onClick={createTodo}>Add</AddButton>
      </TodoBox>
      <SideWrap>
        {detail.id && (
          <Detail detail={detail} detailHandleInput={detailHandleInput} />
        )}
      </SideWrap>
    </TodoWrapper>
  );
}
const TodoWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border: 3px solid navy;
`;

const TodoBox = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  width: 400px;
  height: 400px;
  margin: 0 auto;
  border: 4px solid green;
`;

const SideWrap = styled.div``;

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

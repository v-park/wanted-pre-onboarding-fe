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
  const isButtonActive = title.length > 0 && content.length > 0;
  const openModal = (id: string) => {
    // axios
    //   .get(`http://localhost:8080/todos/${id}`, {
    //     headers: headers,
    //   })
    //   .then((res) => console.log(res.data));
    const result = list.filter((element: elementType) => element.id === id)[0];
    setDetail(result);
    console.log(result);
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
        <InputWrapper>
          <div>
            <InputTitle
              name='title'
              onChange={handleInput}
              placeholder='title'
            />
            <InputContent
              name='content'
              onChange={handleInput}
              placeholder='content'
            />
          </div>
          <ButtonWrapper>
            <AddButton onClick={createTodo} disabled={!isButtonActive}>
              <AddText>Add</AddText>
            </AddButton>
          </ButtonWrapper>
        </InputWrapper>
        <TodoList openModal={openModal} list={list} />
      </TodoBox>
      <SideWrap>
        {detail.id && (
          <Detail
            detail={detail}
            detailHandleInput={detailHandleInput}
            isButtonActive={isButtonActive}
          />
        )}
      </SideWrap>
    </TodoWrapper>
  );
}
const TodoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 100px auto;
  border: 3px solid black;
`;

const TodoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 600px;
  border: 2px solid silver;
`;

const InputWrapper = styled.div`
  width: 350px;
`;

const SideWrap = styled.div`
  width: 300px;
  background-color: lavender;
`;

const InputTitle = styled.input`
  width: 100%;
  height: 40px;
  margin: 20px;
`;

const InputContent = styled(InputTitle)``;

const ButtonWrapper = styled.div`
  margin: 20px auto;
`;
const AddButton = styled.button`
  display: flex;
  width: 350px;
  height: 40px;
  margin: 20px;
  border: transparent;
  background-color: #f4b869;
  cursor: pointer;
  &:disabled {
    background-color: silver;
  }
`;

const AddText = styled.div`
  font-size: 15px;
  color: white;
  width: 50px;
  margin: auto;
  font-family: 'Lucida Sans', sans-serif;
`;

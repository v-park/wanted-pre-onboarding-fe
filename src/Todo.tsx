import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodoList from './components/TodoList';
import Detail from './components/Detail';
import { customAxios } from './Auth/customAxios';
import { constants } from 'fs';

export default function Todo() {
  const [todo, setTodo] = useState({ todo: '', isCompleted: false });
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState({
    todo: '',
    isCompleted: false,
    id: '',
    userId: '',
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const detailHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
    getData();
  };

  const createTodo = async () => {
    await customAxios.post('todos', {
      todo: todo.todo,
    });
    getData();
  };

  interface elementType {
    id: string;
    todo: string;
    isCompleted: boolean;
    userId: string;
  }
  const openModal = (id: string) => {
    // axios
    //   .get(`http://localhost:8080/todos/${id}`, {
    //     headers: headers,
    //   })
    //   .then((res) => console.log(res.data));
    const result = list.filter((element: elementType) => element.id == id)[0];
    setDetail(result);
  };
  const getData = async () => {
    await customAxios.get(`todos`).then((res) => {
      setList(res.data);
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
            <InputTitle name='todo' onChange={handleInput} placeholder='todo' />
          </div>
          <ButtonWrapper>
            <AddButton onClick={createTodo}>
              <AddText>Add</AddText>
            </AddButton>
          </ButtonWrapper>
        </InputWrapper>
        {list && <TodoList openModal={openModal} list={list} />}
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

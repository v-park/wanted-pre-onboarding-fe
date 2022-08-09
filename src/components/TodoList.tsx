import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface modalType {
  openModal: (id: string) => void;
  list: {
    title: string;
    content: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export default function TodoList(props: modalType) {
  const { openModal, list } = props;

  const headers = {
    Authorization: localStorage.getItem('access_token')!,
  };

  const deleteTodo = (id: string) => {
    axios.delete(`http://localhost:8080/todos/${id}`, { headers: headers });
  };

  // const editTodo = (id: string) => {
  //   axios.put(
  //     `http://localhost:8080/todos/${id}`,
  //     // { title, content },
  //     { headers: headers }
  //   );
  // };

  return (
    <EntryBox>
      <TodoTextBox>
        {list.map(({ id, title }) => {
          return (
            <TodoEntry key={id}>
              <TitleSpan>{title}</TitleSpan>
              <ButtonBox>
                <DeleteButton onClick={() => deleteTodo(id)}>X</DeleteButton>
                <DetailButton onClick={() => openModal(id)}>
                  Details
                </DetailButton>
              </ButtonBox>
            </TodoEntry>
          );
        })}
      </TodoTextBox>
    </EntryBox>
  );
}

const EntryBox = styled.div`
  font-family: sans-serif;
  margin: 20px;
  width: 350px;
  height: 500px;
`;

const TodoTextBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const TodoEntry = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100px;
  border: 2px solid pink;
`;

const TitleSpan = styled.span`
  display: flex;
  justify-content: center;
`;
const DeleteButton = styled.button`
  border: 1px solid silver;
  border-style: none;
`;

const DetailButton = styled(DeleteButton)``;

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
                <button onClick={() => deleteTodo(id)}>X</button>
                <button onClick={() => openModal(id)}>Details</button>
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
  margin: 30px;
  width: 500px;
  height: 500px;
  border: 2px solid orange;
`;

const TodoTextBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 2px solid blue;
`;

const TodoEntry = styled.div`
  display: flex;
  border: 1px solid yellowgreen;
`;

const ButtonBox = styled.div`
  border: 2px solid pink;
`;

const TitleSpan = styled.span``;
const DeleteButton = styled.button``;

const EditButton = styled.button``;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { customAxios } from '../Auth/customAxios';

interface modalType {
  openModal: (id: string) => void;
  list: {
    id: string;
    todo: string;
    isCompleted: boolean;
    userId: string;
  }[];
}

export default function TodoList(props: modalType) {
  const { openModal, list } = props;

  const deleteTodo = (id: string) => {
    customAxios.delete(`/todos/${id}`);
  };

  return (
    <EntryBox>
      <TodoTextBox>
        {list.map(({ id, todo, isCompleted }) => {
          return (
            <TodoEntry key={id}>
              <Checkbox type='checkbox' />
              <TitleSpan>{todo}</TitleSpan>
              <ButtonBox>
                {isCompleted}
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

const Checkbox = styled.input``;

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

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function TodoList() {
  const [list, setList] = useState([]);

  const headers = {
    Authorization: localStorage.getItem('access_token')!,
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/todos', {
        headers: headers,
      })
      .then((res) => {
        setList(res.data.data);
      });
  }, [list]);

  const deleteTodo = (id: string) => {
    axios.delete(`http://localhost:8080/todos/${id}`, { headers: headers });
  };

  const editTodo = (id: string) => {
    axios.put(
      `http://localhost:8080/todos/${id}`,
      // { title, content },
      { headers: headers }
    );
  };

  return (
    <EntryBox>
      <TodoTextBox>
        <TodoEntry>
          {list.map(({ id, title }) => {
            return (
              <>
                <li key={id}>{title}</li>
                <DeleteButton onClick={() => deleteTodo(id)}>X</DeleteButton>
                <EditButton onClick={() => editTodo(id)}>Edit</EditButton>
              </>
            );
          })}
        </TodoEntry>
      </TodoTextBox>
    </EntryBox>
  );
}

const EntryBox = styled.div`
  font-family: sans-serif;
  margin: 30px;
  width: 500px;
  height: 500px;
`;

const TodoTextBox = styled.div``;

const TodoEntry = styled.li`
  list-style: none;
`;

const DeleteButton = styled.button``;

const EditButton = styled.button``;

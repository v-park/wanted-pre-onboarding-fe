import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Main from './Main';
import Todo from './Todo';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

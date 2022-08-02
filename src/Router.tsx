import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Main from './Main';
import Todo from './Todo';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Main />} />
        <Route path='/' element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
}

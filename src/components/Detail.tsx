import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

interface propsType {
  detail: {
    title: string;
    content: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  detailHandleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Detail(props: propsType) {
  const {
    detail: { id, title, content },
    detailHandleInput,
  } = props;
  return (
    <div>
      <input name='title' value={title} onChange={detailHandleInput} />
      <input name='content' value={content} onChange={detailHandleInput} />
    </div>
  );
}

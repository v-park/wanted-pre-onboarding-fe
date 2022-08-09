import React, { useState } from 'react';
import styled from 'styled-components';

interface propsType {
  detail: {
    title: string;
    content: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  detailHandleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isButtonActive: boolean;
}

export default function Detail(props: propsType) {
  const [edit, setEdit] = useState(true);

  const editMode = () => {
    edit ? setEdit(false) : setEdit(true);
  };

  const {
    detail: { id, title, content },
    detailHandleInput,
    isButtonActive,
  } = props;

  return (
    <DetailWrapper>
      {edit ? (
        <DetailInputWrapper>
          <div>{title}</div>
          <div>{content}</div>
          <DetailButtonWrapper>
            <EditButton onClick={editMode}>Edit</EditButton>
            <UpdateButton>Update</UpdateButton>
          </DetailButtonWrapper>
        </DetailInputWrapper>
      ) : (
        <DetailInputWrapper>
          <DetailInputTitle
            name='title'
            value={title}
            onChange={detailHandleInput}
            placeholder='title'
          />
          <DetailInputContent
            name='content'
            value={content}
            onChange={detailHandleInput}
            placeholder='content'
          />
          <DetailButtonWrapper>
            <EditButton onClick={editMode}>Edit</EditButton>
            <UpdateButton>Update</UpdateButton>
          </DetailButtonWrapper>
        </DetailInputWrapper>
      )}
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0px 5px 20px;
`;

const DetailInputWrapper = styled.div``;

const DetailInputTitle = styled.input`
  width: 300px;
  height: 40px;
  margin: 20px;
`;

const DetailInputContent = styled(DetailInputTitle)``;

const DetailButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const EditButton = styled.button`
  margin: 20px 10px;
  width: 60px;
  height: 30px;
  border: transparent;
  background-color: #f4b869;
  cursor: pointer;
  &:disabled {
    background-color: silver;
  }
`;

const UpdateButton = styled(EditButton)``;

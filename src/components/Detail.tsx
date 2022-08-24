import React, { useState } from 'react';
import styled from 'styled-components';

interface propsType {
  detail: {
    id: string;
    todo: string;
    isCompleted: boolean;
    userId: string;
  };
  detailHandleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Detail(props: propsType) {
  const [edit, setEdit] = useState(true);

  const editMode = () => {
    edit ? setEdit(false) : setEdit(true);
  };

  const {
    detail: { id, todo, isCompleted },
    detailHandleInput,
  } = props;

  return (
    <DetailWrapper>
      {edit ? (
        <DetailInputWrapper>
          <div>{todo}</div>

          <DetailButtonWrapper>
            <EditButton onClick={editMode}>Edit</EditButton>
            <UpdateButton>Update</UpdateButton>
          </DetailButtonWrapper>
        </DetailInputWrapper>
      ) : (
        <DetailInputWrapper>
          <DetailInputTitle
            name='todo'
            value={todo}
            onChange={detailHandleInput}
            placeholder='todo'
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

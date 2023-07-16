import styled from '@emotion/styled';
import { InputBase } from '@mui/material';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 73px;
  padding: 0 15px;
  border-radius: 50px;
  background-color: #ffffff;
  border: 2px solid #ffffff;
  &:focus-within {
    border: 2px solid #017be9;
    box-sizing: border-box;
  }
  gap: 10px;
`;

export const Input = styled(InputBase)`
  width: 100%;
  font-size: 18px;
  line-height: 19px;
  color: #121212;
`;

export const ClearButton = styled.button`
  background-color: #a7afb7;
  width: 21px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  position: absolute;
  right: 70px;
`;

export const ClearIconWrapper = styled.div`
  color: #ffffff;
  width: 10px;
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

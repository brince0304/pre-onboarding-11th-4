import styled from '@emotion/styled';
import { InputBase } from '@mui/material';

export const Form = styled.form<SearchBoxWrapperProps>`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 73px;
  padding: 0 10px;
  border-radius: 50px;
  background-color: #ffffff;
  border: ${({ isFocused }) => (isFocused ? '2px solid #017be9' : '2px solid #ffffff')};
  gap: 10px;
`;

export const SearchBoxWrapper = styled.div`
  position: relative;
  width: 450px;
  height: 100%;
  display: flex;
  margin-top: 50px;
`;

export const Input = styled(InputBase)`
  width: 100%;
  margin-left: 20px;
  font-size: 18px;
  line-height: 19px;
  color: #121212;
`;

export const Button = styled.button`
  display: flex;
  background-color: #017be9;
  width: 55px;
  height: 48px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
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

interface SearchBoxWrapperProps {
  isFocused: boolean;
}

import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 120%;
  padding: 15px 0;
  left: 0;
  z-index: 10;
`;

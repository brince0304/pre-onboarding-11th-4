import styled from '@emotion/styled';
import { List } from '@mui/material';

export const ListBox = styled(List)`
  width: 100%;
  height: 100%;
`;

export const ResultQueryList = styled(List)`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #f1f1f1;
`;

export const Empty = styled.span`
  display: flex;
  color: #999;
  font-size: 16px;
  font-weight: 400;
  padding: 0 20px;
  margin-bottom: 10px;
`;

export const RecentTitle = styled.span`
  display: flex;
  color: #999;
  font-size: 14px;
  font-weight: 500;
  padding: 0 20px;
  margin-bottom: 20px;
`;

export const ResultTitle = styled.span`
  display: flex;
  color: #999;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
  padding: 0 20px;
`;

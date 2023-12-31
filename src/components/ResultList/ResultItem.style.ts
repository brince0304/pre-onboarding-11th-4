import { ListItem, ListItemButton } from '@mui/material';
import styled from '@emotion/styled';

export const ResultItemWrapper = styled(ListItem)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  font-size: 16px;
  font-weight: 700;
`;

export const ResultItemButton = styled(ListItemButton)`
  width: 100%;
  height: 100%;
  gap: 10px;
  display: flex;
  border: ${(props: { isSelected?: boolean }) => (props.isSelected ? '2px solid #017be9' : '2px solid transparent')};
  border-radius: 5px;
`;

export const RecentQueryItemButton = styled(ListItemButton)`
  width: 100%;
  height: 100%;
  gap: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  font-weight: 400;
  font-size: 16px;
`;

export const ResultItemText = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

import SearchIcon from '@mui/icons-material/Search';
import React, { HTMLProps } from 'react';
import * as S from '../../ResultList/ResultItem.style';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useRecentQuery } from 'context/recentQueryContext';
const RecentQueryItem = ({ query, onClickHandler }: IRecentQueryItemProps) => {
  const { deleteRecentQuery } = useRecentQuery();
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteRecentQuery(query);
  };
  return (
    <S.ResultItemWrapper>
      <S.RecentQueryItemButton onClick={(e) => onClickHandler(query)}>
        <S.ResultItemText>
          <SearchIcon sx={{ color: 'grey' }} />
          {query}
        </S.ResultItemText>
        <IconButton onClick={handleDelete}>
          <ClearIcon sx={{ color: 'grey' }} />
        </IconButton>
      </S.RecentQueryItemButton>
    </S.ResultItemWrapper>
  );
};

interface IRecentQueryItemProps extends HTMLProps<HTMLButtonElement> {
  query: string;
  onClickHandler: (...args: any[]) => void;
}

export default RecentQueryItem;

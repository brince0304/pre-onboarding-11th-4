import { iSickChild } from '../../interfaces/iSickList';
import SearchIcon from '@mui/icons-material/Search';
import * as S from './ResultItem.style';
import React from 'react';
const ResultItem = ({ sick, onClick, isSelected }: IResultItemProps) => {
  return (
    <S.ResultItemWrapper>
      <S.ResultItemButton
        className={isSelected ? 'selected' : ''}
        isSelected={isSelected}
        onClick={(e) => (onClick ? onClick(sick.sickNm) : null)}
      >
        <SearchIcon sx={{ color: 'grey' }} />
        {sick.sickNm}
      </S.ResultItemButton>
    </S.ResultItemWrapper>
  );
};

interface IResultItemProps {
  sick: iSickChild;
  onClick?: (value: string) => void;
  isSelected?: boolean;
}

export default ResultItem;

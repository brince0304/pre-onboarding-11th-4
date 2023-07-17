import { iSickChild } from '../../interfaces/iSickList';
import SearchIcon from '@mui/icons-material/Search';
import * as S from './ResultItem.style';
import React from 'react';
const ResultItem = ({ sick, onClickHandler, isSelected }: IResultItemProps) => {
  return (
    <S.ResultItemWrapper>
      <S.ResultItemButton
        className={isSelected ? 'selected' : ''}
        isSelected={isSelected}
        onClick={(e) => (onClickHandler ? onClickHandler(sick.sickNm) : null)}
      >
        <SearchIcon sx={{ color: 'grey' }} />
        {sick.sickNm}
      </S.ResultItemButton>
    </S.ResultItemWrapper>
  );
};

interface IResultItemProps {
  sick: iSickChild;
  onClickHandler?: (...args: any[]) => void;
  isSelected?: boolean;
}

export default ResultItem;

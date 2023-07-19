import { iSickChild } from '../../interfaces/iSickList';
import SearchIcon from '@mui/icons-material/Search';
import * as S from './ResultItem.style';
import React, {ForwardedRef, forwardRef} from "react";
const ResultItem = ({ sick, onClickHandler, isSelected }: IResultItemProps,ref:ForwardedRef<HTMLDivElement>) => {
  return (
    <S.ResultItemWrapper>
      <S.ResultItemButton
        onClick={(e) => (onClickHandler ? onClickHandler(sick.sickNm) : null)}
        isSelected={isSelected}
        ref={ref}>
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

export default forwardRef(ResultItem);

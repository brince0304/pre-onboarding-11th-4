import { iSickChild } from '../../interfaces/iSickList';
import ResultItem from './ResultItem';
import * as S from './ResultList.style';
import { MutableRefObject } from 'react';

const ResultList = ({ sickList, submitHandler, selectedListRef }: IResultListProps) => {
  return (
    <S.ListBox>
      <S.ResultTitle>추천 검색어</S.ResultTitle>
      {sickList.map((sick, index) => (
        <ResultItem
          key={index}
          sick={sick}
          ref={(e: HTMLDivElement) => {
            if (selectedListRef) {
              selectedListRef.current[index] = e;
            }
          }}
          onClickHandler={submitHandler}
        />
      ))}
    </S.ListBox>
  );
};

interface IResultListProps {
  sickList: iSickChild[];
  submitHandler: (...args: any[]) => void;
  selectedListRef: MutableRefObject<HTMLDivElement[]>;
}

export default ResultList;

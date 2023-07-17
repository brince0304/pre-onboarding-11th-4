import { iSickChild } from '../../interfaces/iSickList';
import ResultItem from './ResultItem';
import * as S from './ResultList.style';

const ResultList = ({ sickList, submitHandler, selectedIndex }: IResultListProps) => {
  return (
    <S.ListBox>
      <S.ResultTitle>추천 검색어</S.ResultTitle>
      {sickList.map((sick, index) => (
        <ResultItem key={index} sick={sick} onClickHandler={submitHandler} isSelected={selectedIndex === index} />
      ))}
    </S.ListBox>
  );
};

interface IResultListProps {
  sickList: iSickChild[];
  selectedIndex: number;
  submitHandler: (...args: any[]) => void;
}

export default ResultList;

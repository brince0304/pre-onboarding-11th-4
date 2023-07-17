import { iSickChild } from '../../../interfaces/iSickList';
import ResultItem from './ResultItem';
import * as S from './ResultList.style';

const ResultList = ({ sickList }: IResultListProps) => {
  return (
    <S.ListBox>
      <S.ResultTitle>추천 검색어</S.ResultTitle>
      {sickList.map((sick) => (
        <ResultItem key={sick.sickCd} sick={sick} onClick={() => {}} />
      ))}
    </S.ListBox>
  );
};

interface IResultListProps {
  sickList: iSickChild[];
}

export default ResultList;

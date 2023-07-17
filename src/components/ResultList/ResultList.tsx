import { iSickChild } from '../../interfaces/iSickList';
import ResultItem from './ResultItem';
import * as S from './ResultList.style';
import { useRecentQuery } from '../../context/recentQueryContext';

const ResultList = ({ sickList, selectedIndex }: IResultListProps) => {
  const { setRecentQuery } = useRecentQuery();
  return (
    <S.ListBox>
      <S.ResultTitle>추천 검색어</S.ResultTitle>
      {sickList.map((sick, index) => (
        <ResultItem key={index} sick={sick} onClick={setRecentQuery} isSelected={selectedIndex === index} />
      ))}
    </S.ListBox>
  );
};

interface IResultListProps {
  sickList: iSickChild[];
  selectedIndex: number;
}

export default ResultList;

import { iSickChild } from '../../interfaces/iSickList';
import ResultItem from './ResultItem';
import * as S from './ResultList.style';
import { useSickService } from '../../context/sickContext';

const ResultList = ({ sickList }: IResultListProps) => {
  const { setRecentQuery } = useSickService();
  const handleSaveRecentQuery = (value: string) => {
    setRecentQuery(value);
  };
  return (
    <S.ListBox>
      <S.ResultTitle>추천 검색어</S.ResultTitle>
      {sickList.map((sick) => (
        <ResultItem key={sick.sickCd} sick={sick} onClick={handleSaveRecentQuery} />
      ))}
    </S.ListBox>
  );
};

interface IResultListProps {
  sickList: iSickChild[];
}

export default ResultList;

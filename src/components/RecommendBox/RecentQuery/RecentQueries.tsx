import ResultItem from '../../ResultList/ResultItem';
import * as S from '../../ResultList/ResultList.style';
import { useRecentQuery } from '../../../context/recentQueryContext';
const RecentQueries = ({ setInput }: IRecentQueriesProps) => {
  const { recentQuery } = useRecentQuery();
  return (
    <S.ResultQueryList>
      <S.RecentTitle>최근 검색어</S.RecentTitle>
      {recentQuery.length > 0 &&
        recentQuery.map((query, index) => {
          return <ResultItem key={index} sick={{ sickCd: '', sickNm: query }} onClick={setInput} />;
        })}
      {recentQuery.length === 0 && <S.Empty>최근 검색어가 없습니다.</S.Empty>}
    </S.ResultQueryList>
  );
};

interface IRecentQueriesProps {
  setInput: (input: string) => void;
}

export default RecentQueries;

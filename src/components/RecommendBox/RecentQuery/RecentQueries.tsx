import { useSickService } from '../../../context/sickContext';
import ResultItem from '../../SearchBox/ResultList/ResultItem';
import * as S from '../../SearchBox/ResultList/ResultList.style';
const RecentQueries = () => {
  const { recentQuery } = useSickService();
  return (
    <S.ResultQueryList>
      <S.RecentTitle>최근 검색어</S.RecentTitle>
      {recentQuery.length > 0 &&
        recentQuery.map((query, index) => {
          return <ResultItem onClick={() => {}} key={index} sick={{ sickCd: '', sickNm: query }} />;
        })}
      {recentQuery.length === 0 && <S.Empty>최근 검색어가 없습니다.</S.Empty>}
    </S.ResultQueryList>
  );
};

export default RecentQueries;

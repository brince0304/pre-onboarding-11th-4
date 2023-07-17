import * as S from '../../ResultList/ResultList.style';
import { useRecentQuery } from '../../../context/recentQueryContext';
import RecentQueryItem from './RecentQueryItem';
import { HTMLProps } from 'react';
const RecentQueries = ({ onClickHandler }: IRecentQueriesProps) => {
  const { recentQuery } = useRecentQuery();
  return (
    <S.RecentQueryList>
      <S.RecentTitle>최근 검색어</S.RecentTitle>
      {recentQuery.length > 0 &&
        recentQuery.map((query, index) => {
          return <RecentQueryItem key={index} query={query} onClickHandler={onClickHandler} />;
        })}
      {recentQuery.length === 0 && <S.Empty>최근 검색어가 없습니다.</S.Empty>}
    </S.RecentQueryList>
  );
};

interface IRecentQueriesProps extends HTMLProps<HTMLButtonElement> {
  onClickHandler: (...args: any[]) => void;
}

export default RecentQueries;

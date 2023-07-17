import * as S from './RecommendQueryButtons.style';
import RecommendButton from './RecommendButton';
import useSickList from '../../../hooks/useSickList';
import { useEffect, useState } from 'react';

const RecommendQueryButtons = ({ onClickHandler }: IRecommendButtonProps) => {
  const { handleGetRecommendQueries, sickList } = useSickList();
  const [queries, setQueries] = useState<string[]>([]);
  const getRecommentQueries = async () => {
    const queries = await handleGetRecommendQueries();
    setQueries(queries);
  };
  useEffect(() => {
    getRecommentQueries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sickList]);

  return (
    <S.Container>
      <S.RecommendTitle>추천 검색어로 검색해보세요</S.RecommendTitle>
      <S.ButtonBox>
        {queries.map((query, index) => {
          return <RecommendButton onClickHandler={onClickHandler} key={index} label={query} />;
        })}
      </S.ButtonBox>
    </S.Container>
  );
};

interface IRecommendButtonProps {
  onClickHandler: (...args: any[]) => void;
}

export default RecommendQueryButtons;

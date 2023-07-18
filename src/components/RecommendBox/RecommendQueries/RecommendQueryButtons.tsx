import * as S from './RecommendQueryButtons.style';
import RecommendButton from './RecommendButton';

const RecommendQueryButtons = ({ onClickHandler }: IRecommendButtonProps) => {
  const queries = ['비만', '우울증', 'B형 간염', '담낭염'];

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

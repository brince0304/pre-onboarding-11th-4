import * as S from './RecommendQueryButton.style';

const RecommendButton = ({ label, onClickHandler }: IRecommendButtonProps) => {
  return <S.Button onClick={(e) => onClickHandler(label)}>{label}</S.Button>;
};

interface IRecommendButtonProps {
  label: string;
  onClickHandler: (...args: any[]) => void;
}

export default RecommendButton;

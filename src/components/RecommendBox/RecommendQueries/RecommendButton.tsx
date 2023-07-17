import * as S from './RecommendQueryButton.style';

const RecommendButton = ({ label, handleChangeInput }: IRecommendButtonProps) => {
  return <S.Button onClick={(e) => handleChangeInput(label)}>{label}</S.Button>;
};

interface IRecommendButtonProps {
  label: string;
  handleChangeInput: (value: string) => void;
}

export default RecommendButton;

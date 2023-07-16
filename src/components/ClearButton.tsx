import * as S from './SearchBox.style';
import ClearIcon from '@mui/icons-material/Clear';

const ClearButton = ({ onClick }: IClearButtonProps) => {
  return (
    <S.ClearButton onClick={onClick}>
      <ClearIcon sx={{ width: '15px', height: '15px', color: '#ffffff' }} />
    </S.ClearButton>
  );
};

interface IClearButtonProps {
  onClick: () => void;
}

export default ClearButton;

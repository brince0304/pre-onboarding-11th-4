import { iSickChild } from '../../../interfaces/iSickList';
import SearchIcon from '@mui/icons-material/Search';
import * as S from './ResultItem.style';
const ResultItem = ({ sick }: IResultItemProps) => {
  return (
    <S.ResultItemWrapper>
      <S.ResultItemButton>
        <SearchIcon sx={{ color: 'grey' }} />
        {sick.sickNm}
      </S.ResultItemButton>
    </S.ResultItemWrapper>
  );
};

interface IResultItemProps {
  sick: iSickChild;
  onClick: () => void;
}

export default ResultItem;

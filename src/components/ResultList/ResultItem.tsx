import { iSickChild } from '../../interfaces/iSickList';
import SearchIcon from '@mui/icons-material/Search';
import * as S from './ResultItem.style';
const ResultItem = ({ sick,onClick }: IResultItemProps) => {
  return (
    <S.ResultItemWrapper>
      <S.ResultItemButton onClick={(e)=>(onClick ? onClick(sick.sickNm) : null)}>
        <SearchIcon sx={{ color: 'grey' }} />
        {sick.sickNm}
      </S.ResultItemButton>
    </S.ResultItemWrapper>
  );
};

interface IResultItemProps {
  sick: iSickChild;
  onClick?: (value:string) => void;
}

export default ResultItem;

import * as S from './SearchButton.style';
import SearchIcon from '@mui/icons-material/Search';

const SearchButton = () => {
  return (
    <S.Button>
      <SearchIcon sx={{ color: '#fff' }} />
    </S.Button>
  );
};

export default SearchButton;

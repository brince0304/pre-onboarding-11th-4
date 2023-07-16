import React from 'react';
import SearchBox from './components/SearchBox';
import * as S from './AppStyle';

function App() {
  return (
    <div>
      <S.Container>
        <S.SearchBoxWrapper>
          <SearchBox />
        </S.SearchBoxWrapper>
      </S.Container>
    </div>
  );
}

export default App;

import React from 'react';
import SearchBox from './components/SearchBox/SearchBox';
import * as S from './AppStyle';

function App() {
  return (
    <div>
      <S.Container>
        <S.TitleContainer>
          <S.Title>국내 모든 임상시험 검색하고</S.Title>
          <S.Title>온라인으로 참여하기</S.Title>
        </S.TitleContainer>
        <S.SearchBoxWrapper>
          <SearchBox />
        </S.SearchBoxWrapper>
      </S.Container>
    </div>
  );
}

export default App;

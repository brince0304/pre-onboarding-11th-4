import * as S from './Main.style';
import SearchBox from '../components/SearchBox/SearchBox';
import React from 'react';

const Main = () => {
  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>국내 모든 임상시험 검색하고</S.Title>
        <S.Title>온라인으로 참여하기</S.Title>
      </S.TitleContainer>
      <SearchBox />
    </S.Container>
  );
};

export default Main;

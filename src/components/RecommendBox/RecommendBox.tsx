import * as S from './RecommendBox.style';
import ResultList from '../ResultList/ResultList';
import RecentQueries from './RecentQuery/RecentQueries';
import ResultItem from '../ResultList/ResultItem';
import RecommendQueryButtons from './RecommendQueries/RecommendQueryButtons';
import useSickList from '../../hooks/useSickList';
import Loading from '../ResultList/Loading';
import NoResult from '../ResultList/NoResult';
import React, { ForwardedRef, forwardRef } from 'react';
import { IRecommendBoxProps } from '../../interfaces/searchBox';

const RecommendBox = ({ value, submitHandler, selectedListItemIndex }: IRecommendBoxProps, ref:ForwardedRef<HTMLDivElement>) => {
  const { loading,sickList } = useSickList();
  const isLoading = loading === 'pending';
  const showInputKeyword = !isLoading && value.length > 0;
  const showResultList = sickList && sickList.length > 0 && value.length > 0 && !isLoading;
  const showNoResult = !isLoading && !showResultList && showInputKeyword && value !== '';
  const showRecentQueries = !isLoading && !showResultList && !showNoResult && value === '';


  return (
    <S.Container ref={ref}>
      {isLoading && <Loading />}
      {showInputKeyword && <ResultItem sick={{ sickCd: '', sickNm: value }} />}
      {showRecentQueries && <RecentQueries onClickHandler={submitHandler} />}
      {showResultList && <ResultList submitHandler={submitHandler} sickList={sickList} selectedIndex={selectedListItemIndex} />}
      {showNoResult && <NoResult />}
      {showRecentQueries && <RecommendQueryButtons onClickHandler={submitHandler} />}
    </S.Container>
  );
};
export default forwardRef(RecommendBox);

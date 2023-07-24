import * as S from './RecommendBox.style';
import ResultList from '../ResultList/ResultList';
import RecentQueries from './RecentQuery/RecentQueries';
import ResultItem from '../ResultList/ResultItem';
import RecommendQueryButtons from './RecommendQueries/RecommendQueryButtons';
import useSickList from '../../hooks/useSickList';
import Loading from '../ResultList/Loading';
import Error from '../ResultList/Error';
import NoResult from '../ResultList/NoResult';
import React from 'react';
import { IRecommendBoxProps } from '../../interfaces/searchBox';

const RecommendBox = ({ value, submitHandler, selectedListRef }: IRecommendBoxProps) => {
  const { error, loading, sickList } = useSickList();
  const isLoading = loading === 'pending';
  const showInputKeyword = !isLoading && value.length > 0;
  const showResultList = sickList && sickList.length > 0 && value.length > 0 && !isLoading;
  const showNoResult = !isLoading && !showResultList && showInputKeyword && value !== '';
  const showRecentQueries = !isLoading && !showResultList && !showNoResult && value === '';
  const showError = error && !showRecentQueries;

  return (
    <S.Container>
      {isLoading && <Loading />}
      {showInputKeyword && <ResultItem sick={{ sickCd: '', sickNm: value }} />}
      {showRecentQueries && <RecentQueries onClickHandler={submitHandler} />}
      {showResultList && (
        <ResultList selectedListRef={selectedListRef} submitHandler={submitHandler} sickList={sickList} />
      )}
      {showNoResult && <NoResult />}
      {showRecentQueries && <RecommendQueryButtons onClickHandler={submitHandler} />}
      {showError && <Error />}
    </S.Container>
  );
};
export default RecommendBox;

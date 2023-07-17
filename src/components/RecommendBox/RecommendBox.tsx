import * as S from './RecommendBox.style';
import { ISickList } from '../../interfaces/iSickList';
import ResultList from '../ResultList/ResultList';
import RecentQueries from './RecentQuery/RecentQueries';
import ResultItem from '../ResultList/ResultItem';
import RecommendQueryButtons from './RecommendQueries/RecommendQueryButtons';
import useSickList from '../../hooks/useSickList';
import Loading from '../ResultList/Loading';
import NoResult from '../ResultList/NoResult';

const RecommendBox = ({ input, submitHandler, sickList, showRecentQueries, selectedIndex }: IRecommendBoxProps) => {
  const { loading } = useSickList();
  const isLoading = loading === 'pending';
  const showInputKeyword = !isLoading && input.length > 0;
  const showResultList = sickList && sickList.length > 0 && input.length > 0 && !isLoading;
  const showNoResult = !isLoading && !showResultList && showInputKeyword && input !== '';
  return (
    <S.Container>
      {isLoading && <Loading />}
      {showInputKeyword && <ResultItem sick={{ sickCd: '', sickNm: input }} />}
      {showRecentQueries && <RecentQueries onClickHandler={submitHandler} />}
      {showResultList && <ResultList sickList={sickList} selectedIndex={selectedIndex} />}
      {showNoResult && <NoResult />}
      {showRecentQueries && <RecommendQueryButtons onClickHandler={submitHandler} />}
    </S.Container>
  );
};

interface IRecommendBoxProps {
  input: string;
  submitHandler: (...args: any[]) => void;
  sickList?: ISickList;
  showRecentQueries: boolean;
  selectedIndex: number;
}

export default RecommendBox;

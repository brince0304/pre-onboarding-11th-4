import * as S from './RecommendBox.style';
import { ISickList } from '../../interfaces/iSickList';
import ResultList from '../ResultList/ResultList';
import RecentQueries from './RecentQuery/RecentQueries';
import ResultItem from '../ResultList/ResultItem';
import RecommendQueryButtons from './RecommendQueries/RecommendQueryButtons';
import useSickList from '../../hooks/useSickList';
import Loading from '../ResultList/Loading';
import NoResult from '../ResultList/NoResult';

const RecommendBox = ({ input, setInput, sickList, showRecentQueries }: IRecommendBoxProps) => {
  const showInputKeyword = input.length > 0;
  const showResultList = sickList && sickList.length > 0;
  const { loading } = useSickList();
  const isLoading = loading === 'pending';
  const showNoResult = !isLoading && !showResultList && showInputKeyword && input !== '';
  return (
    <S.Container>
      {isLoading && <Loading />}
      {!isLoading && showInputKeyword && <ResultItem sick={{ sickCd: '', sickNm: input }} />}
      {showRecentQueries && <RecentQueries setInput={setInput} />}
      {!isLoading && showResultList && <ResultList sickList={sickList} />}
      {showNoResult && <NoResult />}
      {showRecentQueries && <RecommendQueryButtons setInput={setInput} />}
    </S.Container>
  );
};

interface IRecommendBoxProps {
  input: string;
  setInput: (input: string) => void;
  sickList?: ISickList;
  showRecentQueries: boolean;
}

export default RecommendBox;

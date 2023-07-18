import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { useSickService } from '../context/sickContext';
import { iSickChild } from '../interfaces/iSickList';
import { setError, setLoading, setSickList } from '../redux/sickReducer';
import { getSickListByQueryThunk } from '../redux/sickAsyncThunks';

const useSickList = (): ISickListReturn => {
  const { sickList, loading, error } = useSelector((state: RootState) => state.sickReducer);
  const { getSickListByQuery } = useSickService();
  const dispatch = useAppDispatch();
  const handleClearList = () => {
    dispatch(setSickList([]));
  };
  const handleSetLoading = (loading: string) => {
    dispatch(setLoading(loading));
  };
  const handleFetchSickList = async (query: string) => {
    if (query === '') return;
    const callback = () => {
      return getSickListByQuery(query)();
    };
    try {
      await dispatch(getSickListByQueryThunk(callback)).unwrap();
    } catch (e) {
      dispatch(setError(e));
    }
  };

  return {
    loading,
    error,
    handleFetchSickList,
    sickList,
    handleClearList,
    setLoading: handleSetLoading,
  };
};

interface ISickListReturn {
  loading: string;
  error: string | null;
  handleFetchSickList: (query: string) => void;
  sickList: iSickChild[] | undefined;
  handleClearList: () => void;
  setLoading: (loading: string) => void;
}
export default useSickList;

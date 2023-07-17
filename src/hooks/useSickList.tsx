import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { useSickService } from '../context/sickContext';
import { getSickListByQueryThunk } from '../redux/sickAsyncThunks';
import { iSickChild } from '../interfaces/iSickList';
import { setError, setLoading } from '../redux/sickReducer';
import { useState } from 'react';
import { getRecommendQueryAction, getSickListByQueryFromCachedListAction } from '../redux/sickAsyncActions';

const useSickList = (): ISickListReturn => {
  const { loading, error } = useSelector((state: RootState) => state.sickReducer);
  const [sickList, setSickList] = useState<iSickChild[] | undefined>([]);
  const { getSickListByQuery } = useSickService();
  const dispatch = useAppDispatch();

  const handleGetSickList = async (query: string) => {
    try {
      const list = await dispatch(getSickListByQueryFromCachedListAction(query));
      if (list) {
        setSickList(list);
      } else {
        await dispatch(
          getSickListByQueryThunk({
            getSickListByQuery,
            query,
          }),
        ).unwrap();
        const list = await dispatch(getSickListByQueryFromCachedListAction(query));
        setSickList(list);
      }
    } catch (e) {
      dispatch(setError(e));
    }
  };

  const handleClearList = () => {
    setSickList([]);
  };
  const handleGetRecommendQueries = () => {
    return dispatch(getRecommendQueryAction());
  };

  const handleSetLoading = (loading: string) => {
    dispatch(setLoading(loading));
  };

  return {
    loading,
    error,
    handleGetSickList,
    sickList,
    handleClearList,
    handleGetRecommendQueries,
    setLoading: handleSetLoading,
  };
};

interface ISickListReturn {
  loading: string;
  error: string | null;
  handleGetSickList: (query: string) => Promise<void>;
  sickList: iSickChild[] | undefined;
  handleClearList: () => void;
  handleGetRecommendQueries: () => Promise<string[]>;
  setLoading: (loading: string) => void;
}

export default useSickList;

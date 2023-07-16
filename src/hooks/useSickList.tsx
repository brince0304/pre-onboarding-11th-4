import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { useSickService } from '../context/sickContext';
import { getSickListByQueryThunk } from '../redux/sickAsyncThunks';
import { iSickChild } from '../interfaces/iSickList';
import { setError } from '../redux/sickReducer';
import { useState } from 'react';
import { getSickListByQueryFromCachedList } from '../redux/sickAsyncActions';

const useSickList = (): ISickListReturn => {
  const { loading, error } = useSelector((state: RootState) => state.sickReducer);
  const [sickList, setSickList] = useState<iSickChild[] | undefined>([]);
  const { getSickListByQuery } = useSickService();
  const dispatch = useAppDispatch();

  const handleGetSickList = async (query: string) => {
    try {
      const list = await dispatch(getSickListByQueryFromCachedList(query));
      if (list) {
        setSickList(list);
      } else {
        await dispatch(
          getSickListByQueryThunk({
            getSickListByQuery,
            query,
          }),
        ).unwrap();
        const list = await dispatch(getSickListByQueryFromCachedList(query));
        setSickList(list);
      }
    } catch (e) {
      dispatch(setError(e));
    }
  };

  const handleClearList = () => {
    setSickList([]);
  };

  return { loading, error, handleGetSickList, sickList, handleClearList };
};

interface ISickListReturn {
  loading: string;
  error: string | null;
  handleGetSickList: (query: string) => Promise<void>;
  sickList: iSickChild[] | undefined;
  handleClearList: () => void;
}

export default useSickList;

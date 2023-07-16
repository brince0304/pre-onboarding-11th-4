import * as S from './RecommendBox.style';
import { ISickList } from '../../interfaces/iSickList';
const RecommendBox = ({ sickList }: IRecommendBoxProps) => {
  return (
    <S.Container>
      {sickList &&
        sickList.map((sick, index) => {
          return (
            <div>
              <div>{sick.sickNm}</div>
            </div>
          );
        })}
    </S.Container>
  );
};

interface IRecommendBoxProps {
  sickList?: ISickList;
}

export default RecommendBox;

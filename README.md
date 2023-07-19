# ‼️과제 핵심 요구사항 및 배포링크
- https://mellifluous-strudel-82634a.netlify.app/
  - 클릭시 배포된 링크로 이동됩니다.

- 검색창 구현 (해당 사이트의 검색창을 클론)
    
    [한국임상정보](https://clinicaltrialskorea.com/) <- 클릭시 원본 페이지로 이동됩니다.
    
- 검색어 추천 기능 구현
- 캐싱 기능 구현 (캐싱 기능을 제공하는 라이브러리 사용 금지, 만료기한을 구현할 경우 가산점)
- 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행
- 키보드로 조작 가능하도록 구현

# **🛠 의존성과 스택**
<img src='https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white' /> <img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white"> <img src="https://img.shields.io/badge/Eslint-4B32C3?style=for-the-badge&logo=Eslint&logoColor=white" /> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white" /> <img src="https://img.shields.io/badge/Husky-00C65E?style=for-the-badge&logo=Husky&logoColor=white" />

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white" /> <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white">

<img src="https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white" /> <img src="https://img.shields.io/badge/Emotion-DB7093?style=for-the-badge&logologoColor=white" />
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white" />

# ⚙️ 설치 및 실행

### 깃 레파지토리 클론

    git clone https://github.com/brince0304/pre-onboarding-11th-4

### 설치 경로로 이동

    cd pre-onboarding-11th-4

### 설치

    npm install
    
### 실행
서버는 concurrently 로 클라이언트와 동시에 실행됩니다. 

    npm start
    

# ⁉️요구사항별 구현내용

## 🤔 검색창 구현

- 검색창 구현은 최대한 원본 사이트의 검색창과 비슷하도록 클론하였습니다.
- form 에 포커스하면 추천검색어 창이 등장하도록 구현하였고, 해당 부분은 useChildBox 커스텀 훅을 구현하여 document.addEventListener 로 마운트시에 외부 영역을 클릭할때 상태값을 변경하도록 하여 컨트롤하였습니다.

```tsx
// useChildBox.tsx
const useChildBox = (ref: RefObject<HTMLElement>) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return { isFocus, setIsFocus };
};
```

 ![image](https://github.com/brince0304/pre-onboarding-11th-4/assets/110673427/556928a9-0715-4b97-818c-c9c0a9fde249)


- **최근 검색어 기능을 구현하여 로컬스토리지에서 검색어를 저장하고 조회,삭제 할 수 있도록 구현하였습니다.**
    - 해당 기능은 컨텍스트 api 를 사용하여 구현하였고, 질병 리스트 서비스 클래스와 다르게 단순히 레포지토리만 구현하고 계속 바뀔 수 있는 상태값을 가질 수 있기 때문에 커스텀 훅으로 상태값만 가져오거나 핸들링 할 수 있도록 구현하여 코드 중복을 줄였습니다.

## 🤔 검색어 추천 기능 구현 / 캐싱

- 가장 최상단에서 내려주는 서비스 **클래스의 메서드 안에서** 캐싱 기능을 구현하였습니다.
    - **클래스안에 cachedData 멤버변수를 선언하여 인스턴스화 시에 배열을 초기화하도록 하였고, 메서드가 호출될시 배열에서 존재하는 데이터를 확인 후 없다면 api를 호출하도록 구현하였습니다.**
        - 리스트는 redux 상태값으로 관리하도록 구현하였고, redux thunk 를 통하여 pending, fulfilled, rejected 상황 핸들링을 리덕스 비즈니스 로직을 담는 커스텀 훅과 분리하여 reducer 에서 관리하였습니다.
    - **만료기간은 5분으로 설정하여 매번 메서드 호출시에 새로 캐시데이터를 갱신하도록 구현하였습니다.**
        - 기존에는 redux 를 통하여 redux 상태값에 캐시 데이터를 저장하여 여러개의 함수를 선언하여 (캐시데이터가 존재하는지 확인하는 함수, fetch함수, dispatch를 실행하는 핸들러 함수) 구현하였지만 코드의 가독성을 보완하기 위해 구조를 변경하였습니다.
        - 화요일 세션에서 클로저를 학습한 후에 캐싱을 클로저로 구현 할 수 있을까 했지만 이미 비즈니스 로직을 클래스 메서드로 관리하고 있었고, context api 를 통하여 인스턴스를 공유하고있었기 때문에 불필요한 실험적인 행동은 지양하고 private 멤버변수를 선언하여 캡슐화 & 캐싱을 구현하였습니다.
    - 클래스 내에서만 사용되는 메서드를 제외하고 fetch 메소드를 context api를 통하여 전역에서 사용할 수 있도록 해주었습니다.

```tsx
// sickService.tsx
export class SickService implements SickServiceInterface {
  private axiosClient: AxiosInstance;
  private cachedData = [] as ISickCache[];

  constructor(axiosClient: AxiosInstance) {
    this.axiosClient = axiosClient;
  }

  getCachedData = (query: string) => {
    return this.cachedData.find((item) => item.query === query);
  };

  clearCachedData = (query: string) => {
    this.cachedData = this.cachedData.filter((item) => item.expireTime > Date.now());
  };

  addToCachedData = (query: string, sickList: iSickChild[]) => {
    this.cachedData.push({
      query: query,
      sickList: sickList,
      expireTime: getDefaultExpireTime(),
    });
  };

  getSickListByQuery = async (query: string) => {
    this.clearCachedData(query);
    const data = this.getCachedData(query);
    if (data) {
      return data.sickList;
    }
    try {
      console.info('calling api');
      const { data } = await this.axiosClient.get(getSickURL(query));
      const spliced = data.splice(0, 7);
      this.addToCachedData(query, spliced);
      return spliced as ISickList;
    } catch (error) {
      throw new Error(error as string);
    }
  };
}
```

## 🤔 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

- useDebounce 훅을 구현하여, 콜백함수와 딜레이타임을 매개변수로 받아 실행하도록 구현하였습니다.
- useEffect 훅을 사용하여 입력값이 바뀔때마다 debounce 된 콜백함수를 실행하도록 구현하였습니다.

```tsx
// useDebounce.tsx
function useDebounce<T extends any[]>(callback: (...params: T) => void, time: number) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  return (...params: T) => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      callback(...params);
      timer.current = null;
    }, time);
  };
}
```

```tsx
// SearchForm.tsx
const debouncedHandleFetchList = useDebounce(async () => {
    await handleFetchSickList(value);
  }, 300);

  useEffect(() => {
    if (value === '') handleClearList();
    debouncedHandleFetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
```

## 🤔키보드로 조작 가능하도록 구현

- handleSelectKeydown 훅을 구현하여 **상태값으로 인덱스를 갖고있도록** 하였고, 선택이 가능하도록 구현할 **div RefObject 를 전달받아 콜백함수를 실행하도록** 하였습니다.
- 콜백함수는 밸류값을 매개변수로 전달하는 함수로 , **해당 밸류값은 boxRef.querySelector 를 통해 dataset attribute 의 값을 검색해 해당 element 가 존재한다면 data-value의 값을 가져와 매개변수로 전달하도록** 하였습니다.
- 엔터시에는 기존 서브밋 콜백함수가 실행되도록 구현했고, 인풋이 focus 되어있는 상황에서는 기본적으로 엔터시에는 검색을 진행하도록 구현했습니다. selectedIndex 가 0 이상일때는 키보드로 선택한 검색어를 엔터시에 검색하도록 구현하여 이벤트 충돌을 방지하였습니다.
- 기존에는 props drilling 을 방지하고자 document.getElementsByClassName()를 통하여 className 에 선택된 아이템일시에 'selected'를 포함하도록 구현하여 실행하도록 했지만 직접적인 DOM 조작을 지양하기 위해 로직을 변경하였습니다.


```tsx
// useSelectKeydown.tsx
const useSelectKeydown = ({ listLength, callback, ref }: IUseSelect) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleSubmitSelected = () => {
    if (selectedIndex >= 0 && selectedIndex < listLength) {
      const selectedElement = ref.current?.querySelector(`[data-index="${selectedIndex}"]`);
      if (selectedElement) {
        const value = selectedElement.getAttribute('data-value');
        if (value) {
          callback(value);
        }
      }
    }
  };

  const handleKeydown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % listLength);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + listLength) % listLength);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSubmitSelected();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setSelectedIndex(-1);
    }
  };

  useEffect(() => {
    setSelectedIndex(-1);
  }, [listLength]);

  return { selectedListItemIndex: selectedIndex, handleKeydownSelect: handleKeydown };
};
```

❣️마지막 4주차 과제까지 진행하면서 정말 많은 실력향상과 리액트, 자바스크립트의 매력을 다시 한번 느끼게 되었습니다. 고생해주신 멘토님 너무 수고 많으셨습니다!❣️

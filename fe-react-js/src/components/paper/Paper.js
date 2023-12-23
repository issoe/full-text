import { postSearchHistory } from '@/services/searchService';
import { storeLocal } from '@/store';
import { useNavigate } from 'react-router-dom';

function Paper({ keyword, children }) {
  const userInfo = storeLocal((state) => state.userInfo);

  const navigate = useNavigate();

  const handleSearchByTopHit = () => {
    navigate(`/result?q=${keyword}`);
    postSearchHistory({
      userId: userInfo.email,
      keyword: keyword,
    })
      .then((res) => {
        console.log('call api save history', res);
      })
      .catch((error) => {
        console.log('ERROR in Search component when call api save history', error);
      });
  };

  return (
    <div onClick={() => handleSearchByTopHit()} className="shadow-md rounded-[8px] hover:cursor-pointer hover:bg-[]">
      {children}
    </div>
  );
}

export default Paper;

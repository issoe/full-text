import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Item from '@/components/search/Item';
import Layout from '@/components/layout/Layout';
import { getDocumentBySearch } from '@/services/searchService';

const Result = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q');

  const [myData, setData] = useState([]);
  // const searsearchTermch

  useEffect(() => {
    console.log('location:', searchTerm);
    if (searchTerm) {
      // axios.get(`http://127.0.0.1:5000/search?q=${searchTerm}`)
      getDocumentBySearch(searchTerm)
        .then((response) => {
          // response.data = list object
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          // setError(error);
          console.log('error');
        });
    }
  }, [searchTerm]);

  return (
    <>
      <dialog id="my_modal_loading_page" className="modal">
        <div className="w-auto h-auto modal-box text-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      </dialog>
      <Layout active={1}>
        <div className="mx-8 mt-2">
          {/* <div>Do you mean: <div className="font-bold inline-block">...</div></div> */}
          <div>Keyword: 
            {/* <div className="font-bold inline-block">{myData.length} results</div> with :    */}
            <div className="font-bold inline-block">{searchTerm}</div> in total <div className="font-bold inline-block">{myData.length} files</div>
          </div>
          {/* <div className='font-bold inline-block'>Top results</div>
          <div className="flex justify-around">
              <div>One</div>
              <div>Two</div>
              <div>Three</div>
              <div>Three</div>
          </div> */}
        </div>
        <div>
          <ul>
            {myData &&
              myData.map((item, index) => (
                <div className="mb-4" key={index}>
                  <Item category={item.category} filename={item.filename} list={item.highlights} />
                </div>
              ))}
          </ul>
        </div>
      </Layout>
    </>
  );
};

export default Result;

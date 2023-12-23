import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import app from '../firebase';
import { getDocument, getTopHits } from '@/services/homeServices';
import Layout from '@/components/layout/Layout';
import FilesList from '@/components/file/FilesList';
import FileItem from '@/components/file/FileItem';
import Pagination from '@/components/paginantion/Pagination';
// import Searching from '@/components/search/Searching';
// import Searchingg from '@/components/search/Searchingg';
// import ViewPdf from '@/components/search/ViewPdf';

import { storeLocal } from '@store';

import { pdfjs } from 'react-pdf';
import Paper from '@/components/paper/Paper';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

function Home() {
  // firebase
  const auth = getAuth(app);

  // useNavigate
  const navigate = useNavigate();

  //store
  const setUserInfo = storeLocal((state) => state.setUserInfo);
  const userInfo = storeLocal((state) => state.userInfo);
  const [totalPages, setTotalPages] = useState(12);

  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  //state
  const [topHits, setTopHits] = useState([]);

  useEffect(() => {
    const idSetTimeout = setTimeout(() => {
      document?.getElementById('my_modal_loading_page')?.close();
    }, 1000);

    document?.getElementById('my_modal_loading_page')?.showModal();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setTimeout(() => {
          clearTimeout(idSetTimeout);
          navigate('/');
        }, 1000);
      }
      setUserInfo({
        uid: user?.uid,
        email: user?.email,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps

    getDocument(currentPage - 1).then((res) => {
      // console.log(res);
      setData(res?.content);
      setTotalPages(res?.totalPages);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    getTopHits()
      .then((res) => {
        setTopHits(res);
      })
      .catch((error) => {
        console.log('Error in HomePage when call api getTopHits: ', error);
      });
  }, []);

  return (
    <>
      <dialog id="my_modal_loading_page" className="modal">
        <div className="w-auto h-auto modal-box text-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      </dialog>
      <Layout active={1}>
        <div className="flex flex-col h-full pb-[60px]">
          <div className="mx-5 my-2 flex flex-wrap gap-x-4 gap-y-2">
            {/* <h1 className="font-bold underline my-auto">Top hit:</h1> */}
            {/* <div className="list__top-hit"> */}
            {/* {topHits?.map((item, index) => {
              return (
                <Paper key={index} keyword={item.keyword}>
                  <p className="relative px-2">
                    {item.keyword}
                    <strong className="absolute right-[-2px] top-[-2px] text-[12px]">{item.count}</strong>
                  </p>
                </Paper>
              );
            })} */}
            {/* </div> */}
          </div>
          <FilesList className="grid grid-cols-2 gap-4 flex-1">
            {data?.map((file, index) => {
              return (
                <FileItem
                  className=""
                  idDriver={file.id_drive}
                  key={index}
                  title={file.filename}
                  author={file.upload_mail}
                  date={file.create_on}
                  type={file.filetype}
                ></FileItem>
              );
            })}
          </FilesList>
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} length={totalPages}></Pagination>
        </div>
      </Layout>
    </>
  );
}

export default Home;

import { CiCalendarDate } from 'react-icons/ci';
import { CiUser } from 'react-icons/ci';
import { MdOutlineTitle } from 'react-icons/md';
import { FaFileAlt } from 'react-icons/fa';
import { CiCircleInfo } from 'react-icons/ci';
import { FaRegFilePdf } from 'react-icons/fa';
import pdfImg from './pdf.png';
import pngImg from './png.png';
import { useNavigate } from 'react-router-dom';

function FileItem({ idDriver, title, author, date, type }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/detail-document/q=' + idDriver);
  };

  return (
    <li
      className="card w-90 h-auto bg-[#F5F5F5] shadow-md grid grid-cols-6 gap-4 hover:cursor-pointer hover:opacity-75"
      onClick={() => handleNavigate()}
    >
      

      {type === 'png' ? 
        <div className="w-full h-full col-span-1 pl-3 flex items-center">
          <img src={pngImg} alt="pdf-img" />
        </div>
        : 
        <div className="w-full h-full col-span-1 pl-3 flex items-center">
          <img src={pdfImg} alt="pdf-img" />
        </div>
      }

      <div className="p-2 col-span-5">
        <div className="font-bold p-0 m-0">
          <MdOutlineTitle className="inline-block mx-2" />
          Title: {title}
        </div>
        <h4 className="font-medium p-0 m-0">
          <CiUser className="inline-block mx-2" />
          Uploaded by: {author}
        </h4>
        <h4 className="font-medium p-0 m-0">
          <CiCalendarDate className="inline-block mx-2" />
          Uploaded at: {date}
        </h4>
        <p>
          <CiCircleInfo className="inline-block mx-2" />
          Content: If a dog chews shoes whose shoes does he choose?
        </p>
      </div>
    </li>
  );
}

export default FileItem;

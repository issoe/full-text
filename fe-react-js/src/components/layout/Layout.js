import BaseNav from '../nav/BaseNav';
import TheHeader from './TheHeader';
import Footer from './Footer';

function Layout({ active, pageName, children }) {
  return (
    <div className="container mx-auto h-screen bg-[#111827]">
      <div className='flex'>
        <div className="bg-[#111827] text-white w-[25%] h-auto max-w-[400px]">
          <BaseNav active={active}></BaseNav>
        </div>
        <div className="flex flex-col bg-[#F2F2F2] overflow-auto flex-1 h-screen">
          <TheHeader />
          <div className="relative bg-[white] w-full flex-1">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

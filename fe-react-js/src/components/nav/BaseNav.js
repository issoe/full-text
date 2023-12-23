import { useEffect, useState } from 'react';

import NavList from './NavList';
import NavItem from './NavItem';
import Button from '../button/Button';
import { navList, otherNav } from '@/store/dummyData';
import Paper from '@/components/paper/Paper';
import { getDocument, getTopHits } from '@/services/homeServices';


function BaseNav({ active }) {
  const [topHits, setTopHits] = useState([]);

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
    <div className="w-[80%] h-auto mx-auto my-4">
      {/* eslint-disable jsx-a11y/alt-text */}
      <img
        atl="icon"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
        className="h-[64px] object-contain"
      />
      
      {/* <NavList>
        {navList.map((item, index) => {
          return <NavItem item={item} key={index} active={active} />;
        })}
      </NavList> */}
      Welcome <div className='inline-block underline'>khanhpq.fs@gmail.com</div>
      <div className='font-bold text-lg mt-2'>Details</div>
      <div className="w-full h-[1px] bg-[#FFF]"></div>
      <ul className='list-disc relative'>
        <li className='ml-4'>Keyword: xyz</li>
        <li className='ml-4'>File: SRS file name.pdf</li>
        <li className='ml-4'>Created: khanhpq@gmail.com</li>
        <li className='ml-4'>Date: 20-10-2023</li>
        <li className='ml-4'>Views: 2023</li>
      </ul>
      {/* <div className='w-full grid justify-items-center my-1'><button className='bg-[red] p-1 rounded-lg '>Download</button></div> */}
      
      <div className='font-bold text-lg mt-2'>Top trending</div>
      <div className="w-full h-[1px] bg-[#FFF] my-1"></div>
            {topHits?.map((item, index) => {
              return (
                <Paper key={index} keyword={item.keyword}>
                  <div className="relative hover:bg-[#6465F1]">
                    <div className='inline-block bg-[#6465F1] px-2 my-1 mx-2 rounded-full'>{index + 1}</div>
                    <div className='inline-block'>{item.keyword}</div>
                    <strong className="absolute right-[0px] mr-2">{item.count}</strong>
                  </div>
                </Paper>
              );
            })}
      {/* <NavList>
        {otherNav.map((item, index) => {
          return <Button item={item} key={index} />;
        })}
      </NavList> */}
      {/* <div className='font-bold text-lg mt-2'>Recently</div>
      <div className="w-full h-[1px] bg-[#FFF]"></div>
      <div>1. abc.pdf</div>
      <div>2. abc.pdf</div>
      <div>3. abc.pdf</div>
      <div>4. abc.pdf</div> */}

      <div className='font-bold text-lg mt-2'>Top documents</div>
      <div className="w-full h-[1px] bg-[#FFF]"></div>
      <div>1. abc.pdf</div>
      <div>2. abc.pdf</div>
      <div>3. abc.pdf</div>
      <div>4. abc.pdf</div>
    </div>
  );
}

export default BaseNav;

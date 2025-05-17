import React from 'react';
import logo from "../images/logo.png";

const EditiorNavbar = () => {
  return (
    <>
      <div className="EditiorNavbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
        <div className="logo">
          <img className='w-[150px] cursor-pointer' src={logo} alt="" />
        </div>
        <p>File / <span className='text-[gray]'>My Project</span></p>
       
        <div className='p-[1px] btn bg-black rounded-[1px]'></div>
      </div>
    </>
  );
};

export default EditiorNavbar;

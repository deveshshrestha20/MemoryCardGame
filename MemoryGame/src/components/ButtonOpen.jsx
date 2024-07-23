import React from 'react';

const ButtonOpen = ({ handleClick, title }) => {
  return (
    <div className='bg-orange-600 m-3 rounded-lg text-center h-8 '>
      <button onClick={handleClick} className=' text-xl text-green-900'>
        {title}
      </button>
    </div>
  );
};

export default ButtonOpen;

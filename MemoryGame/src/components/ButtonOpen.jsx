import React from 'react';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

const ButtonOpen = ({ handleClick, title }) => {
  return (
    <div className='flex flex-row  justify-center items-center mx-auto bg-timeColor m-3 rounded-2xl text-center h-10 w-36 hover:bg-opacity-80'>
      
      <button onClick={handleClick} className='  text-xl ml-4 text-sky-400  '>
        {title}
        <div className='absolute top-5 left-8'><PlayArrowRoundedIcon/></div>
      </button>
    </div>
  );
};

export default ButtonOpen;

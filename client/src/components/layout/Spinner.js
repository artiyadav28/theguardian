// import React from 'react';
// // import spinner from './spinner.gif';

// const spinner= ()=>(
//     <>
//     {/* <img 
//     src={spinner}
//     style={{width: '200px', margin: 'auto', display: 'block'}}
//     alt='Loading...'
//     /> */}
//     <h3>loading ...</h3>
//     </>
// )
// export default spinner;
import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularColor() {
  return (
    <>
    <Stack sx={{ color: 'grey.500', mt:5 }} spacing={2} direction="row">
      <CircularProgress style={{color:'#e47a98'}} />
    </Stack>
    </>
  );
}
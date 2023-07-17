import { Box, Typography } from '@mui/material';

const Loading = () => {
  return (
    <Box sx={{marginLeft:'20px'}}>
    <Typography fontSize={'14px'} color={'#999'}>검색 중..</Typography>
    </Box>
  );
};

export default Loading;

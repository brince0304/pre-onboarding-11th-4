import { Box, Typography } from '@mui/material';

const NoResult = () => {
  return (
    <Box sx={{ marginLeft: '20px', padding: '10px 0px' }}>
      <Typography fontSize={'14px'} color={'#999'}>
        추천 검색어가 존재하지 않습니다.
      </Typography>
    </Box>
  );
};

export default NoResult;

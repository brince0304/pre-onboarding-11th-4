import { Box, Typography } from '@mui/material';

const Error = () => {
    return (
        <Box sx={{ marginLeft: '20px' }}>
            <Typography fontSize={'14px'} color={'#999'}>
                검색 중 오류가 발생했습니다.
            </Typography>
        </Box>
    );
};

export default Error;

import React, { FC } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

interface Props {
    total: number
}

const PaginationButtons:FC<Props> = ({ total }) => {
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const path = location.pathname
    const page = searchParams.get('page')
    const argPage = Math.trunc(Number(page))
    const newPage = (_: React.ChangeEvent<unknown>, page: number) => navigate(`${path}?page=${page}`)
  return (
    <Stack spacing={2}>
      <Pagination count={total} showFirstButton showLastButton disabled={false} onChange={newPage} shape='rounded' page={argPage || 1}/>
    </Stack>
  );
}

export default PaginationButtons
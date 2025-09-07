import React from 'react';

import { Stack } from '@mui/material';

interface CardListProps {
  children: React.ReactNode;
}

const CardList: React.FC<CardListProps> = ({ children }) => (
  <Stack
    direction={{ xs: 'column', md: 'row' }}
    flexWrap="wrap"
    justifyContent="flex-start"
    alignItems="flex-start"
    gap={4}
  >
    {children}
  </Stack>
);

export default CardList;
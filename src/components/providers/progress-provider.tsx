'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ReactNode } from 'react';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

const Providers = ({ children }:{
    children:ReactNode
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ProgressBar
        height="4px"
        color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting={true}
        disableAnchorClick
      />
</QueryClientProvider>
  );
};

export default Providers;
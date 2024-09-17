'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { Toaster } from '../ui/toaster';






const Providers = ({ children }:{
    children:ReactNode
}) => {
  return (
    <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem
    disableTransitionOnChange
    >
      {children}
      <Toaster />
      <ProgressBar
        height="4px"
        color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </ThemeProvider>
  );
};

export default Providers;
'use client';

import { ReactNode } from "react";
import { SWRConfig } from "swr";


export const Provider = ({children}:{
    children:ReactNode
}) => {
    return <SWRConfig>{children}</SWRConfig>
}
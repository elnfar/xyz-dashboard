'use client'

import { Button } from "@/components/ui/button";
import { useState } from "react";


export default function ClipboardButton({value}:{
    value:string
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value) 
          .then(() => {
            setCopied(true); 
            setTimeout(() => {setCopied(false)},2000)
          })
          .catch((err) => {
            console.error('Failed to copy: ', err);
          });
      };
  return (
   <Button onClick={handleCopy}>{copied ? 'Copied' : 'Copy'}</Button>
  )
}

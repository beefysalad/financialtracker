import React from "react";

export const Footer = () => {
  return (
    <footer className='bg-background/80 backdrop-blur-lg border-t border-zinc-800 shadow-sm py-4'>
      <div className='flex items-center justify-center'>
        <p className='text-sm  font-mono tracking-wider'>
          © 2025{" "}
          <a
            href='https://www.ptrckk.dev/'
            target='_blank'
            rel='noopener noreferrer'
            className=' hover:underline'
          >
            PTRCK.DEV
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

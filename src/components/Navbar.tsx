'use client'
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';


export default function Navbar(){
  const[showMenu, setShowMenu] = useState(false);

  const handleCloseMenu = () => {
    setShowMenu(false);
  };
  
  return (
    
      <nav className="top-0 left-0 w-full bg-black z-50 px-4 py-2 md:px-8 flex justify-between items-center">
        <div>
          <Image unoptimized src="/logo_Clube_Rede.png" alt="Logo Clube Rede" width={50} height={50} />
        </div>
        {/* <div className="md:hidden">
          <button onClick={() => setShowMenu(!showMenu)} type="button" className="inline-flex items-center justify-center p-2 text-gray-500 rounded-lg focus:text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <div className="hidden md:flex md:items-center md:gap-6 md:text-white">
          <ul className="flex flex-col items-center gap-8 md:flex-row md:gap-6">
            <li>
              <a className="text-white hover:text-red-700" href="#home">Início</a>
            </li>
            <li>
              <a className="text-white hover:text-red-700" href="#descontos">Descontos</a>
            </li>
          </ul>
        </div>
        <AnimatePresence>
          {showMenu && (
            <>
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 w-full h-full z-40 flex flex-col items-center justify-center bg-black bg-opacity-90 md:hidden"
              >
                <ul className="flex flex-col items-center gap-8" onClick={handleCloseMenu}>
                  <li>
                    <a className="text-white hover:text-red-700" href="#home">Início</a>
                  </li>
                  <li>
                    <a className="text-white hover:text-red-700" href="#descontos">Descontos</a>
                  </li>
                </ul>
              </motion.div>
              <div
                className="fixed top-0 left-0 w-full h-full z-30 bg-black bg-opacity-50 md:hidden"
                onClick={handleCloseMenu}
              ></div>
            </>
          )}
        </AnimatePresence> */}
      </nav>
  );
};

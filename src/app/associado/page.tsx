
'use client'
import { useState } from "react";
import Image from "next/image";


export default function Associado(){
  const[showMenu, setShowMenu] = useState(false);

  return (
    <nav className="flex justify-between items-center w-[92%]  bg-black mx-auto">
      <div>
        <Image src="/logo_Clube_Rede.png" className="m-5" alt="Logo Clube Rede" width={100} height={50}></Image>  
      </div>
      <div data-collapse="collapse" className={`${showMenu == true? '': "hidden"} z-10 transition-all duration-400 ease-in-out justify-center text-center lg:block bg-black nav-links md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[14%] md:w-auto  w-full flex items-center px-5 text-white`}>
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <a className="text-white hover:text-red-700" href="#home">Início</a>
            </li>
            <li>
              <a className="text-white hover:text-red-700" href="#sobre">Descontos</a>
            </li>
          </ul>
      </div>
      <div className="flex items-center gap-6 z-20">
        <button onClick={() => setShowMenu(!showMenu)} type="button" className={`md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 focus:text-white rounded-lg`} aria-controls="navbar-default" aria-expanded="false">
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>
    </nav>
 )   
}
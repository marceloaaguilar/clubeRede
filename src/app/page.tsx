'use client'
import Image from "next/image";
import 'animate.css';
import { useState } from "react";

export default function Home() {
  const[showMenu, setShowMenu] = useState(false);
  return (
    <main className="scroll-smooth">
       <nav className="flex justify-between items-center w-[92%]  mx-auto">
            <div>
              <Image src="/logo_Clube_Rede.png" className="m-5" alt="Logo Clube Rede" width={100} height={50}></Image>  
            </div>
            <div data-collapse="collapse" className={`${showMenu == true? '': "hidden"} transition-all duration-400 ease-in-out justify-center text-center lg:block bg-black nav-links md:static absolute md:min-h-fit min-h-[100vh]  left-0 top-[11%] md:w-auto mt-8 w-full flex items-start px-5`}>
                <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                  <li>
                    <a className="hover:text-red-700" href="#home">Início</a>
                  </li>
                  <li>
                    <a className="hover:text-red-700" href="#sobre">Conheça o Clube</a>
                  </li>
                  <li>
                      <a className="hover:text-red-700" href="#parceiros">Nossos Parceiros</a>
                  </li>
                  <li>
                      <a className="hover:text-red-700" href="#descontos">Descontos</a>
                  </li>
                  <li>
                    <button className="bg-red-700 text-white px-10 py-2 rounded-full hover:bg-red-900 mt-2">Ver Descontos</button>
                  </li>
                  <li>
                    <button className="bg-transparent border-2 border-red-700 text-white px-5 py-2 rounded-full hover:bg-red-800 hover:border-white">Área do Associado</button>
                  </li>
                </ul>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => setShowMenu(!showMenu)} type="button" className={`md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 focus:text-white rounded-lg`} aria-controls="navbar-default" aria-expanded="false">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
              </button>
            </div>
        </nav>

      <div id="home" className="flex items-center justify-start h-screen" style={{background: "url('/family.jpg')",  width: '100%', objectFit: 'cover',backgroundPosition: '60% 50%',  backgroundRepeat: 'no-repeat'}}>
        <div className="p-6 ml-6">
          <h3 className="text-2xl font-bold">Bem-vindo ao Clube de Descontos Rede Veículos!</h3>
          <p className="mb-4">Descontos que fazem você acelerar!</p>
          <a href="#sobre" className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-10 w-1/2">Ver Mais</a>
        </div>
      </div>

      <div id="sobre"className="flex-col items-center justify-center bg-black-500 p-10">
        <div className="flex-col bg-red-800 mt-4 p-8 rounded text-center">
          <h4 className="text-4xl font-semibold mt-4">Como funciona o Clube</h4>
          <div className="flex flex-wrap items-center justify-center pb-5">
            <div className="flex-col items-center justify-center p-6 text-center w-72 h-56 animate__animated animate__zoomInLeft wow">
              <div className="flex items-center text-red-700">
                <div className="bg-black mt-5 mb-4 text-6xl rounded-full w-full">01</div>
              </div>
              <h4 className="text-lg font-bold">Participe</h4>
              <p>Faça parte do nosso Clube e tenha acesso aos benefícios. É prático!</p>
            </div>

            <div className="flex-col items-center justify-center p-6 text-center w-72 h-56 animate__animated animate__zoomInLeft wow">
              <div className="flex items-center text-red-700">
                <div className="bg-black mt-5 mb-4 text-6xl rounded-full w-full">02</div>
              </div>
              <h4 className="text-lg font-bold">Escolha</h4>
              <p>São centenas de benefícios que você pode escolher e usar quantas vezes quiser.</p>
            </div>

            <div className="flex-col items-center justify-center p-6 text-center w-72 h-56 animate__animated animate__zoomInLeft wow">
              <div className="flex items-center text-red-700">
                <div className="bg-black mt-5 mb-4 text-6xl rounded-full w-full">03</div>
              </div>
              <h4 className="text-lg font-bold">Apresente</h4>
              <p>Depois de escolher o benefício que você quer, é só aproveitar.</p>
            </div>

            <div className="flex-col items-center justify-center p-6 text-center w-72 h-56 animate__animated animate__zoomInLeft wow rounded">
              <div className="flex items-center text-red-700">
                <div className="bg-black mt-5 mb-4 text-6xl rounded-full w-full">04</div>
              </div>
              <h4 className="text-lg font-bold">Economize</h4>
              <p>Pronto! Você já está economizando. Use quantas vezes quiser e economize todo dia.</p>
            </div>
      
          </div>

        </div>
      </div>
      
      <div id="parceiros" className="flex-col bg-white w-100 mt-4 p-6 h-full text-center">
        <h4 className="text-black text-4xl mt-5">Grandes marcas,<b> grandes descontos</b>!</h4>
        <div className="grid xl:grid-cols-6 gap-4 mt-9 justify-center w-full">
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/488.png" alt="logoCineart" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/clubemarisa.jpg" alt="logoCineart" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/ponto_pontofrio.jpg" alt="logoCineart" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/clubeDrogasil.jpg" alt="logoCineart" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/Aliexpress_logo.png" alt="logoCineart" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/clube753.jpg" alt="logoCineart" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/djsnlcisjvisjncisdp.png" alt="logoCineart" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/ligoShoestock.png" alt="logoCineart" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/logoMovida250x250px.png" alt="logoCineart" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/clube-348.jpg" alt="logoCineart" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/vivara-logo.png" alt="logoCineart" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/clube-422.jpg" alt="logoCineart" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/clubeDrogaRaia.jpg" alt="logoCineart" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/clube-341.jpg" alt="logoCineart" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/clube-casasbahia.png" alt="logoCineart" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/clubemagalu.jpg" alt="logoCineart" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/LogoPetzCBC250x250.png" alt="logoCineart" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/Dominos.jpg" alt="logoCineart" width={350} height={350}></Image>
        </div>
      </div>

      <div id="descontos" className="flex-col flex bg-zinc-100 pb-10">
        <div className="w-full flex flex-col justify-center p-8">
          <div className="grid xl:grid-cols-3 gap-4 items-center mt-8 xl:p-6">
            <h4 className="text-4xl  font-bold text-black mb-2">Descontos Imperdíveis para você aproveitar.</h4>
            <Image src="/partners.jpg" className="w-full col-span-1 hover:p-3 transition-all" style={{borderRadius: '20px'}} alt="Pizza Dominos" width={300} height={100}></Image>
            <Image src="/loja.jpg" className="w-full col-span-1 hover:p-3 transition-all" alt="Pizza Dominos" width={300} height={100}></Image>
          </div>
          <div className="grid xl:grid-cols-3 gap-4 items-center mt-8 xl:p-6">
            <Image src="/womanSmartphone.jpg" className="w-full object-cover h-80 col-span-1 hover:p-3 transition-all" style={{borderRadius: '20px'}} alt="Pizza Dominos" width={300} height={100}></Image>
            <Image src="/cinema.jpg" className="w-full object-cover col-span-1 h-80 hover:p-3 transition-all" style={{borderRadius: '20px'}} alt="Pizza Dominos" width={300} height={100}></Image>
            <Image src="/childrenNotebook.jpg" className="w-full object-cover h-80 col-span-1 hover:p-3 transition-all" style={{borderRadius: '20px'}} alt="Pizza Dominos" width={300} height={100}></Image>
          </div>
        </div>
          <div className="w-full justify-center flex mt-5">
            <button className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 mt-4 w-56">Ver Descontos</button>
          </div>
      </div>

      <div className="flex justify-center text-center gap-10 bg-black items-center h-52" >
        <Image src="/logo_Clube_Rede.png" alt="Logo Clube Rede" width={100} height={50}></Image>
        <p>Central de Descontos <br/> 0800 940 2195</p>
      </div>
    </main>
  );
}

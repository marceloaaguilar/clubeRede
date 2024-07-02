'use client'
import Image from "next/image";
import 'animate.css';
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { useRouter, useSearchParams } from 'next/navigation'
const AES = require("crypto-js/aes")

const USER_DATA_HASH_URL_PARAM = 'id'

interface IUserData {
  cpf: string,
  password: string,
  companyName: string
}

// TODO: Adicionar as variáveis de ambiente NEXT_PUBLIC_SYSTEM_TOKEN e NEXT_PUBLIC_SECRET
export default function Home() {
  const[showMenu, setShowMenu] = useState(false);
  const [memberDataHash, setMemeberDataHash] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const { push } = useRouter();

  const authenticateMember = async ({ cpf, password, companyName}: IUserData): Promise<boolean> => {
    const response = await fetch('https://api.xpto.com.br/authenticate', {
      body: JSON.stringify({
        cpf,
        password,
        companyName
      }),
      headers: {
        authorization: process.env.NEXT_PUBLIC_SYSTEM_TOKEN ?? ''
      },
      method: 'POST'
    })

    const responseData = await response.json()

    // TODO: Está considerando que a API está retornando um boolean, ajustar isso após testar endpoint
    return responseData 
  }

  const handleMemberAreaButton = async (): Promise<void> => {
    if (!memberDataHash) alert('Associado inválido.')

    const memberData = AES.decrypt(memberDataHash, process.env.NEXT_PUBLIC_SECRET)

    console.log('memberData:', memberData)
    // const isMemberAuthenticated = await authenticateMember(memberData)

    // if (isMemberAuthenticated) {
      push(`associado?${USER_DATA_HASH_URL_PARAM}=${memberDataHash}`)
    // } else alert('Associado não autenticado.')
  }

  useEffect(() => { 
    setMemeberDataHash(searchParams.get(USER_DATA_HASH_URL_PARAM))
  }, [])

  return (
    <main className="scroll-smooth">
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
                <a className="text-white hover:text-red-700" href="#sobre">Conheça o Clube</a>
              </li>
              <li>
                  <a className="text-white hover:text-red-700" href="#parceiros">Nossos Parceiros</a>
              </li>
              <li>
                  <a className="text-white hover:text-red-700" href="#descontos">Descontos</a>
              </li>
              <li>
                <button onClick={() => handleMemberAreaButton()} className="bg-red-700 text-white px-10 py-2 rounded-full hover:bg-red-900 mt-2">Área do Associado</button>
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

      <div id="home" className="flex items-center justify-start w-100 lg:h-screen h-64" style={{background: "url('/family.jpg')",  width: '100%', objectFit: 'cover',backgroundPosition: '70% 50%',  backgroundRepeat: 'no-repeat'}}>
        <div className="p-6 ml-6">
          <h3 className="text-white text-2xl font-bold">Bem-vindo ao Clube de Descontos Rede Veículos!</h3>
          <p className="text-white mb-4">Descontos que fazem você acelerar!</p>
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
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/logoRiachuelo.png" alt="Logo da Riachuelo" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/clubemarisa.jpg" alt="Logo da Loja MArisa" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/ponto_pontofrio.jpg" alt="Logo do Ponto" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/logoSeculos.png" alt="Logo da Loja Seculos" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/Aliexpress_logo.png" alt="Logo do Aliexpress" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/heringLogo.png" alt="Logo da Hering" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/djsnlcisjvisjncisdp.png" alt="Logo Hóteis.com" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/ligoShoestock.png" alt="Logo Shoestock" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/logoMovida250x250px.png" alt="Logo da Movida" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/clube-348.jpg" alt="Logo da Zattini" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/vivara-logo.png" alt="Logo da Vivara" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/clube-422.jpg" alt="Logo da Centauro" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/logoEstacio.png" alt="Logo da Estácio" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/clube-341.jpg" alt="Logo Nethoes" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/clube-casasbahia.png" alt="Logo Casas Bahia" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/clubemagalu.jpg" alt="Logo da Magalu" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/LogoPetzCBC250x250.png" alt="Logo da Petz" width={350} height={350}></Image>
            <Image className="hover:p-3  transition-all w-48 h-48 object-contain" src="/Dominos.jpg" alt="Logo da Dominos" width={350} height={350}></Image>
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
      <Footer/>
    </main>
  );
}

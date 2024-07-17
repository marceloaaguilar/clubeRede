'use client'
import Image from "next/image";
import 'animate.css';
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation'
const AES = require("crypto-js/aes")
const CryptoJS = require("crypto-js")

const MEMBER_DATA_HASH_URL_PARAM = 'id'

export default function Home() {
  const[showMenu, setShowMenu] = useState(false);
  const [memberDataHash, setMemeberDataHash] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const { push } = useRouter();

  const authenticateMember = async (cpf: string, token: string): Promise<boolean> => {
    try {
      const payload = { cpfCnpjCliente: cpf }
      const response = await fetch('https://integracao.redeveiculos.com/api/v2/prod/obterStatusLogin/', {
        body: new URLSearchParams({ json: JSON.stringify(payload) }),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST'
      })

      const responseData = await response.json()

      return responseData.message === 'OK'
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const handleMemberAreaButton = async (): Promise<void> => {
    try {
      if (!memberDataHash) {
        alert('Associado inválido.')
        return
      }

      const memberData = JSON.parse(AES.decrypt(memberDataHash, process.env.NEXT_PUBLIC_SECRET).toString(CryptoJS.enc.Utf8) ?? '')

      const isMemberAuthenticated = await authenticateMember(memberData.cpfCnpjCliente as string, memberData.token as string)

      if (isMemberAuthenticated) {
        push(`associado?${MEMBER_DATA_HASH_URL_PARAM}=${memberDataHash}`)
      } else {
        alert('Associado não autenticado.')
        return
      }
    } catch (error) {
      alert('Associado não autenticado.')
    }
  }

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const images = [
    { src: '/partners.jpg', alt: 'Compras Online', text: 'Desconto em Compras Online' },
    { src: '/loja.jpg', alt: 'Loja', text: 'Ofertas na Loja' },
    { src: '/womanSmartphone.jpg', alt: 'Mulher com Smartphone', text: 'Promoções em Tecnologia' },
    { src: '/cinema.jpg', alt: 'Cinema', text: 'Descontos no Cinema' },
    { src: '/childrenNotebook.jpg', alt: 'Crianças com Notebook', text: 'Economize em Educação' },
    { src: '/shopping.jpg', alt: 'Compras', text: 'Super Descontos em Lojas' },
  ];

  useEffect(() => {
    const memberDataHashParamValue = searchParams.get(MEMBER_DATA_HASH_URL_PARAM)
    setMemeberDataHash(memberDataHashParamValue ? memberDataHashParamValue.replaceAll(' ', '+') : null)
  }, [])

  return (
    <main className="scroll-smooth font-sans">
        <nav className="top-0 left-0 w-full bg-black z-50 px-4 py-2 md:px-8 flex justify-between items-center">
          <div>
            <Image src="/logo_Clube_Rede.png" className="m-5" alt="Logo Clube Rede" width={100} height={50} />
          </div>
          <div className="flex items-center gap-6 z-20">
            <button
              onClick={() => setShowMenu(!showMenu)}
              type="button"
              className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 focus:text-white rounded-lg"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex md:items-center md:gap-[4vw] md:text-white md:text-center">
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
                  <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8" onClick={handleCloseMenu}>
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
                      <a href="/login" className="bg-red-700 text-white px-10 py-2 rounded-full hover:bg-red-900 mt-2">Área do Associado</a>
                    </li>
                  </ul>
                </motion.div>
                <div
                  className="fixed top-0 left-0 w-full h-full z-30 bg-black bg-opacity-50 md:hidden"
                  onClick={handleCloseMenu}
                ></div>
              </>
            )}
          </AnimatePresence>
        </nav>

        <div id="home" className="relative flex items-center justify-start lg:h-screen h-72" style={{background: "url('/family.jpg')",  width: '100%', objectFit: 'cover', backgroundPosition: '70% 50%', backgroundRepeat: 'no-repeat'}}>
          <style>
            {`
            @keyframes slideBackground {
              0% { background-position: 70% 50%; }
              50% { background-position: 30% 50%; }
              100% { background-position: 70% 50%; }
            }

            #home {
              animation: slideBackground 20s infinite alternate;
            }
            `}
          </style>
          <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay para melhor legibilidade do texto */}
          <div className="relative p-6 ml-6 text-left text-white">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ">Bem-vindo ao Clube Rede</h3>
            <p className="text-lg md:text-xl mb-6">Sua rede de descontos</p>
            <a href="#sobre" className="bg-red-500 hover:bg-red-800 text-white font-bold py-3 px-12 rounded-lg shadow-lg transition duration-300">Descubra Mais</a>
          </div>
        </div>



      <div id="sobre" className="bg-red-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-4xl font-bold mb-12">Como funciona o Clube</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-black rounded-lg p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:bg-red-700">
              <div className="bg-red-500 rounded-full h-20 w-20 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold">🔑</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Participe</h3>
              <p>Faça parte do nosso Clube e tenha acesso aos benefícios. É prático!</p>
            </div>
            <div className="bg-black rounded-lg p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:bg-red-700">
              <div className="bg-red-500 rounded-full h-20 w-20 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold">✨</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Escolha</h3>
              <p>São centenas de benefícios que você pode escolher e usar quantas vezes quiser.</p>
            </div>
            <div className="bg-black rounded-lg p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:bg-red-700">
              <div className="bg-red-500 rounded-full h-20 w-20 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold">🎁</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Aproveite</h3>
              <p>Depois de escolher o benefício que você quer, é só aproveitar.</p>
            </div>
            <div className="bg-black rounded-lg p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:bg-red-700">
              <div className="bg-red-500 rounded-full h-20 w-20 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold">💰</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Economize</h3>
              <p>Pronto! Você já está economizando. Use quantas vezes quiser e economize todo dia.</p>
            </div>
          </div>
        </div>
      </div>


      <div id="parceiros" className="flex-col bg-white w-100 p-6 h-full text-center">
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
      
      <div id="descontos" className="flex flex-col bg-zinc-100 pb-10">
        <div className="w-full flex flex-col justify-center items-center p-8">
          <h4 className="text-4xl font-bold text-black mb-8 text-center">
            Descontos Imperdíveis para você aproveitar
          </h4>
          <Slider {...settings} className="w-full">
            {images.map((image, index) => (
              <div key={index} className="px-2">
                <div className="relative group h-64 overflow-hidden rounded-2xl">
                  <Image src={image.src} alt={image.alt} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl">
                    <span className="text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {image.text}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <Footer/>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";

import { Cinema, Filme } from "@/lib/interfaces";
import Navbar from "@/components/Navbar";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/swiper-bundle.css';

import { OrbitProgress } from "react-loading-indicators";
 
import ModalVoucher from "@/components/ModalVoucher";
import { Voucher } from "@/lib/interfaces";

import Cart from "@/components/Cart";

import Image from "next/image";

export default function CinemaPage() {

  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [filmes, setFilmes] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [openModalVoucher, setOpenModalVoucher] = useState<boolean>(false);
  const [vouchersFilteredByCinema, setVouchersFilteredByCinema] = useState<Voucher[]>([]);

  useEffect(()=> {

    setIsLoading(true);
    obterCinemas();
    obterFilmes();
    setIsLoading(false);

  }, []);

  const obterCinemas = async () => {

    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_CLUBE_CINEMA_URL}/establishment`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CLUBE_CINEMA_TOKEN}`,
        },
        method: 'GET'
      });
  
      const result = await response.json();
      setCinemas(result?.establishments?.rows);

    } catch (error) {
      console.log(error)
      return false
    }

  }

  const obterFilmes = async () => {

    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_MOVIEDB_URL}/movie/now_playing?language=pt-BR&page=1`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_TOKEN}`,
          'accept': 'application/json'
        },
        method: 'GET'
      });
  
      const result = await response.json();
      setFilmes(result?.results);

    } catch (error) {
      console.log(error)
      return false
    }

  }

  const handleOpenModalVouchers = async (id: string) => {
    await getVouchersByCinema(id);
    setOpenModalVoucher(true);
  };

  const getVouchersByCinema = async (id:string) => {

    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_CLUBE_CINEMA_URL}/voucher?cinema=${id}`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CLUBE_CINEMA_TOKEN}`,
          'accept': 'application/json'
        },
        method: 'GET'
      });
      
      const result = await response.json();
      setVouchersFilteredByCinema(result.vouchers);

    } catch (error) {
      console.log(error)
      return false
    }

  }

  return (
    <>
      <Navbar />

      {isLoading ?

        <div className='flex flex-col justify-center gap-10 text-center my-[20vh] md:my-0'>
          <OrbitProgress color="#B91C1C" size="medium" text="" textColor="" />
          <span className='text-xl font-bold'>Carregando filmes...</span>
        </div> 

        : <div className="bg-black min-h-screen text-white overflow-x-hidden">
            <div className="px-6 py-4 sm:text-left text-center">
              <p className="font-bold text-2xl mb-4 text-red-500">Encontre seu filme</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {cinemas.map((cinema) => (
                  <div key={cinema.id} onClick={()=> handleOpenModalVouchers(cinema.id)} className="bg-gray-900 p-4 rounded-xl flex items-center justify-center shadow-lg cursor-pointer">
                    <img
                      src={cinema.logo_url}
                      alt={`Logo do ${cinema.name}`}
                      width={120}
                      height={120}
                      className="object-contain cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              <div className="pb-6">
                <h2 className="font-bold text-2xl mb-4 text-red-500">Filmes em Cartaz</h2>
                <div className="font-['Roboto'] w-full">

                  <Swiper 
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={{
                      el: '.swiper-pagination',
                      clickable: true,
                    }}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: true
                    }}
                    breakpoints={{
                      640: { slidesPerView: 1 },
                      768: { slidesPerView: 1 },
                      1024: { slidesPerView: 5 },
                    }}
                    navigation={{
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    }}
                    modules={[Pagination, Navigation, Autoplay]}
                    className="mySwiper">


                    {(filmes || []).map((filme:Filme) => (

                      <SwiperSlide key={filme.id}>

                        <div className="bg-white text-black rounded-lg shadow-md h-full select-none">
                          
                          <Image
                            src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                            alt={filme.title}
                            width={100}
                            height={100}
                            className="w-full  object-cover"
                            unoptimized
                          />


                          <div className="h-48 px-4 pb-4 flex flex-col justify-center ">
                            <div>
                              <h3 className="text-lg font-bold mb-1">{filme.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">
                                Lançamento: {new Date(filme.release_date).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                            <p className="text-sm text-gray-800  overflow-hidden text-ellipsis line-clamp-3">
                              {filme.overview}
                            </p>
                          </div>
                          
                        </div>

                      </SwiperSlide>

                    ))}

                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>

                    <div className="swiper-pagination"></div>
            
                  </Swiper>

                </div>
              </div>
            </div>
        </div>
          
      }

      <Cart/>
      
      <ModalVoucher vouchers={vouchersFilteredByCinema} isOpen={openModalVoucher} onClose={()=> setOpenModalVoucher(false)} onChange={(vouchers) => setVouchersFilteredByCinema(vouchers)}/>

    </>
  )

}




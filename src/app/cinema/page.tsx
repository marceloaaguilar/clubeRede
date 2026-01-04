"use client";

import { useEffect, useState } from "react";

import { Cinema, Filme } from "@/lib/interfaces";
import Navbar from "@/components/Navbar";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/swiper-bundle.css';
 
import ModalVoucher from "@/components/ModalVoucher";
import { Voucher } from "@/lib/interfaces";

import Cart from "@/components/Cart";

import Image from "next/image";

// Icons from react-icons
import { HiFilm, HiLocationMarker, HiStar, HiTicket, HiPlay } from "react-icons/hi";
import { BiCameraMovie } from "react-icons/bi";
import { MdLocalMovies, MdTheaters } from "react-icons/md";

// Skeleton Component for Cinema Cards
const CinemaCardSkeleton = () => (
  <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 overflow-hidden">
    {/* Shimmer effect */}
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    
    <div className="flex flex-col items-center justify-center h-24 gap-3">
      <div className="w-24 h-12 bg-gray-700/50 rounded-lg animate-pulse" />
      <div className="w-20 h-3 bg-gray-700/30 rounded animate-pulse" />
    </div>
  </div>
);

// Skeleton Component for Movie Cards
const MovieCardSkeleton = () => (
  <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg">
    {/* Shimmer effect */}
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />
    
    {/* Poster skeleton */}
    <div className="aspect-[2/3] bg-gray-700/50 animate-pulse" />
    
    {/* Info skeleton */}
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-700/50 rounded w-3/4 animate-pulse" />
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-700/30 rounded animate-pulse" />
        <div className="h-3 bg-gray-700/30 rounded w-20 animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-700/30 rounded w-full animate-pulse" />
        <div className="h-3 bg-gray-700/30 rounded w-2/3 animate-pulse" />
      </div>
    </div>
  </div>
);

// Loading Section Header Skeleton
const SectionHeaderSkeleton = ({ icon: Icon }: { icon: React.ElementType }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-red-700/20 rounded-xl flex items-center justify-center">
      <Icon className="w-5 h-5 text-red-500/50" />
    </div>
    <div className="h-8 bg-gray-700/30 rounded-lg w-48 animate-pulse" />
  </div>
);

export default function CinemaPage() {

  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [filmes, setFilmes] = useState([]);
  const [isLoadingCinemas, setIsLoadingCinemas] = useState<boolean>(true);
  const [isLoadingFilmes, setIsLoadingFilmes] = useState<boolean>(true);

  const [openModalVoucher, setOpenModalVoucher] = useState<boolean>(false);
  const [vouchersFilteredByCinema, setVouchersFilteredByCinema] = useState<Voucher[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([obterCinemas(), obterFilmes()]);
    };
    fetchData();
  }, []);



  const obterCinemas = async () => {
    setIsLoadingCinemas(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CLUBE_CINEMA_URL}/establishment`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CLUBE_CINEMA_TOKEN}`,
        },
        method: 'GET'
      });
  
      const result = await response.json();
      const cinemas = result?.establishments?.rows || [];
      
      // Se não houver cinemas da API, usar mock data
      setCinemas(cinemas);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingCinemas(false);
    }
  };

  const obterFilmes = async () => {
    setIsLoadingFilmes(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MOVIEDB_URL}/movie/now_playing?language=pt-BR&page=1`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MOVIEDB_TOKEN}`,
          'accept': 'application/json'
        },
        method: 'GET'
      });
  
      const result = await response.json();
      setFilmes(result?.results || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingFilmes(false);
    }
  };

  const handleOpenModalVouchers = async (id: string) => {
    await getVouchersByCinema(id);
    setOpenModalVoucher(true);
  };

  const getVouchersByCinema = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CLUBE_CINEMA_URL}/voucher?cinema=${id}`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CLUBE_CINEMA_TOKEN}`,
          'accept': 'application/json'
        },
        method: 'GET'
      });
      
      const result = await response.json();
      const vouchers = result?.vouchers || [];
      
      // Se não houver vouchers da API, usar mock data
      setVouchersFilteredByCinema(vouchers);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen text-white overflow-x-hidden">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-red-900/20 pointer-events-none" />
          
          <div className="px-6 lg:px-12 py-8">
            {/* Cinema Selection Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-red-700/20 rounded-xl flex items-center justify-center">
                  <MdTheaters className="w-5 h-5 text-red-500" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Escolha seu Cinema
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoadingCinemas ? (
                  // Skeleton loading for cinemas
                  [...Array(4)].map((_, index) => (
                    <CinemaCardSkeleton key={`cinema-skeleton-${index}`} />
                  ))
                ) : (
                  cinemas.map((cinema) => (
                    <div
                      key={cinema.id}
                      onClick={() => handleOpenModalVouchers(cinema.id)}
                      className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm 
                                 border border-gray-700/50 rounded-2xl p-6 
                                 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20
                                 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 group-hover:from-red-600/5 group-hover:to-red-600/10 rounded-2xl transition-all duration-300" />
                      <div className="relative flex items-center justify-center h-24">
                        <img
                          src={cinema.logo_url}
                          alt={`Logo do ${cinema.name}`}
                          className="max-h-20 max-w-full object-contain filter brightness-100 group-hover:brightness-110 transition-all duration-300"
                        />
                      </div>
                      <div className="absolute bottom-3 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-sm text-red-400 font-medium flex items-center justify-center gap-1">
                          <HiTicket className="w-4 h-4" />
                          Ver Vouchers
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Movies Section */}
            <div className="pb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-red-700/20 rounded-xl flex items-center justify-center">
                  <HiFilm className="w-5 h-5 text-red-500" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Em Cartaz
                </h2>
                <div className="ml-auto hidden sm:flex items-center gap-2 text-gray-400 text-sm">
                  <BiCameraMovie className="w-4 h-4 text-red-500" />
                  <span>Deslize para ver mais</span>
                </div>
              </div>

              {isLoadingFilmes ? (
                // Skeleton loading for movies
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {[...Array(5)].map((_, index) => (
                    <MovieCardSkeleton key={`movie-skeleton-${index}`} />
                  ))}
                </div>
              ) : (
                <Swiper
                  slidesPerView={1}
                  spaceBetween={24}
                  pagination={{
                    el: '.swiper-pagination',
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: true,
                  }}
                  breakpoints={{
                    480: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                  }}
                  navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }}
                  modules={[Pagination, Navigation, Autoplay]}
                  className="mySwiper !pb-12"
                >
                  {(filmes || []).map((filme: Filme) => (
                    <SwiperSlide key={filme.id}>
                      <div className="group relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-500/10 transform hover:scale-[1.03] transition-all duration-300 cursor-pointer">
                        {/* Movie Poster */}
                        <div className="relative aspect-[2/3] overflow-hidden">
                          <Image
                            src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                            alt={filme.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            unoptimized
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
                          
                          {/* Rating Badge */}
                          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                            <HiStar className="w-4 h-4 text-yellow-400" />
                            <span className="text-white text-sm font-semibold">{filme.vote_average.toFixed(1)}</span>
                          </div>
                        </div>

                        {/* Movie Info */}
                        <div className="p-4 space-y-2">
                          <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-red-400 transition-colors duration-300">
                            {filme.title}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <MdLocalMovies className="w-4 h-4" />
                            <span>{new Date(filme.release_date).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                            {filme.overview || 'Sinopse não disponível'}
                          </p>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                    </SwiperSlide>
                  ))}

                  <div className="swiper-button-prev !w-10 !h-10 !bg-black/50 !backdrop-blur-sm !rounded-full after:!text-lg" />
                  <div className="swiper-button-next !w-10 !h-10 !bg-black/50 !backdrop-blur-sm !rounded-full after:!text-lg" />
                  <div className="swiper-pagination !-bottom-2" />
                </Swiper>
              )}
            </div>
          </div>
        </div>
      </div>

      <Cart />
      
      <ModalVoucher 
        vouchers={vouchersFilteredByCinema} 
        isOpen={openModalVoucher} 
        onClose={() => setOpenModalVoucher(false)} 
        onChange={(vouchers) => setVouchersFilteredByCinema(vouchers)}
      />
    </>
  );
}

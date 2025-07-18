import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/swiper-bundle.css';

import { ShoppingCartIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';

import { Cinema } from '@/lib/interfaces';

export default function BannersCinema() {

  const [cinemas, setCinemas] = useState<Cinema[]>([]);

  const descriptions = [
    {
      discount: 'até 40%',
      text: 'Descontos exclusivos para filmes 3D',
      gradientFrom: '#1E2E8B', 
      gradientTo: '#3B5998',
    },
    {
      discount: 'R$ 15,00',
      text: 'Válido em qualquer sessão',
      gradientFrom: '#8B1E6D', 
      gradientTo: '#F76C6C',  
    }
  ];

  useEffect(()=> {

    obterCinemas();

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

  return (

    <div className="px-5 font-['Roboto'] flex w-full justify-center">
      <Swiper 
        slidesPerView={1}
        spaceBetween={20}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        width={800}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >

        {cinemas.map((cinema, index) => {

          const { discount, text, gradientFrom, gradientTo } = descriptions[index] || descriptions[0];

          return (
            <SwiperSlide key={cinema.name} className="!w-[380px] flex-shrink-0">
              <div
                className="rounded-2xl shadow-lg flex flex-col justify-between overflow-hidden w-full h-[180px]"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
                }}
              >

                <div className="flex justify-between items-center px-6 h-full">

                  <div className="rounded-xl flex items-center justify-center shadow-md bg-white">
                    <Image
                      src={cinema.logo_url}
                      alt={`${cinema.name} Logo`}
                      width={96}
                      height={96}
                      className="object-contain"
                      unoptimized
                    />
                  </div>

                  <div className="flex flex-col ml-4 text-sm text-white font-normal w-48">
                    <p>Descontos</p>
                    <p className="text-2xl font-bold">{discount}</p>
                    <p className="italic">{text}</p>

                    <a
                      href={`/cinema`}
                      className="mt-3 bg-white text-black rounded-full flex items-center justify-center px-4 py-2 hover:bg-gray-100 transition-all duration-200 text-sm font-normal"
                    >
                      <ShoppingCartIcon className="w-4 h-4 mr-2" />
                      Ver Vouchers
                    </a>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          );

    })}

      </Swiper>

      <div className="swiper-pagination my-3 lg:my-2" style={{bottom: 'unset'}}></div>

    </div>  
  
  );
}

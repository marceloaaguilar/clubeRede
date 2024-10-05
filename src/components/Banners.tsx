import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/swiper-bundle.css';

import { ShoppingCartIcon } from '@heroicons/react/outline';

export default function SwiperCarousel() {

  return (
    <div className="px-5 font-['Roboto'] lg:w-[1340px] w-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination]}
        className="mySwiper">
        <SwiperSlide >
          <div className="relative card-bg bg-cover bg-center bg-no-repeat rounded-lg" style={{ backgroundImage: "url('/banners/dominos.png')" }}>
            <div className="absolute card-logo flex items-center justify-center -top-10 left-24 bg-white rounded-lg h-46 w-24 shadow-2xl">
              <Image src="/logos/logoDominos.png" alt="Domino's Logo" width={64} height={64} unoptimized/>
            </div>
            <div className="flex items-center justify-between p-3 h-full mt-16 card-meta">
              <div className="flex flex-col justify-between w-24 text-start">
                <p className='font-regular text-2xl text-white'>até</p>
                <p className='text-4xl font-bold text-white'>30%</p>
                <p className='text-base text-white'>de Desconto</p>
                <a href="https://www.dominos.com.br/pages/order/?utm_source=auget&utm_campaign=aug" target='_blank' className="mt-4 bg-black text-white rounded-xl font-regular flex items-center justify-center p-1">
                  <div className='w-4 mx-px'>
                    <ShoppingCartIcon/>
                  </div>
                  <p className='text-xs'>Loja Online</p>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
    
        <SwiperSlide >
          <div className="relative card-bg bg-cover bg-center bg-no-repeat rounded-lg" style={{ backgroundImage: "url('/banners/netshoes.png')" }}>
            <div className="absolute card-logo flex items-center justify-center -top-10 left-24 bg-white rounded-lg h-46 w-24 shadow-2xl">
              <Image src="/logos/logoNetshoes.png" alt="Netshoes Logo" width={64} height={64} unoptimized/>
            </div>
            <div className="flex items-center justify-between p-3 h-full mt-16 card-meta">
              <div className="flex flex-col justify-between w-24 text-start">
                <p className='font-regular text-2xl text-black'>até</p>
                <p className='text-4xl font-bold text-black'>15%</p>
                <p className='text-base text-black'>de Desconto</p>
                <a href='https://netshoes.parcerialink.com.br/cluberede' target='_blank' className="mt-4 bg-black text-white rounded-xl font-regular flex items-center justify-center p-1">
                  <div className='w-4 mx-px'>
                    <ShoppingCartIcon/>
                  </div>
                  <p className='text-xs'>Loja Online</p>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
    
        <SwiperSlide>
          <div className="relative card-bg bg-cover bg-center bg-no-repeat rounded-lg" style={{ backgroundImage: "url('/banners/vivara.png')" }}>
            <div className="absolute card-logo flex items-center justify-center -top-10 left-24 bg-white rounded-lg h-46 w-24 shadow-2xl">
              <Image src="/logos/logoVivara.png" alt="Vivara Logo" width={64} height={64} unoptimized/>
            </div>
            <div className="flex items-center justify-between p-3 h-full mt-16 card-meta">
              <div className="flex flex-col justify-between w-24 text-start">
                <p className='font-regular text-2xl'>até</p>
                <p className='text-4xl font-bold'>15%</p>
                <p className='text-base'>de Desconto</p>
                <a href='https://vivara.parcerialink.com.br/cluberede' target='_blank' className="mt-4 bg-black text-white rounded-xl font-regular flex items-center justify-center p-1">
                  <div className='w-4 mx-px'>
                    <ShoppingCartIcon/>
                  </div>
                  <p className='text-xs'>Loja Online</p>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
    
        <SwiperSlide>
          <div className="relative card-bg bg-cover bg-center bg-no-repeat rounded-lg" style={{ backgroundImage: "url('/banners/seculus.png')" }}>
            <div className="absolute card-logo flex items-center justify-center -top-10 left-24 bg-white rounded-lg h-46 w-24 shadow-2xl">
              <Image src="/logos/logoSeculus.png" alt="Seculus Logo" width={64} height={64} unoptimized/>
            </div>
            <div className="flex items-center justify-between p-3 h-full mt-16 card-meta">
              <div className="flex flex-col justify-between w-24 text-start">
                <p className='font-regular text-2xl text-black'>até</p>
                <p className='text-4xl font-bold text-black'>50%</p>
                <p className='text-base text-black'>de Desconto</p>
                <a href='https://seculusoutletday.com.br' target='_blank' className="mt-4 bg-black text-white rounded-xl font-regular flex items-center justify-center p-1">
                  <div className='w-4 mx-px'>
                    <ShoppingCartIcon/>
                  </div>
                  <p className='text-xs'>Loja Online</p>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
    
        <SwiperSlide>
          <div className="relative card-bg bg-cover bg-center bg-no-repeat rounded-lg" style={{ backgroundImage: "url('/banners/zattini.png')" }}>
            <div className="absolute card-logo flex items-center justify-center -top-10 left-24 bg-white rounded-lg h-46 w-24 shadow-2xl">
              <Image src="/logos/logoZattini.png" alt="Zattini Logo" width={64} height={64} unoptimized/>
            </div>
            <div className="flex items-center justify-between p-3 h-full mt-16 card-meta">
              <div className="flex flex-col justify-between w-24 text-start">
                <p className='font-regular text-2xl text-white'>até</p>
                <p className='text-4xl font-bold  text-white'>15%</p>
                <p className='text-base  text-white'>de Desconto</p>
                <a href='https://zattini.parcerialink.com.br/cluberede' target='_blank' className="mt-4 bg-black text-white rounded-xl font-regular flex items-center justify-center p-1">
                  <div className='w-4 mx-px'>
                    <ShoppingCartIcon/>
                  </div>
                  <p className='text-xs'>Loja Online</p>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative card-bg bg-cover bg-center bg-no-repeat rounded-lg" style={{ backgroundImage: "url('/banners/hoteis.png')" }}>
            <div className="absolute card-logo flex items-center justify-center -top-10 left-24 bg-white rounded-lg h-46 w-24 shadow-2xl">
              <Image src="/logos/logoHoteis.png" alt="Hoteis.com Logo" width={64} height={64} unoptimized/>
            </div>
            <div className="flex items-center justify-between p-3 h-full mt-16 card-meta">
              <div className="flex flex-col justify-between w-24 text-start">
                <p className='font-regular text-2xl'>até</p>
                <p className='text-4xl font-bold'>30%</p>
                <p className='text-base'>de Desconto</p>
                <a href='https://hoteis.parceriasonline.com.br/clube-da-rede-veiculos' target='_blank' className="mt-4 bg-black text-white rounded-xl font-regular flex items-center justify-center p-1">
                  <div className='w-4 mx-px'>
                    <ShoppingCartIcon/>
                  </div>
                  <p className='text-xs'>Loja Online</p>
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <div className="swiper-pagination"></div>
      </Swiper>
    </div>  
  
  );
}

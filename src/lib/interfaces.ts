import { Dispatch, SetStateAction } from "react";

export interface Empresa{
    id: number,
    categoria: string,
    nome: string
    logo: string,
    link?: string,
    palavrasChave: string,
    cupom?: string,
    linkCupom?: string,
    benefits?: string,
    conditions?:string
    validade?:string
}

export interface ModalProps{
    isOpen: boolean;
    onClose: () => void;
    link: string,
    cupom: string
    benefits?: string,
    conditions?:string
    validade?:string
}

export interface Cinema {
    id: string,
    name: string,
    logo_url: string
}

export interface Filme {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; 
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export interface Voucher {
    id: string,
    title: string;
    description: string;
    quantity?: number;
    rules: string;
    paymentValue: number;
}

export interface ModalVoucherProps {
    vouchers: Voucher[],
    isOpen: boolean;
    onClose: () => void;
    onChange: Dispatch<SetStateAction<Voucher[]>>;
}
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
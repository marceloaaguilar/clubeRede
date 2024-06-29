import Image from "next/image";

export default function Footer(){
    return (
        <div className="flex justify-center text-center gap-10 bg-black items-center h-52" >
            <Image src="/logo_Clube_Rede.png" alt="Logo Clube Rede" width={100} height={50}></Image>
            <p>Central de Descontos <br/> 0800 940 2195</p>
        </div>
    )
}
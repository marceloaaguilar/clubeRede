import Image from "next/image";

export default function Footer(){
    return (
        <div className="flex justify-center items-center bg-black text-white py-6">
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                <Image src="/logo_Clube_Rede.png" alt="Logo Clube Rede" width={100} height={50} />
                <p>
                    <strong>Clube de Descontos Rede Veículos</strong><br />
                    Central de Descontos: <br />
                    <a href="tel:08009402195" className="text-white hover:text-gray-300">0800 940 2195</a>
                </p>
                </div>
            </div>
        </div>

    )
}
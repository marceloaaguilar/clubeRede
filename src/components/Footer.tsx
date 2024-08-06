import Image from "next/image";

export default function Footer(){
    return (
        <div className="flex justify-center items-center bg-black text-white py-6">
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                <Image unoptimized src="/logo_Clube_Rede.png" alt="Logo Clube Rede" width={100} height={50} />
                </div>
            </div>
        </div>

    )
}
'use client'
import { Empresa } from "@/lib/interfaces"
import { useEffect, useState } from "react";
import Image from "next/image";
import { list } from "postcss";

export default function Discounts(){
    const [listaEmpresas, setListaEmpresas] = useState<Empresa[]>([]);
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [filterCategory, setFilterCategory] = useState();
    const [palavraChave, setPalavraChave] = useState<string>();
    const [empresasVisiveis, setEmpresasVisiveis] = useState<Empresa[]>([]);

    useEffect(()=> {
        buscaEmpresas();  
    },[]);
    
    useEffect(()=> {
        setEmpresas(listaEmpresas)
    },[listaEmpresas])

    const handleSearch = async (e:any) => {
        console.log(palavraChave, filterCategory);
        if (palavraChave !== undefined){
            setEmpresas(listaEmpresas.filter((empresas) => empresas.palavrasChave?.includes(palavraChave.toLowerCase())))
        }
        if (filterCategory !== "placeholder" && filterCategory !== undefined){
            if (palavraChave !== undefined){
                setEmpresas(listaEmpresas.filter((empresas) => empresas.categoria == filterCategory && empresas.palavrasChave?.includes(palavraChave.toLowerCase())));
                return
            }
            setEmpresas(listaEmpresas.filter((empresas) => empresas.categoria == filterCategory));
        
        }

        if (palavraChave === undefined && filterCategory === undefined){
            setEmpresas(listaEmpresas)
        }
    }

    const buscaEmpresas = async () => {
        await setListaEmpresas(
            [
                
                {id: 1, nome: "Riachuelo", categoria: "Roupas", logo: "/logoRiachuelo.png", palavrasChave: "roupas,riachuelo,moda"},
                {id: 2, nome: "Marisa", categoria: "Roupas", logo: "/clubemarisa.jpg", palavrasChave: "roupas,marisa,moda"},
                {id: 3, nome: "Ponto", categoria: "Eletrodomesticos", logo: "/ponto_pontofrio.jpg", palavrasChave: "eletrodomésticos, ponto, ponto frio", link: "https://pontofrio.parcerialink.com.br/cluberede"},
                {id: 4, nome: "Loja Seculos", categoria: "Relogios", logo: "/logoSeculos.png", palavrasChave: "loja de relógios, relojoaria, seculos"},
                {id: 5, nome: "AliExpress", categoria: "Ecommerce", logo: "/Aliexpress_logo.png", palavrasChave: "china, ecommerce, aliexpress"},
                {id: 6, nome: "Hering", categoria: "Roupas", logo: "/heringLogo.png", palavrasChave: "roupas,hering,moda"},
                {id: 7, nome: "Hóteis", categoria: "Hoteis", logo: "/djsnlcisjvisjncisdp.png", palavrasChave: "hóteis, rede de hoteis, hoteis.com"},
                {id: 8, nome: "Shoestock", categoria: "Tênis", logo: "/ligoShoestock.png", palavrasChave: "tenis,calçados,shoestock", link: "https://shoestock.parcerialink.com.br/cluberede"},
                {id: 9, nome: "Movida", categoria: "AluguelCarros", logo: "/logoMovida250x250px.png", palavrasChave: "aluguel de carros,movida,carros", link: "https://movida.parcerialink.com.br/cluberede"},
                {id: 10, nome: "Zattini", categoria: "Roupas", logo: "/clube-348.jpg", palavrasChave: "roupas,zattini,moda", link: "https://zattini.parcerialink.com.br/cluberede"},
                {id: 11, nome: "Vivara", categoria: "Joias", logo: "/vivara-logo.png", palavrasChave: "joias,vivara,pulseiras", link: "https://vivara.parcerialink.com.br/cluberede"},
                {id: 12, nome: "Centauro", categoria: "Tenis", logo: "/clube-422.jpg", palavrasChave: "esportes,centauro,atleta,tenis"},
                {id: 13, nome: "Estácio", categoria: "Faculdade", logo: "/logoEstacio.png", palavrasChave: "faculdade,estácio,cursos"},
                {id: 14, nome: "Netshoes", categoria: "Roupas", logo: "/clube-341.jpg", palavrasChave: "esportes,roupas,netshoes,tenis", link: "https://netshoes.parcerialink.com.br/cluberede"},
                {id: 15, nome: "Casas Bahia", categoria: "Eletrodomesticos", logo: "/clube-casasbahia.png", palavrasChave: "eletrodomésticos, casas bahia", link: "https://casasbahia.parcerialink.com.br/cluberede"},
                {id: 16, nome: "Magalu", categoria: "Eletrodomesticos", logo: "/clubemagalu.jpg", palavrasChave: "eletrodomésticos, magalu, magazine luiza"},
                {id: 17, nome: "Petz", categoria: "Petshop", logo: "/LogoPetzCBC250x250.png", palavrasChave: "petshop, cachorro, gato, petz"},
                {id: 18, nome: "Dominos", categoria: "Pizzaria", logo: "/Dominos.jpg", palavrasChave: "pizzaria, pizza, comida, dominos"},
                {id: 19, nome: "Extra", categoria: "Hipermercado", logo: "/logo-extra.png", palavrasChave: "extra, hipermercado", link: "https://extra.parcerialink.com.br/cluberede"},
                {id: 20, nome: "Underarmour", categoria: "Roupas", logo: "/logo-underarmor.png", palavrasChave: "roupas, esportes, underarmour", link: "https://underarmour.parcerialink.com.br/cluberede"},
                {id: 21, nome: "Mizuno", categoria: "Roupas", logo: "/logo-mizuno.png", palavrasChave: "roupas, esportes, mizuno", link: "https://mizuno.parcerialink.com.br/cluberede"},
                {id: 22, nome: "Olympikus", categoria: "Roupas", logo: "/logo-olympikus.png", palavrasChave: "roupas, esportes, olympikus", link: "https://olympikus.parcerialink.com.br/cluberede"},
                {id: 23, nome: "Klabin For You", categoria: "Embalagens", logo: "/logo-klabin-for-you.png", palavrasChave: "embalagens, empresa, klabin for you", link: "https://klabinforyou.parcerialink.com.br/cluberede"},
                {id: 24, nome: "Studio Geek", categoria: "Roupas", logo: "/logo-studio-geek.png", palavrasChave: "roupas, geek, studio geek", link: "https://studiogeek.parcerialink.com.br/cluberede"},
            ]
                
            
        )
    }
    
    return (
        <div id="descontos">
            <div className="flex bg-red-700 justify-center h-20 items-center">
                <h3 className="text-2xl font-bold">Descontos</h3>
            </div>
            <div className="max-w-sm mx-auto mt-5">
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Palavra Chave</label>
                    <input type="text" id="first_name" value={palavraChave} onChange={(e:any)=> setPalavraChave(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Palavra Chave"/>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filtrar por Categoria</label>
                    <select value={filterCategory} onChange={(e:any)=> setFilterCategory(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="placeholder" selected>Escolha uma Categoria</option>
                        <option value="Roupas">Loja de Roupas</option>
                        <option value="Ecommerce">E-Commerce</option>
                        <option value="Hoteis">Rede de Hóteis</option>
                        <option value="Tênis">Tênis</option>
                        <option value="Joias">Loja de Jóias</option>
                        <option value="AluguelCarros">Aluguel de Carros</option>
                        <option value="Faculdade">Faculdades</option>
                        <option value="Petshop">Pet Shop</option>
                        <option value="Pizzaria">Pizzaria</option>
                        <option value="Embalagens">Embalagens</option>
                    </select>
                </div>
                <button onClick={handleSearch} className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded w-full mt-4">Buscar</button>
            </div>
            <div className="sm-grid flex flex-row flex-wrap gap-4 mt-5 px-4 justify-center">
                {empresas.map((empresas)=> 
                <div key={empresas.id} className="grid justify-center bg-white items-center text-center rounded-lg">
                    <div className="py-6 px-6 bg-slate-200 rounded-lg w-full">
                        <Image className="xl:w-48 h-48 object-contain md:w-96 rounded-3xl" src={empresas.logo} alt="" width={350} height={350} />
                    </div>
                    <h3 className="text-black text-2xl font-bold mt-4">{empresas.nome}</h3>
                    <a href={empresas.link} target="_blank" className="bg-red-700 hover:bg-red-800 text-white font-bold mx-6 my-4 py-2 px-4 rounded">Ver desconto</a>
                </div>
                
                )}

            </div>
        </div>
    )


}
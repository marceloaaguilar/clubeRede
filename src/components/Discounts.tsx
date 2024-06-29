'use client'
import { Empresa } from "@/lib/interfaces"
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Discounts(){
    const [listaEmpresas, setListaEmpresas] = useState<Empresa[]>([]);
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [filterCategory, setFilterCategory] = useState();
    const [empresasVisiveis, setEmpresasVisiveis] = useState<Empresa[]>([]);

    useEffect(()=> {
        buscaEmpresas();  
    },[]);
    
    useEffect(()=> {
        setEmpresas(listaEmpresas)
    },[listaEmpresas])

    const handleSearch = async (e:any) => {
        console.log(filterCategory);
        if (filterCategory == "placeholder" || filterCategory == undefined){
            setEmpresas(listaEmpresas);
            return
        }
        setEmpresas(listaEmpresas.filter((empresas) => empresas.categoria == filterCategory))
    }

    const buscaEmpresas = async () => {
        await setListaEmpresas(
            [
                {id: 1, nome: "Riachuelo",         categoria: "Roupas",            logo: "/logoRiachuelo.png"}
                ,{id: 2, nome: "Marisa",            categoria: "Roupas",            logo: "/clubemarisa.jpg"}
                ,{id: 3, nome: "Ponto",             categoria: "Eletrodomesticos",  logo: "/ponto_pontofrio.jpg"}
                ,{id: 4, nome: "Loja Seculos",      categoria: "Relogios",          logo: "/logoSeculos.png"}
                ,{id: 5, nome: "AliExpress",        categoria: "Ecommerce",        logo: "/Aliexpress_logo.png"}
                ,{id: 6, nome: "Hering",            categoria: "Roupas",            logo: "/heringLogo.png"}
                ,{id: 7, nome: "Hóteis",            categoria: "Hoteis",            logo: "/djsnlcisjvisjncisdp.png"}
                ,{id: 8, nome: "Shoestock",         categoria: "Tênis",             logo: "/ligoShoestock.png"}
                ,{id: 9, nome: "Movida",            categoria: "AluguelCarros",     logo: "/logoMovida250x250px.png"}
                ,{id: 10, nome: "Zattini",          categoria: "Roupas",            logo: "/clube-348.jpg"}
                ,{id: 11, nome: "Vivara",           categoria: "Joias",             logo: "/vivara-logo.png"}
                ,{id: 12, nome: "Centauro",         categoria: "Tenis",             logo: "/clube-422.jpg"}
                ,{id: 13, nome: "Estácio",          categoria: "Faculdade",         logo: "/logoEstacio.png"}
                ,{id: 14, nome: "Netshoes",         categoria: "Roupas",            logo: "/clube-341.jpg"}
                ,{id: 15, nome: "Casas Bahia",      categoria: "Eletrodomesticos",  logo: "/clube-casasbahia.png"}
                ,{id: 16, nome: "Magalu",           categoria: "Eletrodomesticos",  logo: "/clubemagalu.jpg"}
                ,{id: 17, nome: "Petz",             categoria: "Petshop",           logo: "/LogoPetzCBC250x250.png"}
                ,{id: 18, nome: "Dominos",          categoria: "Pizzaria",          logo: "/Dominos.jpg"}
            ]
        )
    }
    
    return (
        <div id="descontos">
            <div className="flex bg-red-700 justify-center h-20 items-center">
                <h3 className="text-2xl font-bold">Descontos</h3>
            </div>
            <div className="max-w-sm mx-auto mt-5">
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
                </select>
                <button onClick={handleSearch} className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded w-full mt-4">Buscar</button>
            </div>
            <div className="sm-grid flex flex-row flex-wrap gap-4 mt-5 px-4 justify-center">
                {empresas.map((empresas)=> 
                <div key={empresas.id} className="grid justify-center bg-white items-center text-center rounded-lg">
                    <div className="py-6 px-6 bg-slate-200 rounded-lg w-full">
                        <Image className="xl:w-48 h-48 object-contain md:w-96" src={empresas.logo} alt="" width={350} height={350} />
                    </div>
                    <h3 className="text-black text-2xl font-bold mt-4">{empresas.nome}</h3>
                    <button className="bg-red-700 hover:bg-red-800 text-white font-bold mx-6 my-4 py-2 px-4 rounded">Ver desconto</button>
                </div>
                
                )}

            </div>
        </div>
    )


}
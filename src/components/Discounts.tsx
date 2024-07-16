'use client'
import { Empresa } from "@/lib/interfaces"
import { useEffect, useState } from "react"
import Image from "next/image"
import { list } from "postcss"
import { useRouter, useSearchParams } from 'next/navigation'
const AES = require("crypto-js/aes")
const CryptoJS = require("crypto-js")

const MEMBER_DATA_HASH_URL_PARAM = 'id'

export default function Discounts() {
  const [listaEmpresas, setListaEmpresas] = useState<Empresa[]>([])
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [filterCategory, setFilterCategory] = useState()
  const [palavraChave, setPalavraChave] = useState<string>()
  const [empresasVisiveis, setEmpresasVisiveis] = useState<Empresa[]>([])

  const searchParams = useSearchParams()
  const { push } = useRouter()

  const authenticateMember = async (cpf: string, token: string): Promise<boolean> => {
    try {
      const payload = { cpfCnpjCliente: cpf }
      const response = await fetch('https://integracao.redeveiculos.com/api/v2/prod/obterStatusLogin/', {
        body: new URLSearchParams({ json: JSON.stringify(payload) }),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST'
      })

      const responseData = await response.json()

      return responseData.message === 'OK'
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const handleSearch = async (e: any) => {
    if (palavraChave !== undefined) {
      setEmpresas(listaEmpresas.filter((empresas) => empresas.palavrasChave?.includes(palavraChave.toLowerCase())))
    }
    if (filterCategory !== "placeholder" && filterCategory !== undefined) {
      if (palavraChave !== undefined) {
        setEmpresas(listaEmpresas.filter((empresas) => empresas.categoria == filterCategory && empresas.palavrasChave?.includes(palavraChave.toLowerCase())))
        return
      }
      setEmpresas(listaEmpresas.filter((empresas) => empresas.categoria == filterCategory))
    }

    if (palavraChave === undefined && (filterCategory === undefined || filterCategory === 'placeholder')) {
      setEmpresas(listaEmpresas)
    }

  }

  const checkIfIsMemberAuthenticated = async (memberDataHash: string | null): Promise<void> => {
    try {
      if (!memberDataHash) {
        push('/')
      }

      const memberData = JSON.parse(AES.decrypt(memberDataHash, process.env.NEXT_PUBLIC_SECRET).toString(CryptoJS.enc.Utf8) ?? '')

      const isMemberAuthenticated = await authenticateMember(memberData.cpfCnpjCliente as string, memberData.token as string)

      if (!isMemberAuthenticated) {
        push('/')
      }
    } catch (error) {
      alert('Associado não autenticado.')
      push('/')
    }
  }

  const buscaEmpresas = async () => {
    await setListaEmpresas(
      [
        { id: 1, nome: "Riachuelo", categoria: "Roupas", logo: "/logoRiachuelo.png", palavrasChave: "roupas,riachuelo,moda", link: "https://riachuelo.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 2, nome: "Marisa", categoria: "Roupas", logo: "/clubemarisa.jpg", palavrasChave: "roupas,marisa,moda" },
        { id: 3, nome: "Ponto", categoria: "Eletrodomesticos", logo: "/ponto_pontofrio.jpg", palavrasChave: "eletrodomésticos, ponto, ponto frio", link: "https://pontofrio.parcerialink.com.br/cluberede" },
        { id: 4, nome: "Loja Seculos", categoria: "Relogios", logo: "/logoSeculos.png", palavrasChave: "loja de relógios, relojoaria, seculos" },
        { id: 5, nome: "AliExpress", categoria: "Ecommerce", logo: "/Aliexpress_logo.png", palavrasChave: "china, ecommerce, aliexpress", link: "https://aliexpress.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 6, nome: "Hering", categoria: "Roupas", logo: "/heringLogo.png", palavrasChave: "roupas,hering,moda" },
        { id: 7, nome: "Hóteis", categoria: "Hoteis", logo: "/djsnlcisjvisjncisdp.png", palavrasChave: "hóteis, rede de hoteis, hoteis.com", link: "https://hoteis.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 8, nome: "Shoestock", categoria: "Tênis", logo: "/ligoShoestock.png", palavrasChave: "tenis,calçados,shoestock", link: "https://shoestock.parcerialink.com.br/cluberede" },
        { id: 9, nome: "Movida", categoria: "AluguelCarros", logo: "/logoMovida250x250px.png", palavrasChave: "aluguel de carros,movida,carros", link: "https://movida.parcerialink.com.br/cluberede" },
        { id: 10, nome: "Zattini", categoria: "Roupas", logo: "/clube-348.jpg", palavrasChave: "roupas,zattini,moda", link: "https://zattini.parcerialink.com.br/cluberede" },
        { id: 11, nome: "Vivara", categoria: "Joias", logo: "/vivara-logo.png", palavrasChave: "joias,vivara,pulseiras", link: "https://vivara.parcerialink.com.br/cluberede" },
        { id: 12, nome: "Centauro", categoria: "Tenis", logo: "/clube-422.jpg", palavrasChave: "esportes,centauro,atleta,tenis", link: "https://centauro.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 13, nome: "Estácio", categoria: "Faculdade", logo: "/logoEstacio.png", palavrasChave: "faculdade,estácio,cursos" },
        { id: 14, nome: "Netshoes", categoria: "Roupas", logo: "/clube-341.jpg", palavrasChave: "esportes,roupas,netshoes,tenis", link: "https://netshoes.parcerialink.com.br/cluberede" },
        { id: 15, nome: "Casas Bahia", categoria: "Eletrodomesticos", logo: "/clube-casasbahia.png", palavrasChave: "eletrodomésticos, casas bahia", link: "https://casasbahia.parcerialink.com.br/cluberede" },
        { id: 16, nome: "Magalu", categoria: "Eletrodomesticos", logo: "/clubemagalu.jpg", palavrasChave: "eletrodomésticos, magalu, magazine luiza" },
        { id: 17, nome: "Petz", categoria: "Petshop", logo: "/LogoPetzCBC250x250.png", palavrasChave: "petshop, cachorro, gato, petz" },
        { id: 18, nome: "Dominos", categoria: "Pizzaria", logo: "/Dominos.jpg", palavrasChave: "pizzaria, pizza, comida, dominos" },
        { id: 19, nome: "Extra", categoria: "Hipermercado", logo: "/logo-extra.png", palavrasChave: "extra, hipermercado", link: "https://extra.parcerialink.com.br/cluberede" },
        { id: 20, nome: "Underarmour", categoria: "Roupas", logo: "/logo-underarmor.png", palavrasChave: "roupas, esportes, underarmour", link: "https://underarmour.parcerialink.com.br/cluberede" },
        { id: 21, nome: "Mizuno", categoria: "Roupas", logo: "/logo-mizuno.png", palavrasChave: "roupas, esportes, mizuno", link: "https://mizuno.parcerialink.com.br/cluberede" },
        { id: 22, nome: "Olympikus", categoria: "Roupas", logo: "/logo-olympikus.png", palavrasChave: "roupas, esportes, olympikus", link: "https://olympikus.parcerialink.com.br/cluberede" },
        { id: 23, nome: "Klabin For You", categoria: "Embalagens", logo: "/logo-klabin-for-you.png", palavrasChave: "embalagens, empresa, klabin for you", link: "https://klabinforyou.parcerialink.com.br/cluberede" },
        { id: 24, nome: "Studio Geek", categoria: "Roupas", logo: "/logo-studio-geek.png", palavrasChave: "roupas, geek, studio geek", link: "https://studiogeek.parcerialink.com.br/cluberede" },
        { id: 25, nome: "Atlas", categoria: "Eletrodomesticos", logo: "/logoAtlas.png", palavrasChave: "atlas, serviços", link: "https://atlas.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 26, nome: "Baby and Me", categoria: "Infantil", logo: "/logoBabyAndMe.png", palavrasChave: "baby and me, infantil", link: "https://babyandme.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 27, nome: "Canon", categoria: "Fotografia", logo: "/logoCanon.png", palavrasChave: "canon, fotografia", link: "https://canon.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 28, nome: "Cestas Michelli", categoria: "Presentes", logo: "/logoCestasMichelli.png", palavrasChave: "cestas michelli, presentes", link: "https://cestasmichelli.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 29, nome: "Clube do Malte", categoria: "Bebidas", logo: "/logoClubeDoMalte.png", palavrasChave: "clube do malte, bebidas", link: "https://clubedomalte.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 30, nome: "Compra Certa", categoria: "Eletrodomesticos", logo: "/logoCompraCerta.png", palavrasChave: "compra certa, eletrodomésticos", link: "https://compracerta.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 31, nome: "Dafiti", categoria: "Roupas", logo: "/logoDafiti.png", palavrasChave: "dafiti, roupas", link: "https://dafiti.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 32, nome: "Drogão Net", categoria: "Farmácia", logo: "/logoDrogaoNet.png", palavrasChave: "droga online, farmácia", link: "https://drogao-net.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 33, nome: "Drogaria São Paulo", categoria: "Farmácia", logo: "/logoDrogariaSaoPaulo.png", palavrasChave: "drogaria são paulo, farmácia", link: "https://drogariasaopaulo.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 34, nome: "English Fluency", categoria: "Educação", logo: "/logoEnglishFluency.png", palavrasChave: "english fluency, educação", link: "https://english-fluency.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 35, nome: "Evino", categoria: "Bebidas", logo: "/logoEvino.png", palavrasChave: "evino, bebidas", link: "https://evino.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 36, nome: "Fila", categoria: "Roupas", logo: "/logoFila.png", palavrasChave: "fila, roupas", link: "https://fila.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 37, nome: "Giuliana Flores", categoria: "Flores", logo: "/logoGiulianaFlores.png", palavrasChave: "giuliana flores, flores", link: "https://giulianaflores.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 38, nome: "Gocase", categoria: "Acessórios", logo: "/logoGocase.png", palavrasChave: "gocase, acessórios", link: "https://gocase.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 39, nome: "Hope", categoria: "Roupas", logo: "/logoHope.png", palavrasChave: "hope, roupas", link: "https://hope.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 41, nome: "Ikesaki", categoria: "Beleza", logo: "/logoIkesaki.png", palavrasChave: "ikesaki, beleza", link: "https://ikesaki.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 42, nome: "Jequiti", categoria: "Cosméticos", logo: "/logoJequiti.png", palavrasChave: "jequiti, cosméticos", link: "https://jequiti.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 43, nome: "Kaspersky", categoria: "Segurança", logo: "/logoKaspersky.png", palavrasChave: "kaspersky, segurança", link: "https://kaspersky.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 44, nome: "L'Occitane", categoria: "Cosméticos", logo: "/logoLOccitane.png", palavrasChave: "l'occitane, cosméticos", link: "https://loccitane.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 45, nome: "L'Occitane en Provence", categoria: "Cosméticos", logo: "/logoLOccitaneEnProvence.png", palavrasChave: "l'occitane en provence, cosméticos", link: "https://loccitaneenprovence.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 46, nome: "Liv Up", categoria: "Alimentos", logo: "/logoLivUp.png", palavrasChave: "liv up, alimentos", link: "https://liv-up.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 47, nome: "Marcyn", categoria: "Roupas", logo: "/logoMarcyn.png", palavrasChave: "marcyn, roupas", link: "https://marcyn.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 48, nome: "Multilaser", categoria: "Tecnologia", logo: "/logoMultilaser.png", palavrasChave: "multilaser, tecnologia", link: "https://multilaser.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 49, nome: "Natura", categoria: "Cosméticos", logo: "/logoNatura.png", palavrasChave: "natura, cosméticos", link: "https://natura.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 50, nome: "Nova Flor", categoria: "Flores", logo: "/logoNovaFlor.png", palavrasChave: "nova flor, flores", link: "https://novaflor.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 51, nome: "O Boticário", categoria: "Cosméticos", logo: "/logoOBoticario.png", palavrasChave: "o boticário, cosméticos", link: "https://oboticario.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 52, nome: "Océane", categoria: "Cosméticos", logo: "/logoOceane.png", palavrasChave: "océane, cosméticos", link: "https://oceane.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 53, nome: "Oldflix", categoria: "Entretenimento", logo: "/logoOldflix.png", palavrasChave: "oldflix, entretenimento", link: "https://oldflix.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 54, nome: "Panasonic", categoria: "Tecnologia", logo: "/logoPanasonic.png", palavrasChave: "panasonic, tecnologia", link: "https://panasonic.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 55, nome: "Penalty", categoria: "Esportes", logo: "/logoPenalty.png", palavrasChave: "penalty, esportes", link: "https://penalty.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 56, nome: "Philips", categoria: "Tecnologia", logo: "/logoPhilips.png", palavrasChave: "philips, tecnologia", link: "https://philips.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 57, nome: "PneuStore", categoria: "Automotivo", logo: "/logoPneuStore.png", palavrasChave: "pneustore, automotivo", link: "https://pneustore.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 58, nome: "Puket", categoria: "Roupas", logo: "/logoPuket.png", palavrasChave: "puket, roupas", link: "https://puket.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 59, nome: "Salon Line", categoria: "Beleza", logo: "/logoSalonLine.png", palavrasChave: "salon line, beleza", link: "https://salonline.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 60, nome: "Sem Parar", categoria: "Serviços", logo: "/logoSemParar.png", palavrasChave: "sem parar, serviços", link: "https://semparar.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 61, nome: "Sephora", categoria: "Cosméticos", logo: "/logoSephora.png", palavrasChave: "sephora, cosméticos", link: "https://sephora.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 62, nome: "ShopClub Electrolux", categoria: "Eletrodomesticos", logo: "/logoShopClubElectrolux.png", palavrasChave: "shopclub electrolux, eletrodomésticos", link: "https://shopclubelectrolux.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 63, nome: "Shopee", categoria: "Ecommerce", logo: "/logoShopee.png", palavrasChave: "shopee, ecommerce", link: "https://shopee.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 64, nome: "The North Face", categoria: "Roupas", logo: "/logoTheNorthFace.png", palavrasChave: "the north face, roupas", link: "https://thenorthface.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 65, nome: "Tok&Stok", categoria: "Móveis", logo: "/logoTokStok.png", palavrasChave: "tok&stok, móveis", link: "https://tokstok.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 66, nome: "Travelex", categoria: "Serviços Financeiros", logo: "/logoTravelex.png", palavrasChave: "travelex, serviços financeiros", link: "https://travelex.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 67, nome: "Umbro", categoria: "Roupas", logo: "/logoUmbro.png", palavrasChave: "umbro, roupas", link: "https://umbro.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 68, nome: "Walita", categoria: "Eletrodomesticos", logo: "/logoWalita.png", palavrasChave: "walita, eletrodomésticos", link: "https://walita.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 69, nome: "WebFones", categoria: "Tecnologia", logo: "/logoWebFones.png", palavrasChave: "webfones, tecnologia", link: "https://webfones.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 70, nome: "Buser", categoria: "Transporte", logo: "/logoBuser.png", palavrasChave: "buser, transporte", link: "https://buser.parceriasonline.com.br/clube-da-rede-veiculos" }
      ]


    )
  }

  useEffect(() => {
    const memberDataHashParamValue = searchParams.get(MEMBER_DATA_HASH_URL_PARAM)
    checkIfIsMemberAuthenticated(memberDataHashParamValue ? memberDataHashParamValue.replaceAll(' ', '+') : null)
  }, [])

  useEffect(() => {
    buscaEmpresas()
  }, [])

  useEffect(() => {
    setEmpresas(listaEmpresas)
  }, [listaEmpresas])

  return (
    <div id="descontos">
      <div className="flex bg-red-700 justify-center h-20 items-center">
        <h3 className="text-2xl font-bold">Descontos</h3>
      </div>
      <div className="max-w-sm mx-auto mt-5">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Palavra Chave</label>
          <input type="text" id="first_name" value={palavraChave} onChange={(e: any) => setPalavraChave(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Palavra Chave" />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filtrar por Categoria</label>
          <select value={filterCategory} onChange={(e: any) => setFilterCategory(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
            <option value="Beleza">Beleza</option>
            <option value="Automotivo">Automotivo</option>
            <option value="Cosméticos">Cosméticos</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Entretenimento">Entretenimento</option>
            <option value="Flores">Flores</option>
            <option value="Acessórios">Acessórios</option>
            <option value="Segurança">Segurança</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Serviços">Serviços</option>
            <option value="Eletrodomesticos">Eletrodomésticos</option>
            <option value="Esportes">Esportes</option>
            <option value="Móveis">Móveis</option>
            <option value="Serviços Financeiros">Serviços Financeiros</option>
            <option value="Transporte">Transporte</option>
          </select>
        </div>
        <button onClick={handleSearch} className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded w-full mt-4">Buscar</button>
      </div>
      <div className="sm-grid flex flex-row flex-wrap gap-4 mt-5 px-4 justify-center">
        {empresas.map((empresas) =>
          <div key={empresas.id} className="grid justify-center bg-white items-center text-center rounded-lg">
            <div className="py-6 px-6 bg-slate-200 rounded-lg w-full">
              <Image className="xl:w-48 h-48 object-contain md:w-96 rounded-3xl" src={empresas.logo} alt="" width={350} height={350} />
            </div>
            <div className="max-w-full">
              <h3 className="text-black text-xl font-bold mt-4">{empresas.nome}</h3>
            </div>
            <a href={empresas.link} target="_blank" className="bg-red-700 hover:bg-red-800 text-white font-bold mx-6 my-4 py-2 px-4 rounded">Ver desconto</a>
          </div>

        )}

      </div>
    </div>
  )
}

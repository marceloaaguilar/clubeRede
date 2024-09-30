'use client'
import { Empresa } from "@/lib/interfaces"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useSearchParams } from 'next/navigation'
import ModalCupom from "./ModalCupom"
import { SpinningCircles } from 'react-loading-icons'
import { GoSearch } from "react-icons/go";
import Banners from "./Banners"

import Unauthenticated from "./../../public/unauthenticated.svg"

const AES = require("crypto-js/aes")
const CryptoJS = require("crypto-js");

const MEMBER_DATA_HASH_URL_PARAM = 'id'

export default function Discounts() {
  const [listaEmpresas, setListaEmpresas] = useState<Empresa[]>([])
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [filterCategory, setFilterCategory] = useState()
  const [palavraChave, setPalavraChave] = useState<string>()
  const [isMemberAuthenticated, setIsMemberAuthenticated] = useState<boolean>(false);
  const [isMemberAuthenticationLoading, setIsMemberAuthenticationLoading] = useState<boolean>(false);
  const [statusModalCupom, setStatusModalCupom] = useState<boolean>(false);
  const [linkCupom, setLinkCupom] = useState<string>('');
  const [cupomModal, setCupomModal] = useState<string>('');
  const [benefitsModal, setBenefitsModal] = useState<string>('');
  const [conditionsModal, setConditionsModal] = useState<string>('');
  const [validadeModal, setValidadeMotal] = useState<string>('');

  const searchParams = useSearchParams()

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

  const checkIfIsMemberAuthenticated = async (memberDataHash: string | null): Promise<void> => {
    setIsMemberAuthenticationLoading(true)
    try {
      if (!memberDataHash) {
        setIsMemberAuthenticationLoading(false);
        setIsMemberAuthenticated(false);
        return
      }

      const memberData = JSON.parse(AES.decrypt(memberDataHash, process.env.NEXT_PUBLIC_SECRET).toString(CryptoJS.enc.Utf8) ?? '')

      const isMemberAuthenticated = await authenticateMember(memberData.cpfCnpjCliente as string, memberData.token as string)

      if (!isMemberAuthenticated) {
        setIsMemberAuthenticationLoading(false);
        setIsMemberAuthenticated(false);
        return
      }

      setIsMemberAuthenticationLoading(false);
      setIsMemberAuthenticated(true);
    } catch (error) {
      setIsMemberAuthenticationLoading(false);
      setIsMemberAuthenticated(false);
      alert('Associado não autenticado.')
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

  const buscaEmpresas = async () => {
    await setListaEmpresas(
      [
        { id: 1, nome: "Riachuelo", categoria: "Roupas", logo: "/logoRiachuelo.png", palavrasChave: "roupas,riachuelo,moda", link: "https://riachuelo.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 3, nome: "Ponto", categoria: "Eletrodomesticos", logo: "/ponto_pontofrio.jpg", palavrasChave: "eletrodomésticos, ponto, ponto frio", link: "https://pontofrio.parcerialink.com.br/cluberede" },
        { id: 4, nome: "Loja Seculus", categoria: "Relogios", logo: "/logoSeculos.png", palavrasChave: "loja de relógios, relojoaria, seculus", cupom: 'REDE50', linkCupom: "https://seculusoutletday.com.br" },
        { id: 5, nome: "AliExpress", categoria: "Ecommerce", logo: "/Aliexpress_logo.png", palavrasChave: "china, ecommerce, aliexpress", link: "https://aliexpress.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 6, nome: "Hering", categoria: "Roupas", logo: "/heringLogo.png", palavrasChave: "roupas,hering,moda", link: "https://hering.parceriasonline.com.br/clube-da-rede-veiculos"},
        { id: 7, nome: "Hóteis", categoria: "Hoteis", logo: "/djsnlcisjvisjncisdp.png", palavrasChave: "hóteis, rede de hoteis, hoteis.com, viagem", link: "https://hoteis.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 8, nome: "Shoestock", categoria: "Tênis", logo: "/ligoShoestock.png", palavrasChave: "tenis,calçados,shoestock", link: "https://shoestock.parcerialink.com.br/cluberede" },
        { id: 9, nome: "Movida", categoria: "AluguelCarros", logo: "/logoMovida250x250px.png", palavrasChave: "aluguel de carros,movida,carros", link: "https://movida.parcerialink.com.br/cluberede" },
        { id: 10, nome: "Zattini", categoria: "Roupas", logo: "/clube-348.jpg", palavrasChave: "roupas,zattini,moda", link: "https://zattini.parcerialink.com.br/cluberede" },
        { id: 11, nome: "Vivara", categoria: "Joias", logo: "/vivara-logo.png", palavrasChave: "joias,vivara,pulseiras", link: "https://vivara.parcerialink.com.br/cluberede" },
        { id: 12, nome: "Centauro", categoria: "Tenis", logo: "/clube-422.jpg", palavrasChave: "esportes,centauro,atleta,tenis", link: "https://centauro.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 14, nome: "Netshoes", categoria: "Roupas", logo: "/clube-341.jpg", palavrasChave: "esportes,roupas,netshoes,tenis", link: "https://netshoes.parcerialink.com.br/cluberede" },
        { id: 15, nome: "Casas Bahia", categoria: "Eletrodomesticos", logo: "/clube-casasbahia.png", palavrasChave: "eletrodomésticos, casas bahia", link: "https://casasbahia.parcerialink.com.br/cluberede" },
        { id: 17, nome: "Petz", categoria: "Petshop", logo: "/LogoPetzCBC250x250.png", palavrasChave: "petshop, cachorro, gato, petz", link: "https://petz.parceriasonline.com.br/clube-da-rede-veiculos" },
        { id: 18, nome: "Dominos", categoria: "Pizzaria", logo: "/Dominos.jpg", palavrasChave: "pizzaria, pizza, comida, dominos, restaurante", cupom:"PIZZA30", linkCupom: 'https://www.dominos.com.br/pages/order/?utm_source=auget&utm_campaign=aug', benefits: "Aproveite 30% de desconto em pizzas!", conditions: 'Desconto válido para pedidos efetuados apenas no site ou App da Domino´s Pizza; Válido para Pizzas médias e grandes; Válido para massas fina ou tradicional e todos os sabores; Válido para todos os dias da semana; O desconto só é aplicado na pizza e não no pedido inteiro; Desconto não se aplica na taxa de entrega; Não cumulativo com outras promoções; Válido também para carryout: retirada na loja; O cupom de desconto deverá ser inserido no carrinho no momento do checkout; O desconto não será válido para pedidos no balcão; Confira as lojas participantes.' },
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
        { id: 69, nome: "WebFones", categoria: "Tecnologia", logo: "/logoWebFones.png", palavrasChave: "webfones, tecnologia", link: "https://webfones.parceriasonline.com.br/clube-da-rede-veiculos"},
        { id: 70, nome: "Buser", categoria: "Transporte", logo: "/logoBuser.png", palavrasChave: "buser, transporte, viagem", link: "https://buser.parceriasonline.com.br/clube-da-rede-veiculos"},
        { id: 71, nome: "Luckau", categoria: "Alimentos", logo: "/logoLuckau.png", palavrasChave: "chocolate, luckau, comida", cupom:"CLUBE12", linkCupom: 'https://www.luckau.com.br/', benefits: "Aproveite 12% OFF no site!", conditions: 'Aproveite 12% OFF em todo o site da Luckau. Cupom cumulativo com outras promoções. Cupom não cumulativo com outros cupons. O desconto não contempla o frete.' },
        { id: 72, nome: "JadeJade", categoria: "Roupas", logo: "/logoJadeJade.png", palavrasChave: "roupas, jadejade, moda", cupom:"TOP15", linkCupom: 'https://www.jadejade.com.br/', benefits: "Aproveite 15% OFF cumulativo + frete grátis no site da Jade²!", conditions: 'Aproveite 15% OFF + frete grátis em todo o site da JadeJade. Cupom cumulativo com outras promoções. Cupom não cumulativo com outros cupons. O desconto contempla o frete.', validade: '31/12/2024' },
        { id: 73, nome: "Mash", categoria: "Roupas", logo: "/logoMash.png", palavrasChave: "roupas, mash, moda", cupom:"QUERO", linkCupom: 'https://www.mash.com.br/', benefits: "Aproveite 15% OFF no site!", conditions: 'Aproveite 15% OFF em todo o site da Mash. Cupom não cumulativo com outras promoções. Cupom não cumulativo com outros cupons. O desconto não contempla o frete. Benefício válido para todo o site exceto produtos da marca Calvin Klein.' },
        { id: 74, nome: "Approve", categoria: "Roupas", logo: "/logoApprove.png", palavrasChave: "roupas, approve, moda", cupom:"QUINZE", linkCupom: 'https://www.justapprove.com.br/', benefits: "Aproveite 15% OFF no site da Approve!", conditions: 'Cupom cumulativo com outras promoções do site. Cupom não cumulativo com outros cupons. O desconto não contempla o frete.', validade: '31/12/2024' },
        { id: 75, nome: "Stanley", categoria: "Ferramentas", logo: "/logoStanley.png", palavrasChave: "canecas, stanley, copos, ferramentas", cupom:"DESC10", linkCupom: 'https://www.stanley1913.com.br/', benefits: "Aproveite 10% OFF na Stanley!", conditions: 'Cupom não cumulativo com outras promoções. Válido para todas as compras no site. O desconto não contempla o frete. Cupom não cumulativo com outros cupons. O cupom não é válido para Quenchers.' , validade: '31/12/2024' },
        { id: 76, nome: "Open English", categoria: "Escolas", logo: "/logoOpenEnglish.png", palavrasChave: "inglês, Open English, aprender", linkCupom: 'https://www.stanley1913.com.br/', benefits: "Aproveite 65% OFF nos cursos de inglês da Open English!", conditions: 'Clique no link indicado e preencha seus dados para ter acesso ao benefício. Não é necessário inserir cupom de desconto. Confira as demais condições e conditions no link. Promoção sujeita a alterações. As vendas dos cursos são feitas através de teleconsultores que entrarão em contato através do telefone fornecido no cadastro. Os descontos oferecidos podem sofrer alterações a depender de sazonalidades.' },
        { id: 77, nome: "FlixBus", categoria: "Transporte", logo: "/logoFlixBus.png", palavrasChave: "passagens, FlixBus, onibus, viagem", linkCupom: 'https://www.hiphiphour.com/0478bcd77185e5a95dda', benefits: "Aproveite 15% OFF em passagens na FlixBus!", conditions: 'Acesse o link, insira o seu nome e e-mail para receber o seu cupom de desconto no e-mail (confira a caixa de spam). Após o recebimento do cupom de desconto, o cliente deve acessar o site www.flixbus.com.br para escolher o seu destino e utilizar o seu cupom. O desconto é válido para viagens até 31.12.2024. O desconto só é válido para viagens em território brasileiro. Cupom cumulativo com outras promoções do site. Cupom não cumulativo com outros cupons. Não é possível creditar um voucher posteriormente a uma reserva já efetuada. Não é possível resgatar o valor do voucher em dinheiro. A revenda e publicação dos vouchers é proibida. A quantidade de vouchers é limitada a 4 (quatro) por pessoa por ano. O cupom é válido somente para viagens com parceiros operacionais da FlixBus (Veículos verdes, com a logomarca da FlixBus). O cupom não é válido para compras de passagens no marketplace da FlixBus (viagens de parceiros que utilizam o site da FlixBus como ferramenta de venda - veículos sem a logomarca da FlixBus).', validade: '31/12/2024' },
        { id: 78, nome: "Sam's Club", categoria: "Hipermercado", logo: "/logoSamsclub.png", palavrasChave: "hipermercado, Sam's Clube, clube", cupom:"CUP75GEN", linkCupom: 'https://sejasocio.samsclub.com.br/index.php/parcerias-75300/?codigo_parceria=Auget_485584&codigo_cupom=CUP75GEN&codigo_promotor&utm_source=_9999_parceria_auget&utm_medium=parceria&utm_campaign=cup75-junho2024', benefits: "Ganhe R$75,00 de desconto na sua primeira compra no Sam's Club!", conditions: 'Benefício válido para compras a partir de R$300,00. Válido somente para novos sócios. O valor de cashback estará disponível em até 48h após o pagamento da anuidade; O desconto será vinculado ao CPF do sócio titular e será fornecido automaticamente no momento do pagamento da compra no clube;Válido somente para utilização nas lojas físicas; Para aplicação do desconto, o sócio deve ter uma compra com valor maior e/ ou igual a R$ 300,00, o prazo de uso do desconto é de até 30 dias.' },
        { id: 79, nome: "Integral Médica", categoria: "Suplementos", logo: "/logoIntegralMedica.png", palavrasChave: "suplementos, Integral Médica", cupom:"CLUBE", linkCupom: 'https://www.integralmedica.com.br'},
        { id: 80, nome: "Pizzaria Spoleto", categoria: "Pizzaria", logo: "/logoPizzariaSpoleto.png", palavrasChave: "pizzaria, Spoleto, restaurante", cupom:"CLUBEPIZZA", linkCupom: 'https://www.pizzariaspoleto.com.br/tabs/cardapio', benefits: '50% desconto compras acima de 30,00 pedidos através do Site', conditions: 'Limitado a 1 uso por CPF.Não cumulativo com outras promoções.Válido somente para unidade Copacabana/RJ.'},
        { id: 81, nome: "Aldeia das Águas", categoria: "Resorts", logo: "/logoAldeiaDasAguas.png", palavrasChave: "resort, Aldeia das águas, viagem", link: "http://loja.multiclubes.com.br/aldeia/Ingressos/ingressogrupo?Promoter=anQ0VFc5cHhEakdESXBHeEZLUjBpUT09" },
        { id: 82, nome: "Nutrify", link: "https://www.nutrify.com.br/", logo: "/logoNutrify.png", categoria: "Saúde e Bem-estar", palavrasChave: "nutrição, suplementos, saúde" },
        { id: 83, nome: "De Marie Semi Joias", linkCupom: "https://www.demariesemijoias.com.br/", cupom: "BELIVE20", benefits: "20% OFF em todo o site", logo: "/logoDeMarieSemiJoias.png", categoria: "Joias", palavrasChave: "joias, semijoias, acessórios" },
        { id: 84, nome: "Água de Cheiro", linkCupom: "https://www.aguadecheiro.com.br/", cupom: "REDE15", benefits: "15% OFF em todo site.", logo: "/logoAguadeCheiro.png", categoria: "Perfumaria", palavrasChave: "perfume, fragrâncias, beleza" },
        { id: 85, nome: "Caveira Suplementos", linkCupom: "https://www.caveirasuplementos.com.br/", cupom: "CLUBEREDE", benefits: "15% OFF em todo site.", logo: "/logoCaveiraSuplementos.png", categoria: "Suplementos", palavrasChave: "suplementos, fitness, saúde" },
        { id: 86, nome: "University RD Station", link: "https://university.rdstation.com/", cupom: "Não é necessário inserir cupom de desconto.", benefits: "100% OFF em cursos do site", logo: "/logoRDUniversity.png", categoria: "Educação", palavrasChave: "cursos, marketing digital, educação" },
        { id: 87, nome: "Fundação Bradesco", link: "https://www.ev.org.br/", cupom: "Não é necessário inserir cupom de desconto.", benefits: "100% OFF em cursos do site", logo: "/logoFundacaoBradesco.png", categoria: "Educação", palavrasChave: "educação, cursos online, gratuito" },
        { id: 88, nome: "Sabrina Pratas", linkCupom: "https://sabrinapratas.com/", cupom: "REDE15", benefits: "15% OFF em todo site.", logo: "/logoSabrinaPratas.png", categoria: "Joias", palavrasChave: "pratas, semijoias, acessórios" },
        { id: 89, nome: "Monte Carlo", linkCupom: "https://montecarlo.parceriasonline.com.br/clube-da-rede-veiculos", cupom: "clubes12", benefits: "12% OFF em todo site", logo: "/logoMonteCarlo.png", categoria: "Joias", palavrasChave: "joias, acessórios, luxo" },
        { id: 90, nome: "LG", linkCupom: "https://lg.parceriasonline.com.br/clube-da-rede-veiculos", cupom: "PARCEIROLG5/PARCEIROLG10/PARCEIROLG15", benefits: "Até 18% OFF em produtos LG", conditions: "Cupom cumulativo com cupom de primeira compra. Adquira mais descontos através do pagamento no PIX. Não cumulativo com outras promoções vigentes no site LG; Válido apenas para (Audio & Video + Refrigeradores, Micro-ondas, Lava e Seca + Ar Condicionado). *Demais regras no rodapé. Produtos com até 5% de desconto + até 8% off pagando à vista via PIX ou em até 12x sem juros no cartão de crédito. Frete grátis por tempo indeterminado. Entrega disponível para regiões Sul, Sudeste, Capitais do Centro Oeste, Recife e Salvador. Consulte seu CEP. Para a região de São Paulo e Grande SP poderemos oferecer instalação grátis. Consulte regulamento válido no site. Não cumulativo.", validade: "Válido até 13/10 ou enquanto durarem os estoques", logo: "/logoLG.png", categoria: "Eletrônicos", palavrasChave: "eletrônicos, tecnologia, eletrodomésticos" },
        { id: 91, nome: "FGV", link: "https://educacao-executiva.fgv.br/cursos/gratuitos", benefits: "100% OFF em cursos do site", logo: "/logoFGV.png", categoria: "Educação", palavrasChave: "educação, cursos online, gratuito" },
        { id: 92, nome: "Nacional Inn", link: "https://www.nacionalinn.com.br/", logo: "/logoNacionalInn.png", categoria: "Hotéis", palavrasChave: "hotel, viagens, hospedagem, viagem" },
        { id: 93, nome: "RDC Viagens", link: "https://rdcviagens.com.br/", logo: "/logoRDCViagens.png", categoria: "Viagens", palavrasChave: "viagens, pacotes, turismo, viagem" },
        { id: 94, nome: "Zion Semi Joias", link: "https://zionsemijoias.com.br/", logo: "/logoZionSemiJoias.png", categoria: "Joias", palavrasChave: "semijoias, joias, acessórios" },
        { id: 95, nome: "Dollar", link: "https://iframe.sgrentals.com.br/iframe/home/?idUser=30891", logo: "/logoDollar.png", categoria: "Aluguel de Carros", palavrasChave: "carros, aluguel, transporte, viagem" },
        { id: 96, nome: "Rio Quente", link: "https://www.rioquente.com.br/", logo: "/logoRioQuente.png", categoria: "Turismo", palavrasChave: "resort, parque aquático, lazer, viagem" },
        { id: 97, nome: "Costa do Sauipe", link: "https://www.costadosauipe.com.br/", logo: "/logoCostaDoSauipe.png", categoria: "Turismo", palavrasChave: "resort, praia, lazer, viagem" },
        { id: 98, nome: "English Work", linkCupom: "https://englishwork.com.br/", cupom: "EWCLUBEREDE", benefits: "58% OFF no curso de inglês", logo: "/logoEnglishWork.png", categoria: "Educação", palavrasChave: "inglês, cursos, idiomas" },
        { id: 99, nome: "Le Postiche", linkCupom: "https://lepostiche.parceriasonline.com.br/clube-da-rede-veiculos", cupom: "proxymedia5/proxymedia10", benefits: "5% OFF/10% OFF na 1ª compra", conditions: "Não cumulativo com demais cupons promocionais", logo: "/logoLePostiche.png", categoria: "Acessórios", palavrasChave: "bolsas, mochilas, malas" },
        { id: 100, nome: "Sebrae", link: "https://sebrae.com.br/sites/PortalSebrae/cursosonline", cupom: "Não é necessário inserir cupom de desconto", logo: "/logoSebrae.png", categoria: "Educação", palavrasChave: "empreendedorismo, cursos, online" },
        { id: 101, nome: "Madesa", linkCupom: "https://www.madesa.com/", cupom: "CLUBEREDE", benefits: "7% OFF em todo o site, exceto montagem", logo: "/logoMadesa.png", categoria: "Móveis", palavrasChave: "móveis, decoração, casa" },
        { id: 102, nome: "Óticas On", link: "https://oticason.com.br/", logo: "/logoOticasOn.png", categoria: "Ópticas", palavrasChave: "óculos, lentes, acessórios" },
        { id: 103, nome: "Unidas", linkCupom: "https://www.unidas.com.br/parceiro/clube-rede", cupom: "Desconto aplicado exclusivamente pelo link", benefits: "10% OFF em aluguel de carros", conditions: "Desconto aplicado sobre a diária de 01 até 29º dias.", validade: "Válido até 19/09/2025", logo: "/logoUnidas.png", categoria: "Aluguel de Carros", palavrasChave: "carros, aluguel, transporte, viagem" },
        { id: 104, nome: "Hot Park", link: "https://rioquente.com.vc/parque/hot-park/", logo: "/logoHotPark.png", categoria: "Parque Aquático", palavrasChave: "parque, diversão, lazer" },
        { id: 105, nome: "Rent Cars", linkCupom: "https://www.rentcars.com/pt-br/?requestorid=8850&utm_source=www.agenciabelive.com.br&utm_medium=afiliado-link", cupom: "RCBELIVE5", benefits: "5% OFF", conditions: "Não válido para residentes EUA e Canadá", validade: "Válido até 31/12/2025", logo: "/logoRentCars.png", categoria: "Aluguel de Carros", palavrasChave: "carros, aluguel, viagens, viagem" },
        { id: 106, nome: "Meta", link: "https://pt-br.facebook.com/business/learn/courses", cupom: "Não é necessário inserir cupom de desconto", benefits: "100% OFF em cursos do site", logo: "/logoMeta.png", categoria: "Educação", palavrasChave: "cursos, facebook, marketing digital" },
        { id: 107, nome: "UVA", link: "https://graduacao.uva.br/extensao/?_ga=2.47309991.1428931641.1678403130-1781876364.1678403130", logo: "/logoUVA.png", categoria: "Educação", palavrasChave: "educação, cursos online, graduação" },
        { id: 108, nome: "Cruzeiro do Sul", link: "https://www.cruzeirodosulvirtual.com.br/", benefits: "100% OFF em cursos online", logo: "/logoCruzeirodoSul.png", categoria: "Educação", palavrasChave: "universidade, cursos, graduação" },
        { id: 109, nome: "Fesn", link: "https://vendas.alcaia.net/mariananevesdigital", benefits: "100% OFF em cursos online", logo: "/logoFESN.png", categoria: "Educação", palavrasChave: "Educação, Cursos, Online" },
        { id: 110, nome: "Havanna", linkCupom: "https://www.havanna.com.br/", cupom: "CLUBEREDE", benefits: "10% OFF em todo o site", logo: "/logoHavanna.png", categoria: "Culinária", palavrasChave: "Doces, Chocolates, Havanna" },
        { id: 111, nome: "Fisk", link: "https://www.fisk.com.br/", benefits: "20% OFF no curso de inglês", logo: "/logoFisk.png", categoria: "Educação", palavrasChave: "Inglês, Educação, Cursos" }
      ]


    )
  }

  const showDiscount = (cupom:string, link: string, benefits?: string, conditions?:string, validade?:string) => {
    setCupomModal(cupom);
    setLinkCupom(link);
    setBenefitsModal(benefits? benefits : '')
    setConditionsModal(conditions ? conditions: '')
    setValidadeMotal(validade ? validade : '')
    setStatusModalCupom(true);

  }

  const closeModal = () => setStatusModalCupom(false);

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
      { isMemberAuthenticated ? (
          <> 
            <div className="lg:px-24 lg:py-10 px-5 flex justify-center">
              <Banners/>
            </div>
            <div className="flex flex-col md:flex-row w-full justify-center mt-2 px-4 md:px-24 gap-4 md:gap-8 items-center">
              <div className="md:w-96 text-center">
                <p className="font-bold text-2xl my-2 text-red-500">Descontos e ofertas</p>
                <p className="text-white">Encontre as lojas com os melhores descontos e ofertas</p>
              </div>
              <div className="md:w-72">
                <label className="hidden md:block text-sm font-medium text-gray-900 dark:text-white">Palavra Chave</label>
                <input type="text" id="first_name" value={palavraChave} onChange={(e: any) => setPalavraChave(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Palavra Chave" />
              </div>
              <div className='md:w-72'>
                <label className="hidden md:block text-sm font-medium text-gray-900 dark:text-white">Filtrar por Categoria</label>
                <select value={filterCategory} onChange={(e: any) => setFilterCategory(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-[42px] w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="placeholder" selected>Escolha uma Categoria</option>
                  <option value="Acessórios">Acessórios</option>
                  <option value="Alimentos">Alimentos</option>
                  <option value="AluguelCarros">Aluguel de Carros</option>
                  <option value="Automotivo">Automotivo</option>
                  <option value="Beleza">Beleza</option>
                  <option value="Cosméticos">Cosméticos</option>
                  <option value="Ecommerce">E-Commerce</option>
                  <option value="Eletrodomesticos">Eletrodomésticos</option>
                  <option value="Embalagens">Embalagens</option>
                  <option value="Entretenimento">Entretenimento</option>
                  <option value="Escolas">Escolas</option>
                  <option value="Esportes">Esportes</option>
                  <option value="Faculdade">Faculdades</option>
                  <option value="Ferramentas">Ferramentas</option>
                  <option value="Flores">Flores</option>
                  <option value="Hoteis">Rede de Hóteis</option>
                  <option value="Joias">Loja de Jóias</option>
                  <option value="Móveis">Móveis</option>
                  <option value="Petshop">Pet Shop</option>
                  <option value="Pizzaria">Pizzaria</option>
                  <option value="Resorts">Resorts</option>
                  <option value="Roupas">Loja de Roupas</option>
                  <option value="Segurança">Segurança</option>
                  <option value="Serviços">Serviços</option>
                  <option value="Serviços Financeiros">Serviços Financeiros</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Tênis">Tênis</option>
                  <option value="Transporte">Transporte</option>
                </select>
              </div>
              <button onClick={handleSearch} className='flex justify-center gap-4 w-full md:w-auto bg-red-700 hover:bg-red-800 md:bg-transparent md:hover:bg-transparent text-white font-bold py-2 px-4 md:p-0 rounded cursor-pointer'>
                <span className="md:hidden">FILTRAR</span>
                <GoSearch className='md:w-8 md:h-8 md:mt-[25px] w-6 h-6 md:hover:text-gray-300' />
              </button>
            </div>
            <div className="sm-grid flex flex-row flex-wrap gap-4 mt-5 px-4 justify-center">
              { 
                empresas.map((empresas) =>
                  <div key={empresas.id} className="grid justify-center bg-white items-center text-center rounded-lg">
                    <div className="py-6 px-6 bg-slate-200 rounded-lg w-full">
                      <Image unoptimized className="xl:w-48 h-48 object-contain md:w-96 rounded-3xl" src={empresas.logo} alt="" width={350} height={350} />
                    </div>
                    <div className="max-w-full">
                      <h3 className="text-black text-xl font-bold mt-4">{empresas.nome}</h3>
                    </div>

                  {!empresas.linkCupom? (
                    <a href={empresas.link} target="_blank" className="bg-red-700 hover:bg-red-800 text-white font-bold mx-6 my-4 py-2 px-4 rounded">Ver desconto </a>
                    ) 
                      :(<a onClick={() => showDiscount(empresas.cupom !== undefined? empresas.cupom : '', empresas.linkCupom !== undefined ? empresas.linkCupom : '', empresas.benefits, empresas.conditions, empresas.validade)} className="bg-red-700 hover:bg-red-800 text-white font-bold mx-6 my-4 py-2 px-4 rounded cursor-pointer"> Ver Cupom </a>
                    )}

                  </div>
                )
              }
            </div>
            <ModalCupom isOpen={statusModalCupom} link={linkCupom} cupom={cupomModal} benefits={benefitsModal} conditions={conditionsModal} validade={validadeModal} onClose={closeModal}/>
          </>
        ) : (
          <div className='fullwidth text-center flex justify-center my-12 m-12 md:m-0'>
            { 
              isMemberAuthenticationLoading
              ? <div className='flex flex-col justify-center gap-10 text-center my-[20vh] md:my-0'>
                  <SpinningCircles className='mx-auto'/>
                  <span className='text-xl font-bold'>Carregando descontos...</span>
              </div>
              : <div className='flex flex-col justify-center gap-10'>
                <Image unoptimized src={Unauthenticated} alt="" width={400} height={400} />
                <span className='text-xl font-bold'>Associado não autenticado.</span>
              </div>
            }
          </div>
        )
      }
    </div>
  )
}

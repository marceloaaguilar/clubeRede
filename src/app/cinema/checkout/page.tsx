"use client"

import Navbar from "@/components/Navbar";
import { ValidationModal } from "@/components/ValidationModal";
import { useCart } from "@/context/CartProvider";
import { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import { useMercadoPago } from "@/hooks/useMercadoPago";

import successAnimation from "../../../components/sendMail/success-animation.json";
import dynamic from "next/dynamic";


export default function Checkout(){

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMessage, setIsLoadingMessage] = useState<string>("");

  const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
  
  const {items, removeItem} = useCart();

  const [totalValue, setTotalValue] = useState<string>("0,00");

  type Stage = "form" | "personalData" | "payment" | "pix" | "success";
  const [stage, setStage] = useState<Stage>("form");

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit">("credit");

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardBrand, setCardBrand] = useState<string | null>(null);
  
  const [postalCode, setPostalCode] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // PIX state
  const [pixData, setPixData] = useState<{ qrCode: string; qrCodeBase64: string; expirationDate: string } | null>(null);

  // Mercado Pago SDK
  const { isLoaded: mpIsLoaded, isLoading: mpIsLoading, error: mpError, createCardToken, getPaymentMethod } = useMercadoPago();

  // Detect card brand as user types
  useEffect(() => {
    const detectBrand = async () => {
      if (cardNumber.length >= 6 && mpIsLoaded) {
        const paymentMethod = await getPaymentMethod(cardNumber);
        setCardBrand(paymentMethod?.id || null);
      } else {
        setCardBrand(null);
      }
    };
    detectBrand();
  }, [cardNumber, mpIsLoaded, getPaymentMethod]);



  const handlePayment = () => {

    if (!name.trim() || !cpf.trim() || !email.trim() || !phone.trim()) {
      setModalMessage("Por favor, preencha todos os campos antes de continuar.");
      setModalOpen(true);
      return;
    }

    setStage("payment");
  }

  const handleConfirmPayment = async () => {
    const vouchers = items.map((item) => ({ id: item.id, quantity: item.quantity }));

    if (paymentMethod === "pix") {
      // Handle PIX payment
      setIsLoading(true);
      setIsLoadingMessage("Gerando QR Code PIX...");

      try {
        const payload = {
          clientData: {
            name: name,
            cpfCnpj: cpf.replace(/\D/g, ''),
            email: email,
            phone: phone,
            notificationDisabled: true
          },
          vouchers: vouchers,
          paymentMethod: "PIX"
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_CLUBE_CINEMA_URL}/voucher/book`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CLUBE_CINEMA_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok) {
          setModalMessage(result.message || result.error || 'Erro ao gerar PIX');
          setModalOpen(true);
          return;
        }

        // Set PIX data and move to PIX stage
        setPixData(result.pixData);
        setStage("pix");

      } catch (error) {
        console.error("Erro ao gerar PIX:", error);
        setModalMessage("Erro ao gerar QR Code PIX. Tente novamente.");
        setModalOpen(true);
      } finally {
        setIsLoading(false);
      }

    } else {
      // Handle CREDIT_CARD payment with Mercado Pago tokenization
      if (!mpIsLoaded) {
        setModalMessage(mpError || "Aguarde o carregamento do sistema de pagamento...");
        setModalOpen(true);
        return;
      }

      if (!cardName || !cardNumber || !expiry || !cvv) {
        setModalMessage("Preencha todos os dados do cartão.");
        setModalOpen(true);
        return;
      }

      const expiryData = expiry.split("/");
      const monthExpiry = expiryData[0];
      const yearExpiry = expiryData[1];

      if (!monthExpiry || !yearExpiry || monthExpiry.length !== 2 || yearExpiry.length !== 2) {
        setModalMessage("Preencha a validade do cartão corretamente (MM/AA).");
        setModalOpen(true);
        return;
      }

      setIsLoading(true);
      setIsLoadingMessage("Validando cartão...");

      try {
        // Tokenize card with Mercado Pago SDK
        const tokenResult = await createCardToken({
          cardNumber: cardNumber,
          cardholderName: cardName,
          expirationMonth: monthExpiry,
          expirationYear: yearExpiry,
          securityCode: cvv,
          identificationType: 'CPF',
          identificationNumber: cpf,
        });

        setIsLoadingMessage("Processando pagamento...");

        // Send tokenized payment to backend
        const payload = {
          clientData: {
            name: name,
            cpfCnpj: cpf.replace(/\D/g, ''),
            email: email,
            phone: phone,
            notificationDisabled: true
          },
          token: tokenResult.token,
          paymentMethodId: tokenResult.paymentMethodId,
          installments: 1,
          vouchers: vouchers,
          paymentMethod: "CREDIT_CARD"
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_CLUBE_CINEMA_URL}/voucher/book`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CLUBE_CINEMA_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok) {
          setModalMessage(result.message || result.error || 'Erro ao processar pagamento');
          setModalOpen(true);
          return;
        }

        setStage("success");

      } catch (error: any) {
        console.error("Erro no pagamento:", error);
        setModalMessage(error.message || "Erro ao processar pagamento. Verifique os dados do cartão.");
        setModalOpen(true);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const handlePostalCodeChange = async (postalCode:string) => {

    if (postalCode.length === 9) {

      const postalCodeData = await getPostalCodeData(postalCode);

      if (postalCodeData) {
        setStreet(postalCodeData.logradouro);
        setState(postalCodeData.uf);
        setCity(postalCodeData.localidade);
      }

    }

    const raw = postalCode.replace(/\D/g, "").slice(0, 8);
    const masked = raw.replace(/^(\d{5})(\d{1,3})?$/, "$1-$2");
    setPostalCode(masked);

  }

  const getPostalCodeData = async (postalCode: string) => {

    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_VIA_CEP_URL}/${postalCode.replace("-", "")}/json`, {
        headers: {
          'accept': 'application/json'
        },
        method: 'GET'
      });
  
      const result = await response.json();
      return result;

    } catch (error) {
      console.error(error)
    }

  }

  useEffect(()=> {
    const totalValue = items.reduce((acc,item) =>  acc + Number(item.paymentValue * (item.quantity || 0)), 0);
    setTotalValue(totalValue.toFixed(2).replace(".", ","));
  },[])
  
  return (
    <>
      <Navbar /> 
      
      {items.length > 0 ? (
        <div className="bg-black min-h-screen text-white overflow-x-hidden">

          <div className="px-6 py-4">
            <p className="font-bold text-3xl mb-4 text-red-500 ">Finalize a Compra de Seus Vouchers</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

              <div className="lg:col-span-2 w-full">

                {stage === "form" && items.map((item, index) => (
                  <div key={index} className="border border-gray-600 dark:border-gray-600 rounded-lg mb-4 px-2 select-none">

                    <div className="flex flex-col sm:flex-row sm:h-24 px-4 sm:px-10 py-2 relative">

                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 dark:text-red-500 dark:hover:text-red-700"
                        aria-label="Remover item"
                      >
                        ✕
                      </button>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
                        <div>
                          <h2 className="text-base sm:text-xl font-bold text-white dark:text-white">{item.title}</h2>
                          <p className="text-sm text-gray-300 dark:text-gray-300 mt-1">{item.description}</p>
                        </div>

                        <div>
                          <span>Quantidade: {item.quantity || 0}</span>
                        </div>

                        <p className="text-base sm:text-xl text-gray-100 dark:text-gray-100 font-bold">
                          R$ {item.paymentValue.toString().replace(".", ",")}
                        </p>
                      </div>

                    </div>

                  </div>
                ))}

                {stage === "personalData" && (
                  <div className="border border-gray-600 dark:border-gray-600 rounded-lg mb-4 select-none">
                    <div>
                      <h3 className="text-lg font-semibold text-white dark:text-white p-4 ">Dados pessoais</h3>
                      <hr className="border-gray-700 dark:border-gray-700" />
                    </div>

                    <div className="py-6 px-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block font-semibold mb-1">
                            Nome
                          </label>
                          <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Seu nome"
                            className="w-full border rounded px-3 py-2 text-black"
                          />
                        </div>

                        <div>
                          <label htmlFor="cpf" className="block font-semibold mb-1">
                            CPF
                          </label>
                          <input
                            id="cpf"
                            type="text"
                            value={cpf}
                            onChange={(e) => {
                              const rawValue = e.target.value.replace(/\D/g, ""); 

                              const masked = rawValue
                                .replace(/^(\d{3})(\d)/, "$1.$2")         
                                .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3") 
                                .replace(/\.(\d{3})(\d)/, ".$1-$2"); 

                              setCpf(masked);
                            }}

                            placeholder="000.000.000-00"
                            className="w-full border rounded px-3 py-2 text-black"
                            maxLength={14}
                          />
                        </div>


                        <div>
                          <label htmlFor="email" className="block font-semibold mb-1">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            className="w-full border rounded px-3 py-2 text-black"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block font-semibold mb-1">
                            Telefone
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                              const rawValue = e.target.value.replace(/\D/g, "");

                              const masked = rawValue
                                .replace(/^(\d{2})(\d)/, "($1) $2")       
                                .replace(/(\d{5})(\d{4})$/, "$1-$2");    

                              setPhone(masked);
                            }}
                            placeholder="(99) 99999-9999"
                            className="w-full border rounded px-3 py-2 text-black"
                            maxLength={15}
                          />
                        </div>


                      </div>

                      <button
                        onClick={handlePayment}
                        className="w-full bg-red-700 hover:bg-red-800 text-white font-bold rounded py-2 mt-6"
                      >
                        Ir para Pagamento
                      </button>

                    </div>

                  </div>
                )}

                {stage === "payment" && (
                  <div className="border border-gray-600 dark:border-gray-600 rounded-lg mb-4 select-none">
                    <div>
                      <h3 className="text-lg font-semibold text-white dark:text-white p-4">Pagamento</h3>
                      <hr className="border-gray-600 dark:border-gray-600" />
                    </div>

                    <div className="py-6 px-8 space-y-6">
                      <div className="flex gap-4">
                        <button
                          onClick={() => setPaymentMethod("pix")}
                          className={`flex-1 py-2 rounded font-bold border ${
                            paymentMethod === "pix"
                              ? "bg-red-700 text-white"
                              : "bg-neutral-800 dark:bg-neutral-800 border-gray-600 dark:border-gray-600 text-white dark:text-white"
                          }`}
                        >
                          PIX
                        </button>

                        <button
                          onClick={() => setPaymentMethod("credit")}
                          className={`flex-1 py-2 rounded font-bold border ${
                            paymentMethod === "credit"
                              ? "bg-red-700 text-white"
                              : "bg-neutral-800 dark:bg-neutral-800 border-gray-600 dark:border-gray-600 text-white dark:text-white"
                          }`}
                        >
                          Cartão de Crédito
                        </button>

                      </div>

                      {paymentMethod === "credit" && (
                        <>
                          <div>

                            <div>
                              <h4 className="text-lg font-semibold text-white dark:text-white ">Dados do Cartão</h4>
                              <hr className="border-gray-700 dark:border-gray-700 pb-4" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="sm:col-span-2">
                                <label className="block font-semibold mb-1">Nome no Cartão</label>
                                <input
                                  type="text"
                                  value={cardName}
                                  onChange={(e) => setCardName(e.target.value)}
                                  placeholder="Nome impresso no cartão"
                                  className="w-full border rounded px-3 py-2 text-black"
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block font-semibold mb-1">Número do Cartão</label>
                                <input
                                  type="text"
                                  value={cardNumber}
                                  onChange={(e) =>
                                    setCardNumber(e.target.value.replace(/\D/g, ""))
                                  }
                                  placeholder="0000 0000 0000 0000"
                                  className="w-full border rounded px-3 py-2 text-black"
                                  maxLength={16}
                                />
                              </div>

                              <div>
                                <label className="block font-semibold mb-1">Validade</label>
                                <input
                                  type="text"
                                  value={expiry}
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                                    const masked = value.replace(/^(\d{2})(\d{1,2})$/, "$1/$2");
                                    setExpiry(masked);
                                  }}
                                  placeholder="MM/AA"
                                  className="w-full border rounded px-3 py-2 text-black"
                                  maxLength={5}
                                />
                              </div>

                              <div>
                                <label className="block font-semibold mb-1">CVV</label>
                                <input
                                  type="text"
                                  value={cvv}
                                  onChange={(e) =>
                                    setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                                  }
                                  placeholder="123"
                                  className="w-full border rounded px-3 py-2 text-black"
                                  maxLength={4}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="pt-6">

                            <div>
                              <h4 className="text-lg font-semibold text-white dark:text-white ">Endereço de Cobrança</h4>
                              <hr className="border-gray-700 dark:border-gray-700 pb-4" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div className="sm:col-span-1">
                                <label className="block font-semibold mb-1">CEP</label>
                                <input
                                  type="text"
                                  value={postalCode}
                                  onChange={(e) => {
                                  handlePostalCodeChange(e.target.value)
                                  }}
                                  placeholder="00000-000"
                                  className="w-full border rounded px-3 py-2 text-black"
                                  maxLength={10}
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block font-semibold mb-1">Rua</label>
                                <input
                                  type="text"
                                  value={street}
                                  onChange={(e) => setStreet(e.target.value)}
                                  placeholder="Rua Exemplo"
                                  className="w-full border rounded px-3 py-2 text-black"
                                />
                              </div>

                              <div className="sm:col-span-1">
                                <label className="block font-semibold mb-1">Número</label>
                                <input
                                  type="text"
                                  value={number}
                                  onChange={(e) => setNumber(e.target.value)}
                                  placeholder="123"
                                  className="w-full border rounded px-3 py-2 text-black"
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block font-semibold mb-1">Complemento</label>
                                <input
                                  type="text"
                                  value={complement}
                                  onChange={(e) => setComplement(e.target.value)}
                                  placeholder="Apto, bloco, etc."
                                  className="w-full border rounded px-3 py-2 text-black"
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block font-semibold mb-1">Cidade</label>
                                <input
                                  type="text"
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                  placeholder="Sua cidade"
                                  className="w-full border rounded px-3 py-2 text-black"
                                />
                              </div>

                              <div className="sm:col-span-1">
                                <label className="block font-semibold mb-1">Estado</label>
                                <input
                                  type="text"
                                  value={state}
                                  onChange={(e) => setState(e.target.value)}
                                  placeholder="UF"
                                  className="w-full border rounded px-3 py-2 text-black"
                                  maxLength={2}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      <button
                        onClick={handleConfirmPayment}
                        className="w-full bg-red-700 hover:bg-red-800 text-white font-bold rounded py-2"
                      >
                        {paymentMethod === "pix" ? "Gerar QR Code PIX" : "Confirmar Pagamento"}
                      </button>
                    </div>
                  </div>
                )}

                {stage === "pix" && pixData && (
                  <div className="border border-gray-600 dark:border-gray-600 rounded-lg mb-4 select-none">
                    <div>
                      <h3 className="text-lg font-semibold text-white dark:text-white p-4">Pagamento PIX</h3>
                      <hr className="border-gray-600 dark:border-gray-600" />
                    </div>

                    <div className="py-6 px-8 flex flex-col items-center space-y-6">
                      <div className="bg-white p-4 rounded-lg">
                        {pixData.qrCodeBase64 ? (
                          <img 
                            src={`data:image/png;base64,${pixData.qrCodeBase64}`} 
                            alt="QR Code PIX" 
                            className="w-64 h-64"
                          />
                        ) : (
                          <div className="w-64 h-64 flex items-center justify-center bg-gray-200 rounded">
                            <p className="text-gray-500 text-center px-4">QR Code não disponível</p>
                          </div>
                        )}
                      </div>

                      <div className="w-full">
                        <label className="block font-semibold mb-2 text-center">Ou copie o código PIX:</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={pixData.qrCode || ''}
                            readOnly
                            className="flex-1 border rounded px-3 py-2 text-black text-sm"
                          />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(pixData.qrCode || '');
                              setModalMessage("Código PIX copiado!");
                              setModalOpen(true);
                            }}
                            className="bg-red-700 hover:bg-red-800 text-white font-bold px-4 py-2 rounded"
                          >
                            Copiar
                          </button>
                        </div>
                      </div>

                      <div className="text-center text-gray-300 text-sm">
                        <p>Abra o app do seu banco</p>
                        <p>Escolha pagar via PIX com QR Code ou código</p>
                        <p>Escaneie ou cole o código acima</p>
                        {pixData.expirationDate && (
                          <p className="mt-2 text-yellow-400">
                            Válido até: {new Date(pixData.expirationDate).toLocaleString('pt-BR')}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => setStage("payment")}
                        className="text-gray-400 hover:text-white underline"
                      >
                        Voltar e escolher outro método
                      </button>
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className='fixed  flex-col inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <OrbitProgress color="#B91C1C" size="medium" text="" textColor="" />
                    <span className='text-xl font-bold'>{isLoadingMessage}.</span>
                  </div> 
                )}

              </div>

              {stage !== "success" &&
                <div className="h-fit border border-gray-600 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center select-none p-6">

                  <div className="flex flex-col justify-between w-full">

                    <div className="flex w-full justify-between mb-2">
                      <p className="font-bold text-base sm:text-xl ">Total</p>
                      <p className="font-bold text-base sm:text-xl">R$ {totalValue}</p>
                    </div>

                    <p className="text-xs text-gray-300">Seus vouchers serão enviados por e-mail</p>
                  </div>

                  {stage === "form" && 
                    <button
                      onClick={() => setStage("personalData")}
                      className={`w-full bg-red-700 hover:bg-red-800 text-white font-bold rounded py-2 mt-4 ${stage === "form" ? "block" : "invisible"}`}>
                      Prosseguir para Pagamento
                    </button>
                  }

                </div>
              }

            </div>

          </div>

          {stage === "success" && (
            <div className="flex flex-col items-center justify-center py-20">
              <Lottie animationData={successAnimation} style={{ width: 100, height: 100 }} loop={false} />
              <h3 className="text-white text-center">Sua compra foi realizada com sucesso!</h3>
              <span className="text-white text-center">Seu(s) código(s) será(ão) enviado(s) por e-mail</span>
            </div>
          )}

        </div> 
      ) :<div className="text-center py-2"><span>Você não possui vouchers no carrinho!</span></div>}

      <ValidationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} message={modalMessage}/>
            
    </>
  )


}
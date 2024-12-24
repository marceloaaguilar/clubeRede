import { useEffect, useState } from "react";
import { sendMail } from "./sendMail/sendMail";
import mountHtmlEmail from "./mountHtmlEmail";
import { ClipLoader } from 'react-spinners';
import Lottie from 'lottie-react';
import successAnimation from './sendMail/success-animation.json'

export default function ModalReport(props:any) {
  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [message,setMessage] = useState("");
  const [showRequiredField,setShowRequiredField] = useState(false);
  const [sendingEmail, setSendingEmail] = useState("");

  const handleSubmit = async (e:any) => {
    
    e.preventDefault();

    if (!name || !phone || !message) {
      setShowRequiredField(true);
      return;
    }

    const htmlEmail = mountHtmlEmail(name, phone, message);
    setSendingEmail("sending");
    await sendMail("Solicitação de suporte", htmlEmail).then((e) => {
      if (e) {
        setSendingEmail("success");
      }
    });
  }

  useEffect(()=> {
    setName("");
    setPhone("");
    setMessage("");
    setSendingEmail("");

  }, [props.isOpen === false]);

  useEffect(()=> {

    if (phone) {
      setPhone(phone.replace(/\D/g, '') 
      .replace(/(\d{2})(\d)/, '($1) $2') 
      .replace(/(\d{5})(\d{1,4})$/, '$1-$2'));
    }

  },[phone])

  return (
    props.isOpen? (
      <div id="popup-modal" className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-50">
        <div className="relative p-4 w-full max-w-xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

            <button type="button" onClick={props.onClose}
              className="absolute 
              top-3 end-2.5 text-gray-400 bg-transparent 
              hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto 
              inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">

              <svg className="w-3 h-3" aria-hidden="true"xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Fechar</span>
            </button>

            <div className="p-4 md:p-5 text-left">

              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">
                Formulário de Suporte
              </h2>

            {!sendingEmail ? (
              <form className="p-2">
                <div className="mb-4">
                  <label className="block text-white text-sm font-regular mb-2" htmlFor="nome">Nome</label>
                  <input type="text" id="nome"  value={name} onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Seu nome"/>
                    {showRequiredField && !name ?  <p className="mt-2 text-sm text-red-400" v-if="$v.user.email.$error">Digite o seu nome</p> : '' }
                </div>

                <div className="mb-4">
                  <label className="block text-white-700 text-sm font-regular mb-2" htmlFor="telefone"> Telefone</label>
                  <input type="tel" id="telefone" maxLength={15} value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Seu telefone"/>
                    {showRequiredField && !phone ?  <p className="mt-2 text-sm text-red-400" v-if="$v.user.email.$error">Digite o seu telefone</p> : '' }

                </div>

                <div className="mb-4">
                  <label className="block text-white text-sm font-regular mb-2" htmlFor="pedido-suporte">Pedido de Suporte</label>
                  <textarea id="pedido-suporte" value={message} onChange={(e) => setMessage(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Descreva seu pedido de suporte"/>
                    {showRequiredField && !message ?  <p className="mt-2 text-sm text-red-400" v-if="$v.user.email.$error">Digite a mensagem</p> : '' }
                </div>

                <button type="submit" onClick={(e)=> handleSubmit(e)}
                  className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Enviar
                </button>
              </form>

            ) : ''}

            {sendingEmail === 'sending' ? (
              <div className="flex flex-col items-center py-20">
                  <ClipLoader color="white" size={50} /> 
                  <p className="text-white">Enviando solicitação</p>
              </div>
            ): '' } 

            {sendingEmail === 'success' && (
              <div className="flex flex-col items-center py-20">
                  <Lottie animationData={successAnimation} style={{ width: 100, height: 100 }} loop={false} />
                  <p className="text-white text-center">Solicitação enviada com sucesso!</p>
              </div>
          )}

            </div>
          </div>
        </div>
      </div>
    ): ''
  )
}
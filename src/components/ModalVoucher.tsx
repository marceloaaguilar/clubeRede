import { ModalVoucherProps, Voucher } from "@/lib/interfaces";
import { useContext, useState } from "react";

import { useCart } from "@/context/CartProvider";


import { FaPlus, FaMinus  } from "react-icons/fa";
import { useRouter  } from "next/navigation";


export default function ModalVoucher({ isOpen, onClose, vouchers, onChange}:ModalVoucherProps) {

  const {items, addItems} = useCart();
  const [showAlert, setShowAlert] = useState(false);
  
  const router = useRouter();

  if (!isOpen || !vouchers) return;
  

  const handleVoucherQuantity = (quantity:number, id:string) => {

    let voucherWithUpdatedQuantity = vouchers.map((voucher)=> {

      if (voucher.id === id) {
        return {...voucher, quantity: quantity};
      }

      return voucher

    });

    onChange(voucherWithUpdatedQuantity);

  };

  const handleCart = (vouchers: Voucher[]) => {

    if (!vouchers || vouchers.length === 0) return;

    addItems(vouchers.filter((vouchers) => (vouchers.quantity || 0) > 0));

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);

  }

  const handleFinishPurchase = (vouchers: Voucher[]) => {


    if (!vouchers || vouchers.length === 0) return;
    addItems(vouchers.filter((vouchers) => (vouchers.quantity || 0) > 0));

    router.push("/cinema/checkout")

  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl max-h-[80vh]">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg text-sm w-8 h-8 flex items-center justify-center"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {vouchers.length > 0 ?
            <>
              <div className="p-10 overflow-y-auto max-h-[65vh] space-y-4">

                {vouchers.map((voucher, index) => (

                  <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 select-none">
                    <div className="flex justify-between items-center">

                      <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{voucher.title}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{voucher.description}</p>
                        {/* <p className="text-sm text-gray-600 dark:text-gray-300 mt-2"><strong>Regras:</strong> {voucher.rules}</p> */}
                        <p className="text-xl text-gray-800 dark:text-gray-100 mt-2 font-bold">R$ {voucher.paymentValue.toString().replace(".", ',')}</p>
                      </div>

                      <div className="flex justify-between items-center">

                        <div className="p-2 mx-2 bg-red-700 hover:bg-red-900 rounded-md cursor-pointer" onClick={() => {voucher.quantity && handleVoucherQuantity(voucher.quantity - 1, voucher.id)}}>
                          <FaMinus/>
                        </div>

                        <span>{voucher.quantity || 0}</span>

                        <div className="p-2 mx-2 bg-red-700 hover:bg-red-900 rounded-md cursor-pointer" onClick={() => handleVoucherQuantity((voucher.quantity || 0) + 1, voucher.id)}>
                          <FaPlus/>
                        </div>

                      </div>


                    </div>
                  </div>

                ))}

              </div>

              <div className="text-center flex justify-center">

                <button type="button" onClick={() => handleCart(vouchers)} className="bg-none border-red-700 border hover:bg-red-900 hover:border-red-900 text-white font-bold mx-6 my-4 py-2 px-4 rounded transition delay-150 duration-300 ease-in-out">
                  Adicionar ao Carrinho
                </button>

                <button type="button" onClick={() => handleFinishPurchase(vouchers)} className="bg-red-700 border-red-700 border hover:bg-transparent text-white font-bold mx-6 my-4 py-2 px-4 rounded transition delay-150 duration-300 ease-in-out">
                  Finalizar Compra
                </button>

              </div>
              
            </> : <div className="p-10 overflow-y-auto max-h-[65vh] space-y-4"><p> Não foram encontrados vouchers disponíveis para esse estabelecimento!</p></div> 
          }

          {showAlert && (
            <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-down">
              Item adicionado ao carrinho!
            </div>
          )}

        </div>

      </div>
    </div>
    
  );
};
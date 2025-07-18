import { useCart } from "@/context/CartProvider";
import Link from "next/link";
import { useState } from "react";
import { FaCartPlus, FaTrash } from "react-icons/fa";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);

  const {items, removeItem} = useCart();

  const [openModalDeleteItem, setOpenModalDeleteItem] = useState<boolean>(false);
  const [voucherToDelete, setVoucherToDelete] = useState<string>("");


  const handleOpenModalDeleteCart = (item: string) => {
    setOpenModalDeleteItem(true);
    setVoucherToDelete(item);
  }

  const handleConfirmDelete = () => {

    if (!voucherToDelete) return;
    
    removeItem(voucherToDelete);
    setOpenModalDeleteItem(false);

  }

  const handleCloseModalDelete = () => {
    setVoucherToDelete("");
    setOpenModalDeleteItem(false);
  }


  return (
    <>
      <div className="fixed right-2 bottom-2 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="p-4 text-3xl bg-red-700 rounded-full hover:bg-red-900 cursor-pointer"
          aria-label="Abrir carrinho"
        >
          <FaCartPlus color="#FFFFFF" />
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-96 bg-white dark:bg-neutral-800 border-l border-gray-200 dark:border-neutral-700 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Carrinho">

        <div className="flex flex-col h-full">

          <header className="p-2 flex justify-between items-center border-b dark:border-neutral-700">
            <h2 className="text-xl font-semibold text-black dark:text-white">Carrinho</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-white"
              aria-label="Fechar carrinho"
            >
              ✕
            </button>
          </header>

          <div className="w-full h-full flex flex-col">

            <div className="flex-1 overflow-auto pb-36
              [&::-webkit-scrollbar]:w-2 
              [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-red-700
              [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-red-700 
              dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-red-700">
              
              {items.length > 0 ? items.map((item, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg m-4 p-4 select-none">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-white">{item.title}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.description}</p>
                      <p className="text-xl text-gray-800 dark:text-gray-100 mt-2 font-bold">R$ {item.paymentValue.toString().replace(".", ',')}</p>
                      <span>Quantidade: {item.quantity || 0}</span>
                    </div>
                    <div className="text-xl cursor-pointer text-red-500 hover:text-red-700" onClick={() => handleOpenModalDeleteCart(item.id)}>
                      <FaTrash />
                    </div>
                  </div>
                </div>
              )) : (
                <div className="p-4">
                  <p className="text-gray-600 dark:text-gray-300">Seu carrinho está vazio.</p>
                </div>
              )}
            </div>

            <div className="fixed bottom-0 left-0 w-full flex justify-center bg-neutral-900 py-4 z-50">
              <Link href="/cinema/checkout">
                <button
                  disabled={items.length === 0}
                  className={`${
                    items.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-700 hover:bg-red-800"
                  } text-white font-bold py-2 px-4 mx-2 rounded`}
                >
                  Finalizar Compra
                </button>
              </Link>
            </div>

          </div>

        </div>
      </div>

      {openModalDeleteItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-neutral-800 rounded-md p-6 max-w-sm w-full shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Confirmar exclusão
              </h3>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                Tem certeza que deseja remover o item do carrinho?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-neutral-600"
                  onClick={handleCloseModalDelete}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                  onClick={handleConfirmDelete}
                >
                  Excluir
                </button>
              </div>
            </div>
        </div>
      )}
    </>
  );
}

type ValidationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
};

export function ValidationModal({ isOpen, onClose, message }: ValidationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-sm w-full p-6">
        <h3 className="text-lg font-bold mb-4 text-red-600">Atenção</h3>
        <p className="mb-6 text-gray-700 dark:text-gray-300">{message}</p>
        <button
          onClick={onClose}
          className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded w-full"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

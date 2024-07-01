const Popup = ({
  message,
  onClose,
}: {
  message: string;
  onClose: (() => void) | null;
}) => {
  return (
    <div className="min-w-113px h-46px rounded-5px flex gap-8px justify-around items-center bg-red30 text-white text-16px px-16px animate-fadeIn">
      <p className="block">{message}</p>
      {onClose && <button onClick={onClose}>x</button>}
    </div>
  );
};

export default Popup;

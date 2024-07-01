interface ModalWrapperProps {
  children: React.ReactNode;
}

function ModalWrapper({ children }: ModalWrapperProps) {
  return (
    <>
      <div className="modal-overlay"></div>
      <div className="modal-container">{children}</div>
    </>
  );
}

export default ModalWrapper;

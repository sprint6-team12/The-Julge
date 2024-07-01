export interface GnbUiButtonProps {
  name: string;
  id: string;
  handleClickButton: (pathname: string) => void;
}

export default function GnbUiButton({
  name,
  id,
  handleClickButton,
}: GnbUiButtonProps) {
  const handleClick = () => {
    handleClickButton(id);
  };

  return (
    <button type="button" onClick={handleClick}>
      {name}
    </button>
  );
}

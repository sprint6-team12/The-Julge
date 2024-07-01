interface ButtonProps {
  children: React.ReactNode;
  className: string;
  disabled?: boolean;
  onClick?: () => void;
  onSubmit?: () => void;
  type?: 'button' | 'submit';
}

function Button({
  children,
  className,
  onClick,
  onSubmit,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const classMap: Record<string, string> = {
    button_large: disabled ? 'button_large_disActive' : 'button_large_active',
    button_large_fill: disabled
      ? 'button_large_disActive flex-1'
      : 'button_large_active flex-1',
    button_medium: disabled
      ? 'button_medium_disActive'
      : 'button_medium_active',
    button_medium_fill: disabled
      ? 'button_medium_disActive flex-1'
      : 'button_medium_active flex-1',
    button_small: disabled ? 'button_small_disActive' : 'button_small_active',
    button_small_fill: disabled
      ? 'button_small_disActive flex-1'
      : 'button_small_active flex-1',
  };

  const finalClassName = classMap[className] || className;

  return (
    <button
      className={finalClassName}
      onClick={onClick}
      onSubmit={onSubmit}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;

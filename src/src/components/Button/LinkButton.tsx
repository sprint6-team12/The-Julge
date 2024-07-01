import Link from 'next/link';

interface ButtonLinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

function getClassName(
  className: string | undefined,
  disabled: boolean
): string {
  const classMap: Record<string, string> = {
    button_large: disabled ? 'button_large_active' : 'button_large_disActive',
    button_large_fill: disabled
      ? 'button_large_active flex-1'
      : 'button_large_disActive flex-1',
    button_medium: disabled
      ? 'button_medium_active'
      : 'button_medium_disActive',
    button_medium_fill: disabled
      ? 'button_medium_active flex-1'
      : 'button_medium_disActive flex-1',
    button_small: disabled ? 'button_small_active' : 'button_small_disActive',
    button_small_fill: disabled
      ? 'button_small_active flex-1'
      : 'button_small_disActive flex-1',
  };

  return classMap[className ?? ''] ?? className ?? '';
}

function LinkButton({
  children,
  className,
  href,
  disabled = false,
}: ButtonLinkProps) {
  const finalClassName = getClassName(className, disabled);

  return (
    <Link className={finalClassName} href={href}>
      {children}
    </Link>
  );
}
export default LinkButton;

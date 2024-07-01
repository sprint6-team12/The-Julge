import { forwardRef } from 'react';

function InputText(
  { className, ...rest }: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <input className={`input-base w-full ${className}`} ref={ref} {...rest} />
  );
}

forwardRef(InputText).displayName = 'InputText';

export default forwardRef(InputText);

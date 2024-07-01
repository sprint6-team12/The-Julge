import { forwardRef } from 'react';

function BaseInput(
  { className, ...rest }: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>
) {
  return <input className={`h-full w-full ${className}`} ref={ref} {...rest} />;
}

forwardRef(BaseInput).displayName = 'BaseInput';

export default forwardRef(BaseInput);

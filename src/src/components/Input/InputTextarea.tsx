import { forwardRef } from 'react';

function InputTextarea(
  { className, ...rest }: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  ref: React.Ref<HTMLTextAreaElement>
) {
  return (
    <textarea
      className={`input-base w-full h-full resize-none ${className} `}
      ref={ref}
      {...rest}
    />
  );
}

forwardRef(InputTextarea).displayName = 'InputTextarea';

export default forwardRef(InputTextarea);

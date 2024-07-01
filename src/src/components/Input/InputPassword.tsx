import { useState, forwardRef } from 'react';
import BaseInput from '@/components/Input/BaseInput';
import { IconEye, IconEyeOff } from '@/lib/utils/Icons';

function InputPassword(
  { className, ...rest }: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>
) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className={`relative input-base flex items-center ${className}`}>
      <BaseInput
        type={isPasswordVisible ? 'text' : 'password'}
        ref={ref}
        className="bg-transparent"
        {...rest}
      />
      <button
        type="button"
        onClick={handleTogglePasswordVisibility}
        className="absolute right-0 -translate-x-1/2 h-24px w-24px bg-transparent"
      >
        {isPasswordVisible ? <IconEyeOff /> : <IconEye />}
      </button>
    </div>
  );
}

forwardRef(InputPassword).displayName = 'InputPassword';

export default forwardRef(InputPassword);

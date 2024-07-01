import BaseInput from '@/components/Input/BaseInput';
import { IconCamera } from '@/lib/utils/Icons';

interface ImageInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

// *** 기본 이미지 input UI만 추가해놓은 상태입니다
// 자유롭게 변경해서 사용해주세요...
function ImageInput({
  className,
  id,
  name,
  placeholder = '이미지를 추가해주세요',
  ...rest
}: ImageInputProps) {
  return (
    <div className={`flex min-h-168px min-w-168px gap-8px ${className}`}>
      <label
        htmlFor={name}
        className="flex-center h-276px w-483px flex-col gap-12px rounded-5px bg-gray10 border-1px border-gray30"
      >
        <IconCamera className="h-32px w-32px" />
        <p className="font-bold text-16px text-gray40">{placeholder}</p>
        <BaseInput
          id={id}
          name={name}
          type="file"
          accept="image/*"
          className="hidden"
          {...rest}
        />
      </label>
    </div>
  );
}

export default ImageInput;

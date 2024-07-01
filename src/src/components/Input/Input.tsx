import BaseInput from '@/components/Input/BaseInput';
import InputImage from '@/components/Input/InputImage';
import InputPassword from '@/components/Input/InputPassword';
import InputText from '@/components/Input/InputText';
import InputTextArea from '@/components/Input/InputTextarea';

const Input = Object.assign(BaseInput, {
  Text: InputText,
  Textarea: InputTextArea,
  Image: InputImage,
  Password: InputPassword,
});

export default Input;

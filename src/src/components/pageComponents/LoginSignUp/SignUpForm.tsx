import { useState } from 'react';
import Button from '@/components/Button/Button';
import userAPI from '@/lib/api/userAPI';
import { SignUpValidate } from '@/lib/utils/validation';
import InputComponent from './InputComponent';
import MemberTypeToggle from './MemberTypeToggle';

const SignUpForm = ({ onSignUpSuccess }: { onSignUpSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    signUpEmail: '',
    signUpPassword: '',
    signUpPasswordConfirm: '',
  });
  const [userType, setUserType] = useState<'employee' | 'employer'>('employee');
  const [errors, setErrors] = useState({
    signUpEmail: '',
    signUpPassword: '',
    signUpPasswordConfirm: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const errorMessage = SignUpValidate(name, value, formData);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !errors.signUpEmail &&
      !errors.signUpPassword &&
      !errors.signUpPasswordConfirm
    ) {
      try {
        await userAPI.postUserData({
          email: formData.signUpEmail,
          password: formData.signUpPassword,
          type: userType,
        });
        alert('회원가입이 완료되었습니다.');
        onSignUpSuccess();
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleUserTypeClick = (type: 'employee' | 'employer') => {
    if (userType !== type) {
      setUserType(type);
    }
  };

  return (
    <form
      className="flex flex-col w-full max-w-[300px]"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold text-center mb-24px text-24px">회원가입</h1>
      <InputComponent
        id="signUpEmail"
        name="signUpEmail"
        type="email"
        placeholder="이메일"
        value={formData.signUpEmail}
        onChange={handleInputChange}
        errorMessage={errors.signUpEmail}
      />
      <InputComponent
        id="signUpPassword"
        name="signUpPassword"
        type="password"
        placeholder="비밀번호"
        value={formData.signUpPassword}
        onChange={handleInputChange}
        errorMessage={errors.signUpPassword}
      />
      <InputComponent
        id="signUpPasswordConfirm"
        name="signUpPasswordConfirm"
        type="password"
        placeholder="비밀번호 확인"
        value={formData.signUpPasswordConfirm}
        onChange={handleInputChange}
        errorMessage={errors.signUpPasswordConfirm}
      />
      <MemberTypeToggle userType={userType} onClick={handleUserTypeClick} />
      <Button className="w-full button_medium_active" type="submit">
        가입하기
      </Button>
    </form>
  );
};

export default SignUpForm;

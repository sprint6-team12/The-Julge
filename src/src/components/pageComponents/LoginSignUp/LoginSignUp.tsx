import { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ToggleContainer from './ToggleContainer';

export default function LoginSignUp({
  isLogin = false,
  onClose,
}: {
  isLogin: boolean;
  onClose?: () => void;
}) {
  const [isSignUp, setIsSignUp] = useState(isLogin);

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="flex-center">
      <div className="relative flex justify-between tablet:w-[700px] pc:w-[900px] mx-auto overflow-x-hidden rounded-24px">
        <div
          className={`flex-center w-full p-10 transition-transform duration-500 ease-in-out ${isSignUp ? '-translate-x-full' : ''} ${isSignUp ? 'collapse' : ''}`}
        >
          <SignInForm onClose={onClose} />
        </div>
        <div
          className={`flex-center w-full p-10 transition-transform duration-500 ease-in-out ${isSignUp ? '' : 'translate-x-full'} ${isSignUp ? '' : 'collapse'}`}
        >
          <SignUpForm onSignUpSuccess={toggleSignUp} />
        </div>
        <ToggleContainer isSignUp={isSignUp} onToggle={toggleSignUp} />
      </div>
    </div>
  );
}

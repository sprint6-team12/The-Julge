import Input from '@/components/Input/Input';

function FormGroupWrapper({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative flex flex-col gap-8px ${className}`}>
      {children}
    </div>
  );
}

function Label({
  className = '',
  children,
  ...rest
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={`${className}`} {...rest}>
      {children}
    </label>
  );
}

function InputWrapper({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`relative ${className}`}>{children}</div>;
}

function ErrorMessage({
  className = '',
  errorMessage,
}: {
  className?: string;
  errorMessage: string | null;
}) {
  return (
    <>
      {errorMessage && (
        <p className={`input-error-message ${className}`}>{errorMessage}</p>
      )}
    </>
  );
}

const FormGroup = Object.assign(FormGroupWrapper, {
  Label: Label,
  InputWrapper: InputWrapper,
  InputField: Input,
  ErrorMessage: ErrorMessage,
});

export default FormGroup;

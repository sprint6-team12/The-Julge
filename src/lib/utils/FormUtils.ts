export const clearError = <T>(
  setErrors: React.Dispatch<React.SetStateAction<T>>,
  fieldName: keyof T
) => {
  setErrors((prev) => ({
    ...prev,
    [fieldName]: null,
  }));
};

export const hasErrors = <T extends Record<string, any>>(
  validationErrors: T
) => {
  return Object.values(validationErrors).some((error) => error !== null);
};

export const handleInputChange = <T>(
  setData: React.Dispatch<React.SetStateAction<T>>,
  name: string,
  value: any
) => {
  setData((prev) => ({
    ...prev,
    [name]: name === 'hourlyPay' ? Number(value) : value,
  }));
};

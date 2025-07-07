import React from 'react';

const FormErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-danger-500 text-sm">* {children}</p>;
};

export default FormErrorMessage;

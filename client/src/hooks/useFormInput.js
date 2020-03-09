import { useState, useRef } from 'react';

function useFormInput(initialValue) {
  const ref = useRef(null);
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  function validateInput(e) {
    setErrorMessage(e ? e.target.validationMessage : ref.current.validationMessage);
    setIsValid(e ? e.target.checkValidity() : ref.current.checkValidity());
  }

  function onChange(e) {
    setValue(!e.target ? e.value : e.target.value);
    validateInput(e);
  }

  function resetIsValid() {
    setIsValid(true);
  }

  return {
    value,
    ref,
    setValue,
    isValid,
    errorMessage,
    onChange,
    validateInput,
    resetIsValid
  };
}

export default useFormInput;

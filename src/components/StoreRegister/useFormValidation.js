import { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';

const useFormValidation = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const debouncedValidate = useCallback(
        debounce((name, value) => {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: validate(name, value)
            }));
        }, 500),
        [validate]
    );

    useEffect(() => {
        const allValid = Object.values(errors).every(error => error === null);
        setIsFormValid(allValid && Object.values(values).every(value => value !== ''));
    }, [errors, values]);

    const changeHandler = (e) => {
      e.preventDefault();
      const { name, value } = e.target;

      setValues(prevValues => {
        return {
          ...prevValues,
          [name]: value
        };
      })
      // 디바운스된 검증 함수 호출
      debouncedValidate(name, value);
    };

    return {
        values,
        setValues,
        errors,
        isFormValid,
        changeHandler,
    };
};

export default useFormValidation;

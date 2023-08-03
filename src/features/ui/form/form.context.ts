import { createContext, useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormFieldContextValue, FormItemContextValue } from './form.types';

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);
const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

export const FormFieldProvider = FormFieldContext.Provider;
export const FormItemProvider = FormItemContext.Provider;

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

import { forwardRef } from 'react';
import { Field, IFieldProps } from '@components/Field';
import { Input, IProps as IProps } from '@components/input/Input';

export const InputField = forwardRef<HTMLInputElement, IProps & IFieldProps>((props, ref) => {
  const { label, extraText, className, ...restProps } = props;

  return (
    <Field label={label} extraText={extraText} className={className}>
      <Input {...restProps} ref={ref} />
    </Field>
  );
});

InputField.displayName = 'InputField';

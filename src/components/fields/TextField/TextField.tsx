import { forwardRef } from 'react';
import { Field, IFieldProps } from '@components/Field';
import { FormTextarea, IFormTextareaProps as TextareaProps } from '@components/form/FormTextarea';

export const TextField = forwardRef<HTMLTextAreaElement, TextareaProps & IFieldProps>(
  (props, ref) => {
    const { label, extraText, fieldClassName, ...restProps } = props;

    return (
      <Field label={label} extraText={extraText} className={fieldClassName}>
        <FormTextarea {...restProps} ref={ref} />
      </Field>
    );
  },
);

TextField.displayName = 'TextField';

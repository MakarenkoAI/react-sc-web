import { forwardRef } from 'react';
import { Field, IFieldProps } from '@components/Field';
import { FormSelect, IFormSelectProps } from '@components/form/FormSelect';

export const SelectField = forwardRef<HTMLSelectElement, IFormSelectProps & IFieldProps>(
  (props, _ref) => {
    const { label, extraText, className, control, name, children, ...restSelectProps } = props;

    return (
      <Field label={label} extraText={extraText} className={className}>
        <FormSelect name={name} control={control} {...restSelectProps}>
          {children}
        </FormSelect>
      </Field>
    );
  },
);

SelectField.displayName = 'SelectField';

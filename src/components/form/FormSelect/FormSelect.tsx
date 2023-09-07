import { ChangeEvent, ChangeEventHandler, FC } from 'react';
import { Control, useController } from 'react-hook-form';
import { SearchSelectProps, Select } from '@components/input/Select';

export interface IFormSelectProps extends SearchSelectProps {
  name: string;
  formSelectClassName?: string;
  control: Control<any, any>;
  container?: React.RefObject<HTMLDivElement>;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

export const FormSelect: FC<IFormSelectProps> = ({
  name,
  children,
  control,
  container,
  formSelectClassName,
  onChange: outerOnChange,
  ...restProps
}) => {
  const { field } = useController({
    name,
    control,
    rules: { required: true },
  });

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    outerOnChange?.(e);
    if (!restProps.multiple) return field.onChange(e.target.value);
    field.onChange(Array.from(e.target.selectedOptions).map(({ value }) => value));
  };
  return (
    <Select
      containerRef={container}
      {...restProps}
      {...field}
      onChange={onChange}
      className={formSelectClassName}
    >
      {children}
    </Select>
  );
};

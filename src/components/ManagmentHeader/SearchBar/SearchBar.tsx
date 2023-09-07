import { ChangeEventHandler, FC } from 'react';
import { SearchInput } from '@components/SearchInput';

export interface IProps {
  inputPlaceholder: string;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
}

export const SearchBar: FC<IProps> = ({ inputPlaceholder, onInputChange }) => {
  return <SearchInput onChange={onInputChange} placeholder={inputPlaceholder} onClear={() => {}} />;
};

import { ChangeEventHandler, FC } from 'react';
import SearchIcon from '@assets/images/Search.svg';
import { Input } from '@components/input/Input';

import styles from './SearchInput.module.scss';

interface IProps {
  value?: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClear: () => void;
}

export const SearchInput: FC<IProps> = ({ value, placeholder, onChange }) => (
  <Input
    value={value}
    placeholder={placeholder}
    iconLeft={<SearchIcon />}
    className={styles.input}
    onChange={onChange}
    isSearch
    //When we will create the abstract IconButton component,
    //we need to add logic to the iconRight,
    //so that the cross will appear if the input is not empty,
  />
);

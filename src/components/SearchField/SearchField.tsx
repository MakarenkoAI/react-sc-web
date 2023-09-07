import { useTranslate } from 'ostis-ui-lib';
import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { client } from '@api';
import SearchIcon from '@assets/images/Search.svg';
import { Option, Select } from '@components/input/Select';
import { useScNavigation } from '@hooks/useScNavigation';
import { debounce } from '@utils';

import styles from './SearchField.module.scss';
import { searchAddrById } from '../../api/sc/search/search';

const MAX_SIZE = 200;
const DEBOUNCE_TIMEOUT = 300;

interface IProps {
  className?: string;
}

export const SearchField: FC<IProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<string[] | null>(null);

  const { goToActiveFormatCommand } = useScNavigation();

  const translate = useTranslate();

  const findOptions = useCallback(async (searchValue: string) => {
    if (!searchValue) return setOptions(null);

    setIsLoading(true);
    const [searchResult = []] = await client.getLinksContentsByContentSubstrings([searchValue]);

    const transformedSearchResult = [
      ...new Set(searchResult.filter((string) => string.length < MAX_SIZE)),
    ].sort((a, b) => a.length - b.length);
    setIsLoading(false);
    setOptions(transformedSearchResult);
  }, []);

  const [debouncedFindOptions] = useMemo(
    () => debounce(findOptions, DEBOUNCE_TIMEOUT),
    [findOptions],
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedFindOptions(e.target.value);
  };

  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (!value) return;

    setIsLoading(true);
    const res = await searchAddrById(value);
    setIsLoading(false);
    if (!res) return;

    goToActiveFormatCommand(res.value);
  };

  const emptyMessage = !options
    ? translate({
        ru: 'Введите строку для поиска',
        en: 'Enter a search string',
      })
    : undefined;
  return (
    <Select
      className={className}
      mode="search"
      value=""
      placeholder={translate({ ru: 'Поиск...', en: 'Search...' })}
      isLoading={isLoading}
      onInputChange={onInputChange}
      onChange={onChange}
      emptyMessage={emptyMessage}
      iconsLeft={<SearchIcon />}
      autoFocus
    >
      {(options || []).map((option) => (
        <Option key={option} value={option} className={styles.option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

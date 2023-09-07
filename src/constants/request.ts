import { BodyType, TabValue } from '@model/requests';

export const TabToBodyType = {
  [TabValue.FORM_DATA]: BodyType.FORM_DATA,
  [TabValue.JSON]: BodyType.JSON,
  [TabValue.XML]: BodyType.XML,
};

export const BodyTypeToTab = {
  [BodyType.FORM_DATA]: TabValue.FORM_DATA,
  [BodyType.JSON]: TabValue.JSON,
  [BodyType.XML]: TabValue.XML,
};

export const requestTabs = [
  { value: TabValue.JSON, title: 'JSON' },
  { value: TabValue.FORM_DATA, title: 'Form-data' },
  { value: TabValue.XML, title: 'XML' },
];

export const MAX_ELEMS = 50;

import { ReactNode } from 'react';

import { IKeyValueDescription, INestedKeyValueDescription } from './model';

export type TRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const enum BodyType {
  JSON = 'format_json',
  FORM_DATA = 'format_form_data',
  XML = 'format_xml',
}

export const enum TabValue {
  FORM_DATA = '1',
  JSON = '2',
  XML = '3',
}

export const enum JSONTypeEnum {
  KEY_VALUE = 'KEY_VALUE',
  JSON = 'JSON',
}

export interface IRequestTab {
  value: TabValue;
  title: ReactNode;
}

interface IRequestInfoRespCommon {
  table?: number;
  database?: number;
  name: string;
  method: TRequestMethod;
  url: string;
  urlParams: IKeyValueDescription[];
  varUrlParams: IKeyValueDescription[];
  description?: string;
  connectedConcepts?: number[];
  globalParams: IKeyValueDescription[];
}

type TBody =
  | {
      body?: IKeyValueDescription[];
      bodyType: BodyType.FORM_DATA;
    }
  | {
      body?: INestedKeyValueDescription[];
      bodyType: BodyType.JSON;
    }
  | {
      body?: string;
      bodyType: BodyType.XML;
    }
  | {
      body?: [];
      bodyType: null;
    };

export type IRequestInfoResp = IRequestInfoRespCommon & TBody;

export interface IRequestBody {
  name: string;
  table?: number;
  database?: number;
  description: string;
  method: TRequestMethod;
  url: string;
  bodyType: BodyType;
  body: INestedKeyValueDescription[] | string;
  connectedConcepts: number[];
  urlParams: never[];
  varUrlParams: never[];
  lang: number;
}

export interface ICkeckKeyValueDescription extends IKeyValueDescription {
  checked: boolean;
}

export interface ICkeckNestedKeyValueDescription extends INestedKeyValueDescription {
  checked: boolean;
}

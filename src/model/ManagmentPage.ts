export interface IConnection {
  nrel_connection_name: string;
  nrel_database_name: string;
  nrel_host: string;
  nrel_note: string;
  nrel_port: string;
  nrel_url: string;
  sc_addr: string;
  nrel_login: string;
}

export interface IListItemConnection {
  nrel_connection_name: string;
  nrel_note?: string;
  nrel_url: string;
  sc_addr: string;
}

export interface IConnectionRow {
  name: string;
  id: string;
  description: string;
  url: string;
  onClick?: (value: string) => void;
}

export interface IChangedConnection {
  connectionName: string;
  databaseName: string;
  host: string;
  note?: string;
  port: string;
  url: string;
  userName: string;
}

export interface IRequestConnection {
  nrel_connection_name: string;
  nrel_database_name: string;
  nrel_host: string;
  nrel_note?: string;
  nrel_port: string;
  nrel_url: string;
  nrel_login: string;
  lang: number;
}

export type UrlParam = { id: string };

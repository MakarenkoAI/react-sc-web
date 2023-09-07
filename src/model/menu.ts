export interface IMenu {
  id: number;
  title: string;
  children: IMenu[];
  expanded: boolean;
  isLoading: boolean;
}

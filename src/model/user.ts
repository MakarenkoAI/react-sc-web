export const enum EUserRole {
  INTERNAL_USER = 'nrel_internal_user',
  ADMIN = 'nrel_admin',
}

export const enum EUserAccess {
  EDIT = 'EDIT',
  VIEW = 'VIEW',
}

export interface IUser {
  canEdit: boolean;
  login: string;
  role: EUserRole;
  sc_addr?: number;
  avatar?: string;
}

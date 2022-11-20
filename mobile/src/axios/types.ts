export type Task = {
  date_started: string;
  date_finished: string;
  special: boolean;
  description: string;
  title: string;
};

export type User = {
  username: string;
  email: string;
  Name: null;
  Surname: null;
};

export type UserWithId = User & {
  id: number;
};

export type TaskWithUser = Task & {
  users_permissions_user: {
    data: {
      id: number;
      attributes: User;
    };
  };
};

export type TaskCompletion = {
  date_completed: string;
  verified: boolean;
};

export type Comment = {
  content: string;
  created: string;
};

export type ApiResponse<T> = {
  data: {
    attributes: T;
    id: number;
  }[];
};

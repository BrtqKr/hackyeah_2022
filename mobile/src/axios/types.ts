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

export type Media = {
  name: string;
  width: string;
  height: string;
  url: string;
};

export type UserWithId = User & {
  id: number;
};

export type TasksWithMetadata = Task & {
  task_completions: ApiResponse<
    TaskCompletion & {
      users_permissions_user: ApiSingularResponse<User>;
    }
  >;
  media: ApiSingularResponse<Media>;
};

export type TaskCompletion = {
  date_completed: string;
  verified: boolean;
  users_permissions_user: ApiSingularResponse<User>;
  task: ApiSingularResponse<Task>;
  media: ApiSingularResponse<Media>;
  comments: ApiResponse<any>;
  liked_by: ApiResponse<User>;
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

export type ApiSingularResponse<T> = {
  data: {
    attributes: T;
    id: number;
  } | null;
};

import { AxiosResponse } from 'axios';
import { configuredAxios } from './config';
import { ApiResponse, Task, TaskCompletion, TasksWithMetadata } from './types';

export const getTasks = async () => {
  const response = await configuredAxios.get<ApiResponse<Task>>('/TASKS');
  return response.data;
};

export const getTasksWithCompletions = async (userId: number) => {
  const response = await configuredAxios.get<ApiResponse<TasksWithMetadata>>('/tasks', {
    params: {
      'populate[task_completions][populate][0]': 'users_permissions_user',
      'populate': 'media',
    },
  });
  const data = response.data;
  const filteredData = data.data.map((task) => {
    const completions = task.attributes.task_completions.data.filter((completion) => {
      return completion.attributes.users_permissions_user.data?.id === userId;
    });
    return {
      ...task,
      attributes: {
        ...task.attributes,
        task_completions: {
          data: completions,
        },
      },
    };
  });
  return {
    data: filteredData,
  };
};

export const getTaskCompletions = async () => {
  const response = await configuredAxios.get<ApiResponse<TaskCompletion>>('/user-tasks');
  return response.data;
};

export const getComments = async () => {
  const response = await configuredAxios.get<ApiResponse<Comment>>('/comments');
  return response.data;
};

type CompleteTaskPayload = {
  users_permissions_user: number;
  task: number;
  date_completed: string;
  verified: boolean;
};

export const completeTask = async (userId: number, taskId: number) => {
  await configuredAxios.post<CompleteTaskPayload, AxiosResponse<Record<string, unknown>>>(
    '/user-tasks',
    {
      data: {
        users_permissions_user: userId,
        task: taskId,
        date_completed: new Date().toUTCString(),
        verified: true,
      },
    }
  );
  return { test: 'string' };
};

import { AxiosResponse } from 'axios';
import { configuredAxios } from './config';
import {ApiResponse, Task, TaskCompletion, TaskWithUser} from './types';

export const getTasks = async () => {
  const response = await configuredAxios.get<ApiResponse<Task>>('/TASKS');
  return response.data;
};

export const getMyTasks = async (userId: number) => {
  const response = await configuredAxios.get<ApiResponse<TaskWithUser>>('/user-tasks', {
    params: {
      'populate[0]': 'users_permissions_user',
    },
  });
  const data = response.data;
  return {
    data: data.data.filter((item) => item.attributes.users_permissions_user.data.id === userId),
  };
};

export const getTaskCompletions = async () => {
  const response = await configuredAxios.get<ApiResponse<TaskCompletion>>('/user-tasks',{ params: { populate: '*' }} );
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

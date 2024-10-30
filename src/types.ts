import { ReactNode } from 'react';

export type Todo = {
  id: number;
  title: string;
  text: ReactNode;
  complete?: boolean;
  start?: number;
  deadline?: number;
  priority?: number;
};

import { ReactNode } from 'react';

export type Todo = {
  title: string;
  text: ReactNode;
  complete?: boolean;
  start?: number;
  deadline?: number;
  priority?: number;
};

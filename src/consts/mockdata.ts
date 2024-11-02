import { Todo } from '../types';

export const mock: Todo[] = [
  {
    id: '1',
    title: 'My first todo',
    start: Date.now() - 300,
    priority: 0,
  },
  {
    id: '2',
    title: 'My second todo',
    start: Date.now() - 30,
    priority: 1,
  },
  {
    id: '4',
    title: 'My third todo',
    start: Date.now() - 350,
    priority: 2,
  },
];

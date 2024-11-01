import { Tags, Todo } from '../types';

export const sortByTag = (array: Todo[], tag?: Tags) =>
  tag ? [...array].sort((a, b) => Number(a[tag]) - Number(b[tag])) : array;

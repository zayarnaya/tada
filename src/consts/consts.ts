import { Todo } from '../types';

export const mapFilterFuncs = {
  Active: (el: Todo) => !el.complete,
  Done: (el: Todo) => el.complete,
};

export const itemsPerPage = 10;

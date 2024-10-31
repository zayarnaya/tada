import { Todo } from '../types';

export const findIndexById = (array: Todo[], id: string) => array.findIndex((el) => el.id === +id);

import { Todo } from '../types';

export const addPriority = (array: Todo[]) => array.map((el, index) => ({ ...el, priority: index }));

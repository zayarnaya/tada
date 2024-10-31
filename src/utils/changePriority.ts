import { Todo } from '../types';
import { addPriority } from './addPriority';
import { findIndexById } from './findIndexById';

export const changePriority = (array: Todo[], id: string, decrease = false) => {
  const index = findIndexById(array, id);
  if ((decrease && index === array.length - 1) || (!decrease && index === 0) || index < 0) return array;
  const swapIndex = decrease ? index + 1 : index - 1;
  const res = [...array];
  [res[index], res[swapIndex]] = [res[swapIndex], res[index]];
  return addPriority(res);
};

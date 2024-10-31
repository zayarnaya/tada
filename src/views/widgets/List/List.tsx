import { ChangeEventHandler, FC, MouseEventHandler, ReactNode } from 'react';

import classNames from 'classnames';

import styles from './List.module.scss';
import { ListItem } from '../ListItem/ListItem';
import { Todo } from '../../../types';

interface Props {
  className?: string;
  children?: ReactNode;
  list: Todo[];
  onDone: ChangeEventHandler<HTMLInputElement>;
  increasePriority: MouseEventHandler<HTMLButtonElement>;
  decreasePriority: MouseEventHandler<HTMLButtonElement>;
  onDelete: MouseEventHandler<HTMLButtonElement>;
  onEdit: ChangeEventHandler<HTMLInputElement>;
}

export const List: FC<Props> = (props: Props) => {
  const { children, className, list, onDone, onEdit, onDelete, increasePriority, decreasePriority } = props;
  return (
    <ul className={classNames(styles.list, className)}>
      {list.map((el) => (
        <ListItem
          onEdit={onEdit}
          onDelete={onDelete}
          increasePriority={increasePriority}
          decreasePriority={decreasePriority}
          key={`todo#${el.id}`}
          onDone={onDone}
          id={el.id}
          complete={el.complete}
        >
          {el.title}
        </ListItem>
      ))}
    </ul>
  );
};

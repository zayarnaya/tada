import { ChangeEvent, ChangeEventHandler, FC, MouseEventHandler, useCallback, useState } from 'react';
import classNames from 'classnames';
import ConfettiExplosion from 'react-confetti-explosion';
import styles from './ListItem.module.scss';
import { Checkbox, IconButton, Input } from '../../UIKit';

interface Props {
  className?: string;
  children?: string;
  id: number;
  onDone: ChangeEventHandler<HTMLInputElement>;
  increasePriority: MouseEventHandler<HTMLButtonElement>;
  decreasePriority: MouseEventHandler<HTMLButtonElement>;
  complete?: boolean;
  onDelete: MouseEventHandler<HTMLButtonElement>;
  onEdit: ChangeEventHandler<HTMLInputElement>;
  first: boolean;
  last: boolean;
}

export const ListItem: FC<Props> = (props: Props) => {
  const {
    children,
    onDone,
    id,
    onDelete,
    onEdit,
    complete = false,
    increasePriority,
    decreasePriority,
    first,
    last,
  } = props;
  const [isCongrats, setIsCongrats] = useState(false);
  const handleDone = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!complete) setIsCongrats(true);
      onDone(e);
    },
    [complete, onDone],
  );

  return (
    <li className={styles.wrapper} data-testid="listItem">
      {isCongrats && <ConfettiExplosion width={800} onComplete={() => setIsCongrats(false)} />}
      <div className={styles.item}>
        <Checkbox
          id={`checkDone#${id}`}
          data-testid="checkDone"
          data-id={id}
          onChange={handleDone}
          checked={complete}
        />
        <Input
          data-testid="editTodo"
          data-id={id}
          onChange={onEdit}
          className={classNames(styles.title, complete && styles.done)}
          defaultValue={children}
        />
        <div className={styles.buttons}>
          <IconButton disabled={first} variant="arrowUp" data-id={id} onClick={increasePriority} />
          <IconButton disabled={last} variant="arrowDown" data-id={id} onClick={decreasePriority} />
          <IconButton variant="delete" data-testid="deleteTodo" onClick={onDelete} data-id={id} />
        </div>
      </div>
    </li>
  );
};

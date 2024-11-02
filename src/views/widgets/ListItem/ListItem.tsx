import { ChangeEvent, ChangeEventHandler, FC, MouseEventHandler, useCallback, useContext, useState } from 'react';
import classNames from 'classnames';
import ConfettiExplosion from 'react-confetti-explosion';
import styles from './ListItem.module.scss';
import { Checkbox, IconButton, Input } from '../../UIKit';
import { localeSet } from '../../../consts';
import { LocaleContext } from '../../../utils';

interface Props {
  children?: string;
  id: string;
  first: boolean;
  last: boolean;
  complete?: boolean;
  onDone: ChangeEventHandler<HTMLInputElement>;
  onEdit: ChangeEventHandler<HTMLInputElement>;
  onDelete: MouseEventHandler<HTMLButtonElement>;
  increasePriority: MouseEventHandler<HTMLButtonElement>;
  decreasePriority: MouseEventHandler<HTMLButtonElement>;
}

export const ListItem: FC<Props> = (props: Props) => {
  const {
    children,
    id,
    first,
    last,
    complete = false,
    onDone,
    onEdit,
    onDelete,

    increasePriority,
    decreasePriority,
  } = props;
  const locale = useContext(LocaleContext);
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
          aria-label={localeSet[locale].markDone}
          id={`checkDone#${id}`}
          data-testid="checkDone"
          data-id={id}
          onChange={handleDone}
          checked={complete}
        />
        <Input
          aria-label={localeSet[locale].editTodo}
          data-testid="editTodo"
          data-id={id}
          onChange={onEdit}
          className={classNames(styles.title, complete && styles.done)}
          defaultValue={children}
          maxLength={300}
        />
        <div className={styles.buttons}>
          <IconButton
            aria-label={localeSet[locale].arrowUp}
            disabled={first}
            variant="arrowUp"
            data-id={id}
            onClick={increasePriority}
          />
          <IconButton
            aria-label={localeSet[locale].arrowDown}
            disabled={last}
            variant="arrowDown"
            data-id={id}
            onClick={decreasePriority}
          />
          <IconButton
            aria-label={localeSet[locale].trash}
            variant="delete"
            data-testid="deleteTodo"
            onClick={onDelete}
            data-id={id}
          />
        </div>
      </div>
    </li>
  );
};

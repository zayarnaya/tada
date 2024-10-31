import { ChangeEventHandler, FC, MouseEventHandler, ReactNode, useCallback, useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import AccordionItem from 'react-bootstrap/AccordionItem';
import AccordionHeader from 'react-bootstrap/AccordionHeader';
import AccordionBody from 'react-bootstrap/AccordionBody';
import AccordionButton from 'react-bootstrap/AccordionButton';
import classNames from 'classnames';
import ConfettiExplosion from 'react-confetti-explosion';
import styles from './ListItem.module.scss';

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
}

export const ListItem: FC<Props> = (props: Props) => {
  const { children, onDone, id, onDelete, onEdit, complete = false, increasePriority, decreasePriority } = props;
  const [isCongrats, setIsCongrats] = useState(false);
  const handleDone = useCallback(
    (e) => {
      if (!complete) setIsCongrats(true);
      onDone(e);
    },
    [complete, onDone],
  );
  //   useEffect(() => {
  //     const timer = setTimeout(setIsCongrats, 1000, false);
  //     return () => clearTimeout(timer);
  //   }, [isCongrats]);
  return (
    <li className={styles.item} data-testid="listItem">
      {isCongrats && (
        <>
          <ConfettiExplosion width={800} onComplete={() => setIsCongrats(false)} />
          <div />
        </>
      )}
      <input data-testid="checkDone" type="checkbox" data-id={id} onChange={handleDone} checked={complete} />
      <input
        data-testid="editTodo"
        data-id={id}
        onChange={onEdit}
        className={classNames(styles.title, complete && styles.done)}
        defaultValue={children}
      />
      <button data-id={id} onClick={increasePriority}>
        ^
      </button>
      <button data-id={id} onClick={decreasePriority}>
        |
      </button>
      <button data-testid="deleteTodo" onClick={onDelete} data-id={id}>
        Delete
      </button>
    </li>
  );
};

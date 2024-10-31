import { ChangeEventHandler, FC, MouseEventHandler, ReactNode, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import AccordionItem from 'react-bootstrap/AccordionItem';
import AccordionHeader from 'react-bootstrap/AccordionHeader';
import AccordionBody from 'react-bootstrap/AccordionBody';
import AccordionButton from 'react-bootstrap/AccordionButton';
import classNames from 'classnames';

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
  return (
    <li className={styles.item}>
      <input type="checkbox" data-id={id} onChange={onDone} checked={complete} />
      <input
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
      <button onClick={onDelete} data-id={id}>
        Delete
      </button>
    </li>
  );
};

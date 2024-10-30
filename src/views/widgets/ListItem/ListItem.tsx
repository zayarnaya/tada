import { ChangeEventHandler, FC, ReactNode, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import AccordionItem from 'react-bootstrap/AccordionItem';
import AccordionHeader from 'react-bootstrap/AccordionHeader';
import AccordionBody from 'react-bootstrap/AccordionBody';
import AccordionButton from 'react-bootstrap/AccordionButton';
import classNames from 'classnames';

import styles from './ListItem.module.scss';

interface Props {
  className?: string;
  children?: ReactNode;
  id: number;
  onDone: ChangeEventHandler<HTMLInputElement>;
  complete?: boolean;
}

export const ListItem: FC<Props> = (props: Props) => {
  const { children, onDone, id, complete = false } = props;
  return (
    <li className={styles.item}>
      <input type="checkbox" data-id={id} onChange={onDone} checked={complete} />
      <h3 className={classNames(styles.title, complete && styles.done)}>{children}</h3>
    </li>
  );
};

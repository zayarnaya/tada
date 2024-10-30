import { FC, ReactNode } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import classNames from 'classnames';

import styles from './List.module.scss';
import { ListItem } from '../ListItem/ListItem';
import { Todo } from '../../../types';

interface Props {
  className?: string;
  children?: ReactNode;
  list: Todo[];
}

export const List: FC<Props> = (props: Props) => {
  const { children, className, list } = props;
  return (
    <Accordion alwaysOpen>
      {list.map((el, index) => (
        <ListItem eventKey={`todo#${index}`} header={el.title}>
          {el.text}
        </ListItem>
      ))}
    </Accordion>
  );
};

import { FC, ReactNode } from 'react';
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
  header: string;
  eventKey: string;
  // text: string,
}

export const ListItem: FC<Props> = (props: Props) => {
  const { children, className, header, eventKey } = props;
  return (
    <>
      <AccordionItem eventKey={eventKey}>
        <AccordionHeader className={children ? '' : 'empty'}>{header}</AccordionHeader>
        <AccordionBody>{children}</AccordionBody>
      </AccordionItem>
    </>
  );
};

import { FC, ReactNode } from 'react';
import classNames from 'classnames';

import styles from './ListFooter.module.scss';

interface Props {
  className?: string;
  children?: ReactNode;
}

export const ListFooter: FC<Props> = (props: Props) => {
  const { children, className } = props;
  return <div className={classNames(styles.footer, className)}>{children}</div>;
};

import { FC, ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Main.module.scss';

interface Props {
  className?: string;
  children?: ReactNode;
}

export const Main: FC<Props> = (props: Props) => {
  const { children, className } = props;
  return <main className={classNames(styles.main, className)}>{children}</main>;
};

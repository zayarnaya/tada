import { FC } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';
import { ButtonProps } from '../types';

type Props = ButtonProps;

export const Button: FC<Props> = (props: Props) => {
  const { children, className, active, ...rest } = props;
  return (
    <button {...rest} className={classNames(styles.button, className, active && styles.active)}>
      {children}
    </button>
  );
};

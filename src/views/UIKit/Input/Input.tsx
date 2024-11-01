import { FC } from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';
import { InputProps } from '../types';

type Props = InputProps;

export const Input: FC<Props> = (props: Props) => {
  const { children, className, ...rest } = props;
  return (
    <input {...rest} className={classNames(styles.input, className)}>
      {children}
    </input>
  );
};

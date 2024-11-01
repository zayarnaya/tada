import { FC } from 'react';
import classNames from 'classnames';

import styles from './Checkbox.module.scss';
import { InputProps } from '../types';

type Props = InputProps;

export const Checkbox: FC<Props> = (props: Props) => {
  const { className, ...rest } = props;
  const hash = Math.random().toFixed(4);
  return (
    <>
      <input {...rest} type="checkbox" id={hash + 'done'} className={styles.checkbox} />
      <label htmlFor={hash + 'done'} className={classNames(styles.label, className)}></label>
    </>
  );
};

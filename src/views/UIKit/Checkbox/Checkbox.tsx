import { FC } from 'react';
import classNames from 'classnames';

import styles from './Checkbox.module.scss';
import { InputProps } from '../types';

type Props = InputProps & { id: string };

export const Checkbox: FC<Props> = (props: Props) => {
  const { className, id, ...rest } = props;
  return (
    <>
      <input {...rest} type="checkbox" id={id} className={styles.checkbox} />
      <label htmlFor={id} className={classNames(styles.label, className)}></label>
    </>
  );
};

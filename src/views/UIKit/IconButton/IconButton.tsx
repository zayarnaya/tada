import { FC } from 'react';
import classNames from 'classnames';

import styles from './IconButton.module.scss';
import { ButtonProps } from '../types';
import { Button } from '../Button/Button';

type Props = ButtonProps & { variant: 'arrowUp' | 'arrowDown' | 'lightTheme' | 'darkTheme' | 'delete' };

export const IconButton: FC<Props> = (props: Props) => {
  const { className, active, variant, ...rest } = props;
  return (
    <Button
      {...rest}
      className={classNames(styles.button, className, variant && styles[variant], active && styles.active)}
    ></Button>
  );
};

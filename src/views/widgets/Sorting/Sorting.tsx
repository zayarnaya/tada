import { FC, MouseEventHandler, useContext } from 'react';

import styles from './Sorting.module.scss';
import { localeSet } from '../../../consts/localisation';
import { LocaleContext } from '../../../utils';
import { Button } from '../../UIKit';

interface Props {
  sort: MouseEventHandler<HTMLButtonElement>;
  activeTag?: string;
}

export const Sorting: FC<Props> = (props: Props) => {
  const { sort, activeTag = 'priority' } = props;
  const locale = useContext(LocaleContext);
  return (
    <div className={styles.wrapper}>
      {' '}
      <Button data-tag="priority" active={activeTag === 'priority'} onClick={sort}>
        {localeSet[locale].priority}
      </Button>
      <Button data-tag="start" active={activeTag === 'start'} onClick={sort}>
        {localeSet[locale].start}
      </Button>
    </div>
  );
};

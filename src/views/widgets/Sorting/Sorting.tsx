import { FC, MouseEventHandler, useContext } from 'react';

import styles from './Sorting.module.scss';
import { localeSet } from '../../../consts/localisation';
import { LocaleContext } from '../../../utils';

interface Props {
  sort: MouseEventHandler<HTMLButtonElement>;
}

export const Sorting: FC<Props> = (props: Props) => {
  const { sort } = props;
  const locale = useContext(LocaleContext);
  return (
    <div className={styles.wrapper}>
      {' '}
      <button data-tag="priority" onClick={sort}>
        {localeSet[locale].priority}
      </button>
      <button data-tag="start" onClick={sort}>
        {localeSet[locale].start}
      </button>
    </div>
  );
};

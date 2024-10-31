import { FC, MouseEventHandler } from 'react';

import styles from './Sorting.module.scss';

interface Props {
  sort: MouseEventHandler<HTMLButtonElement>;
}

export const Sorting: FC<Props> = (props: Props) => {
  const { sort } = props;
  return (
    <div className={styles.wrapper}>
      {' '}
      <button data-tag="priority" onClick={sort}>
        Priority
      </button>
      <button data-tag="start" onClick={sort}>
        Start
      </button>
    </div>
  );
};

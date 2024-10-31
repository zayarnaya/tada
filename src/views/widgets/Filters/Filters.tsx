import { FC } from 'react';
import classNames from 'classnames';

import styles from './Filters.module.scss';
import { Filter } from '../../../types';

interface Props {
  handleFilterChange: React.MouseEventHandler<HTMLButtonElement>;
  filter: Filter;
}

export const Filters: FC<Props> = (props: Props) => {
  const { handleFilterChange, filter } = props;
  return (
    <div className={styles.wrapper}>
      <button
        onClick={handleFilterChange}
        data-filter="All"
        className={classNames('button', filter === 'All' && 'active')}
      >
        All
      </button>
      <button
        onClick={handleFilterChange}
        data-filter="Active"
        className={classNames('button', filter === 'Active' && 'active')}
      >
        Active
      </button>
      <button
        onClick={handleFilterChange}
        data-filter="Done"
        className={classNames('button', filter === 'Done' && 'active')}
      >
        Done
      </button>
    </div>
  );
};

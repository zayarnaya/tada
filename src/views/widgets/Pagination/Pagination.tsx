import { FC, MouseEventHandler, useContext } from 'react';
import classNames from 'classnames';

import styles from './Pagination.module.scss';
import { LocaleContext } from '../../../utils';
import { localeSet } from '../../../consts/localisation';
import { itemsPerPage } from '../../../consts';

interface Props {
  className?: string;
  activePage?: number;
  totalItems: number;
  handlePageClick: MouseEventHandler<HTMLButtonElement>;
}

const makePageArray = (total: number, perPage: number) => new Array(Math.ceil(total / perPage)).fill(0);

export const Pagination: FC<Props> = (props: Props) => {
  const { className, totalItems, activePage = 1, handlePageClick } = props;
  const pages = makePageArray(totalItems, itemsPerPage);
  const locale = useContext(LocaleContext);
  return (
    <div className={classNames(styles.wrapper, className)}>
      {!!totalItems && (
        <span>
          {localeSet[locale].showing} {(activePage - 1) * itemsPerPage + 1} -{' '}
          {Math.min(activePage * itemsPerPage, totalItems)} of {totalItems}
        </span>
      )}
      <div className={styles.pages}>
        {pages.length > 1 &&
          pages.map((_, index) => (
            <button
              aria-label={localeSet[locale].page + (index + 1)}
              data-page={index + 1}
              onClick={handlePageClick}
              key={`page#${index}`}
              className={classNames(styles.page, index === activePage - 1 && styles.active)}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

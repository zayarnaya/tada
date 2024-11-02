import { FC, MouseEventHandler, useContext } from 'react';
import classNames from 'classnames';

import styles from './Header.module.scss';
import { LocaleContext, ThemeContext } from '../../../utils';
import { localeSet } from '../../../consts';
import { Button, IconButton } from '../../UIKit';

interface Props {
  className?: string;
  handleLocaleChange: MouseEventHandler<HTMLButtonElement>;
  handleThemeChange: MouseEventHandler<HTMLButtonElement>;
}

export const Header: FC<Props> = (props: Props) => {
  const { className, handleLocaleChange, handleThemeChange } = props;
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  return (
    <header className={classNames(styles.header, className)}>
      <div className={styles.cred}>
        <div className={styles.logo}>TaDa</div>
        <div className={styles.desc}>{localeSet[locale].desc}</div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.locales}>
          <Button
            aria-label={localeSet[locale].ru}
            data-locale="ru"
            active={locale === 'ru'}
            onClick={handleLocaleChange}
          >
            ru
          </Button>
          <Button
            aria-label={localeSet[locale].en}
            data-locale="en"
            active={locale === 'en'}
            onClick={handleLocaleChange}
          >
            en
          </Button>
        </div>
        <div className={styles.themes}>
          <IconButton
            aria-hidden
            variant="lightTheme"
            data-theme="light"
            active={theme === 'light'}
            onClick={handleThemeChange}
          />
          <IconButton
            aria-hidden
            variant="darkTheme"
            data-theme="dark"
            active={theme === 'dark'}
            onClick={handleThemeChange}
          />
        </div>
      </div>
    </header>
  );
};

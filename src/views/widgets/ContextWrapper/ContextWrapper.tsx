import { FC, ReactNode, useContext } from 'react';
import { LocaleContext, ThemeContext } from '../../../utils';
import { localeSet } from '../../../consts/localisation';
import { useCssTheme, usePageTitle } from '../../../hooks';
import { cssVars } from '../../../consts';

interface Props {
  children?: ReactNode;
}

export const ContextWrapper: FC<Props> = (props: Props) => {
  const { children } = props;
  const locale = useContext(LocaleContext);
  usePageTitle(localeSet[locale].title);
  const theme = useContext(ThemeContext);
  useCssTheme(cssVars[theme]);

  return <>{children}</>;
};

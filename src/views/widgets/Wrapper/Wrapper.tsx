import { FC, ReactNode, useContext } from 'react';
import { LocaleContext } from '../../../utils';
import { localeSet } from '../../../consts/localisation';
import { usePageTitle } from '../../../hooks';

interface Props {
  children?: ReactNode;
}

export const Wrapper: FC<Props> = (props: Props) => {
  const { children } = props;
  const locale = useContext(LocaleContext);
  usePageTitle(localeSet[locale].title);

  return <>{children}</>;
};

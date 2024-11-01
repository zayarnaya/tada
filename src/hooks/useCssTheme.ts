import { useLayoutEffect } from 'react';

export const useCssTheme = (css: string) => {
  useLayoutEffect(() => {
    setTimeout(() => document.body.setAttribute('style', css), 0);
  }, [css]);
};

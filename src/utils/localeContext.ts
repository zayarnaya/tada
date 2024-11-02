import { createContext } from 'react';
import { Locales } from '../types';

export const LocaleContext = createContext<Locales>('en');

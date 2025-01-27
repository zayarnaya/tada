export type Todo = {
  id: string;
  title: string;
  complete?: boolean;
  start: number;
  priority?: number;
};

export type Filter = 'All' | 'Active' | 'Done';

export type Tags = 'priority' | 'start';

export type Locales = 'en' | 'ru';

export type Themes = 'light' | 'dark';

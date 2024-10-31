import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './App.css';
import { AddTodo, Filters, List, Pagination, Sorting } from './views/widgets';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Filter, Tags, Todo } from './types';
import { addPriority, changePriority, getSavedTodos, LocaleContext, sortByTag } from './utils';
import { itemsPerPage, mapFilterFuncs } from './consts/consts';
import { localeSet } from './consts/localisation';
import classNames from 'classnames';
import { Wrapper } from './views/widgets/Wrapper/Wrapper';

function App() {
  const todos = getSavedTodos();
  const [todolist, setTodolist] = useState<Todo[]>(todos);
  const [filter, setFilter] = useState<Filter>('All');
  const [activePage, setActivePage] = useState(1);
  const [locale, setLocale] = useState<'en' | 'ru'>('en');

  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(todolist, null, 2));
  }, [todolist]);

  const handleAddTodo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const todo = data.get('todo') as string;
      setTodolist(addPriority([{ title: todo, id: todolist.length + 1, start: Date.now() }].concat(todolist)));
      e.currentTarget.reset();
      setActivePage(1);
    },
    [todolist],
  );

  const handleDeleteTodo = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setTodolist(todolist.filter((el) => el.id !== Number(e.currentTarget.dataset.id)));
    },
    [todolist],
  );

  const increasePriority = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const { id } = e.currentTarget.dataset;
      if (id) setTodolist(changePriority(todolist, id));
    },
    [todolist],
  );
  const decreasePriority = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const { id } = e.currentTarget.dataset;
      if (id) setTodolist(changePriority(todolist, id, true));
    },
    [todolist],
  );

  const handleFinish = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const id = e.currentTarget.dataset.id;
      if (id) {
        setTodolist(todolist.map((el) => (el.id === Number(id) ? { ...el, complete: !el.complete } : el)));
      }
    },
    [todolist],
  );

  const handleFilterChange = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const { filter } = e.currentTarget.dataset;
    setFilter(filter as Filter);
  }, []);

  const deleteCompleted = useCallback(() => {
    setTodolist(todolist.filter((el) => !el.complete));
  }, [todolist]);

  const handleSorting = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => setTodolist(sortByTag(todolist, e.currentTarget.dataset.tag as Tags)),
    [todolist],
  );

  const handleEditTodo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodolist(
        todolist.map((el) =>
          el.id === Number(e.currentTarget.dataset.id) ? { ...el, title: e.currentTarget.value } : el,
        ),
      );
    },
    [todolist],
  );

  const handlePageClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => setActivePage(Number(e.currentTarget.dataset.page)),
    [],
  );

  const handleLocaleChange = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setLocale(e.currentTarget.dataset.locale as 'ru' | 'en');
  }, []);
  return (
    <LocaleContext.Provider value={locale}>
      <Wrapper>
        <button
          data-locale="ru"
          className={classNames('btn', locale === 'ru' && 'active')}
          onClick={handleLocaleChange}
        >
          ru
        </button>
        <button
          data-locale="en"
          className={classNames('btn', locale === 'en' && 'active')}
          onClick={handleLocaleChange}
        >
          en
        </button>
        {!todolist.length && <p>{localeSet[locale].greet}</p>}
        {!!todolist.length && <Sorting sort={handleSorting} />}
        <AddTodo handleAddTodo={handleAddTodo} />
        <List
          onEdit={handleEditTodo}
          increasePriority={increasePriority}
          decreasePriority={decreasePriority}
          list={(filter === 'All' ? todolist : todolist.filter(mapFilterFuncs[filter])).slice(
            (activePage - 1) * itemsPerPage,
            Math.min(activePage * itemsPerPage, todolist.length),
          )}
          onDone={handleFinish}
          onDelete={handleDeleteTodo}
        />

        {!!todolist.length && (
          <>
            <Pagination activePage={activePage} totalItems={todolist.length} handlePageClick={handlePageClick} />
            <p>
              {localeSet[locale].only} {todolist.filter((el) => !el.complete).length} {localeSet[locale].left}!
            </p>
            <Filters handleFilterChange={handleFilterChange} filter={filter} />
            <button data-testid="deleteAll" onClick={deleteCompleted}>
              {localeSet[locale].deleteAll}
            </button>
          </>
        )}
      </Wrapper>
    </LocaleContext.Provider>
  );
}

export default App;

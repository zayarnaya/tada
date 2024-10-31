import { ChangeEvent, useCallback, useState } from 'react';
import './App.css';
import { AddTodo, Filters, List, Pagination, Sorting } from './views/widgets';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Filter, Tags, Todo } from './types';
import { addPriority, changePriority, sortByTag } from './utils';
import { itemsPerPage, mapFilterFuncs } from './consts/consts';

function App() {
  const [todolist, setTodolist] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Done'>('All');
  const [activePage, setActivePage] = useState(1);

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
  return (
    <>
      {!todolist.length && <p>Hi! Please type your first todo right here</p>}
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
          <p>Only {todolist.filter((el) => !el.complete).length} left!</p>
          <Filters handleFilterChange={handleFilterChange} filter={filter} />
          <button data-testid="deleteAll" onClick={deleteCompleted}>
            Delete completed tasks
          </button>
        </>
      )}
    </>
  );
}

export default App;

import { ChangeEvent, useCallback, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { AddTodo, List, Pagination } from './views/widgets';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Todo } from './types';
import classNames from 'classnames';

const mock: Todo[] = [
  {
    id: 1,
    title: 'My first todo',
    text: (
      <>
        <p>Need to do something</p>
      </>
    ),
    start: Date.now() - 300,
  },
  {
    id: 2,
    title: 'My second todo',
    text: (
      <>
        <p>Need to do something GREAT</p>
      </>
    ),
    start: Date.now() - 30,
  },
  {
    id: 4,
    title: 'My third todo',
    text: (
      <>
        <p>Need to do something GREATER</p>
      </>
    ),
    start: Date.now() - 350,
  },
  {
    id: 5,
    title: 'My first todo',
    text: (
      <>
        <p>Need to do something</p>
      </>
    ),
    start: Date.now() - 300,
  },
  {
    id: 6,
    title: 'My second todo',
    text: (
      <>
        <p>Need to do something GREAT</p>
      </>
    ),
    start: Date.now() - 30,
  },
  {
    id: 7,
    title: 'My third todo',
    text: (
      <>
        <p>Need to do something GREATER</p>
      </>
    ),
    start: Date.now() - 350,
  },
  {
    id: 8,
    title: 'My first todo',
    text: (
      <>
        <p>Need to do something</p>
      </>
    ),
    start: Date.now() - 300,
  },
  {
    id: 9,
    title: 'My second todo',
    text: (
      <>
        <p>Need to do something GREAT</p>
      </>
    ),
    start: Date.now() - 30,
  },
  {
    id: 10,
    title: 'My third todo',
    text: (
      <>
        <p>Need to do something GREATER</p>
      </>
    ),
    start: Date.now() - 350,
  },
  {
    id: 11,
    title: 'My first todo',
    text: (
      <>
        <p>Need to do something</p>
      </>
    ),
    start: Date.now() - 300,
  },
  {
    id: 12,
    title: 'My second todo',
    text: (
      <>
        <p>Need to do something GREAT</p>
      </>
    ),
    start: Date.now() - 30,
  },
  {
    id: 13,
    title: 'My third todo',
    text: (
      <>
        <p>Need to do something GREATER</p>
      </>
    ),
    start: Date.now() - 350,
  },
];

const addPriority = (array) => array.map((el, index) => ({ ...el, priority: index }));
const addDate = (array) => array.map((el, index) => ({ ...el, start: Date.now() - 100 * index }));

function App() {
  const [todolist, setTodolist] = useState<Todo[]>(addPriority(addDate(mock)));
  const [filter, setFilter] = useState<'All' | 'Active' | 'Done'>('All');
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const handleAddTodo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const todo = data.get('todo') as string;
      const text = data.get('text') as string;
      setTodolist(
        addPriority([{ title: todo, text: text || '', id: todolist.length + 1, start: Date.now() }].concat(todolist)),
      );
      e.currentTarget.reset();
      setActivePage(1);
    },
    [todolist],
  );

  const handleDeleteTodo = useCallback(
    (e) => {
      setTodolist(todolist.filter((el) => el.id !== Number(e.currentTarget.dataset.id)));
    },
    [todolist],
  );

  const findIndexById = (array, id) => array.findIndex((el) => el.id === +id);

  const increasePriority = (e) => {
    const { id } = e.currentTarget.dataset;
    const newList = [...todolist];
    const index = findIndexById(newList, id);
    console.log(id, index);
    if (index > 0) [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]];
    setTodolist(addPriority(newList));
  };
  const decreasePriority = (e) => {
    const { id } = e.currentTarget.dataset;
    const newList = [...todolist];
    const index = findIndexById(newList, id);
    console.log(id, index);
    if (index >= 0 && index < todolist.length - 1)
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
    setTodolist(addPriority(newList));
  };

  const handleFinish = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const id = e.currentTarget.dataset.id;
      if (id) {
        setTodolist(todolist.map((el) => (el.id === Number(id) ? { ...el, complete: !el.complete } : el)));
      }
    },
    [todolist],
  );

  const handleFilterChange = (e) => {
    const { filter } = e.currentTarget.dataset;
    setFilter(filter);
  };

  const deleteCompleted = () => {
    setTodolist(todolist.filter((el) => !el.complete));
  };

  const sortByTag = (tag: 'priority' | 'start' | 'deadline') => {
    const newList = [...todolist.sort((a, b) => Number(a[tag]) - Number(b[tag]))];
    setTodolist(newList);
  };

  const sort = (e) => sortByTag(e.currentTarget.dataset.tag);

  const mapFilterFuncs = {
    Active: (el: Todo) => !el.complete,
    Done: (el: Todo) => el.complete,
  };

  const handlePageClick = (e) => setActivePage(Number(e.currentTarget.dataset.page));
  return (
    <>
      <button data-tag="priority" onClick={sort}>
        Priority
      </button>
      <button data-tag="start" onClick={sort}>
        Start
      </button>
      <button data-tag="deadline" onClick={sort}>
        Deadline
      </button>
      <AddTodo handleAddTodo={handleAddTodo} />
      <List
        increasePriority={increasePriority}
        decreasePriority={decreasePriority}
        list={(filter === 'All' ? todolist : todolist.filter(mapFilterFuncs[filter])).slice(
          (activePage - 1) * itemsPerPage,
          Math.min(activePage * itemsPerPage, todolist.length),
        )}
        onDone={handleFinish}
        onDelete={handleDeleteTodo}
      />

      <Pagination activePage={activePage} totalItems={todolist.length} handlePageClick={handlePageClick} />
      <p>Only {todolist.filter((el) => !el.complete).length} left!</p>
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
      <button onClick={deleteCompleted}>Delete completed tasks</button>
    </>
  );
}

export default App;

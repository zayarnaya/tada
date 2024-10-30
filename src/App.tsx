import { ChangeEvent, useCallback, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { AddTodo, List } from './views/widgets';
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
    id: 3,
    title: 'My third todo',
    text: (
      <>
        <p>Need to do something GREATER</p>
      </>
    ),
    start: Date.now() - 350,
  },
];

function App() {
  const [todolist, setTodolist] = useState<Todo[]>(mock);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Done'>('All');
  const handleAddTodo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const todo = data.get('todo') as string;
      const text = data.get('text') as string;
      setTodolist([{ title: todo, text: text || '', id: todolist.length + 1 }].concat(todolist));
      e.currentTarget.reset();
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

  const handleFilterChange = (e) => {
    const { filter } = e.currentTarget.dataset;
    setFilter(filter);
  };

  const deleteCompleted = () => {
    setTodolist(todolist.filter((el) => !el.complete));
  };
  return (
    <>
      <AddTodo handleAddTodo={handleAddTodo} />
      {filter === 'All' && <List list={todolist} onDone={handleFinish} />}
      {filter === 'Active' && <List list={todolist.filter((el) => !el.complete)} onDone={handleFinish} />}
      {filter === 'Done' && <List list={todolist.filter((el) => el.complete)} onDone={handleFinish} />}
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

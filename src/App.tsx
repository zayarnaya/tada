import { useCallback, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { AddTodo, List } from './views/widgets';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Todo } from './types';

const mock: Todo[] = [
  {
    title: 'My first todo',
    text: (
      <>
        <p>Need to do something</p>
      </>
    ),
    start: Date.now() - 300,
  },
  {
    title: 'My second todo',
    text: (
      <>
        <p>Need to do something GREAT</p>
      </>
    ),
    start: Date.now() - 30,
  },
  {
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
  const handleAddTodo = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const todo = data.get('todo') as string;
      const text = data.get('text') as string;
      setTodolist([{ title: todo, text: text || '' }].concat(todolist));
      e.currentTarget.reset();
    },
    [todolist],
  );
  return (
    <>
      <AddTodo handleAddTodo={handleAddTodo} />
      <List list={todolist} />
    </>
  );
}

export default App;

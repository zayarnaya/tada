import { render, screen, fireEvent } from '@testing-library/react';

import { describe, test, expect, beforeEach, afterEach, afterAll } from 'vitest';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Core functionality', () => {
  let todos = '';
  const user = userEvent.setup();
  beforeEach(async () => {
    todos = localStorage.getItem('todolist') || '';
    localStorage.clear();
    render(<App />);
    const input = screen.getByTestId('addTodo');
    await user.type(input, 'something');
    fireEvent.submit(input);
    await user.type(input, 'something else');
    fireEvent.submit(input);
  });
  afterAll(() => {
    localStorage.setItem('todolist', todos);
  });
  test('add todo', async () => {
    expect(screen.getAllByTestId('listItem').length).toBe(2);
  });
  test('delete todo', async () => {
    const button = screen.getAllByTestId('deleteTodo')[0];
    await user.click(button);
    expect(screen.getAllByTestId('listItem').length).toBe(1);
  });
  test('edit todo', async () => {
    const todo = screen.getAllByTestId('editTodo')[0];
    const value = todo.getAttribute('value');
    await user.type(todo, ' and I just edited that todo');
    expect(screen.getByDisplayValue(value + ' and I just edited that todo')).toBeInTheDocument();
  });
  test('check todo as done', async () => {
    const checkbox = screen.getAllByTestId('checkDone')[0];
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });
  test('delete all completed tasks', async () => {
    const checkbox = screen.getAllByTestId('checkDone')[0];
    await user.click(checkbox);
    const button = screen.getByTestId('deleteAll');
    await user.click(button);
    expect(screen.getAllByTestId('listItem').length).toBe(1);
  });
});

describe('Filters', () => {
  const user = userEvent.setup();
  let todos = '';
  beforeEach(async () => {
    todos = localStorage.getItem('todolist') || '';
    localStorage.clear();
    render(<App />);
    const input = screen.getByTestId('addTodo');
    await user.type(input, 'something');
    fireEvent.submit(input);
    await user.type(input, 'something else');
    fireEvent.submit(input);
    const checkbox = screen.getAllByTestId('checkDone')[0];
    await user.click(checkbox);
  });
  afterAll(() => {
    localStorage.setItem('todolist', todos);
  });
  test('shows active todos', async () => {
    await user.click(screen.getByText('Active'));
    expect(screen.getAllByTestId('listItem').length).toBe(1);
  });
  test('shows completed todos', async () => {
    await user.click(screen.getByText('Done'));
    expect(screen.getAllByTestId('listItem').length).toBe(1);
  });
  test('shows all todos', async () => {
    await user.click(screen.getByText('Done'));
    await user.click(screen.getByText('All'));
    expect(screen.getAllByTestId('listItem').length).toBe(2);
  });
});

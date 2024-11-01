export const getSavedTodos = () => {
  const todos = localStorage.getItem('todolist');
  return todos ? JSON.parse(todos) : [];
};

import { FC, ReactNode } from 'react';
import styles from './AddTodo.module.scss';

interface Props {
  className?: string;
  children?: ReactNode;
  handleAddTodo: React.FormEventHandler;
}

export const AddTodo: FC<Props> = (props: Props) => {
  const { handleAddTodo } = props;

  return (
    <form data-testid="addTodoForm" className={styles.form} onSubmit={handleAddTodo}>
      <input data-testid="addTodo" name="todo" placeholder="I need to do..." />
    </form>
  );
};

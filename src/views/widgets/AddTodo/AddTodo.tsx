import { FC, ReactNode, useCallback, useState } from 'react';
import classNames from 'classnames';

import styles from './AddTodo.module.scss';

interface Props {
  className?: string;
  children?: ReactNode;
  handleAddTodo: React.FormEventHandler;
}

export const AddTodo: FC<Props> = (props: Props) => {
  const { children, className, handleAddTodo } = props;

  return (
    <>
      <form data-testid="addTodoForm" className={styles.form} onSubmit={handleAddTodo}>
        <input data-testid="addTodo" name="todo" placeholder="I need to do..." />
      </form>
    </>
  );
};

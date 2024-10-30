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
  const [isOpen, setIsOpen] = useState(false);
  const handleFocus = useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleSubmit = useCallback(
    (e) => {
      handleAddTodo(e);
      setIsOpen(false);
    },
    [handleAddTodo],
  );
  return (
    <>
      {/* <form onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);

            }}> */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input onFocus={handleFocus} name="todo" placeholder="I need to do..." />
        <textarea
          name="text"
          placeholder="Care to add some details?"
          className={classNames(styles.text, isOpen && styles.open)}
        />
        <button type="submit" className={classNames(styles.button, isOpen && styles.open)}>
          Add
        </button>
      </form>
    </>
  );
};

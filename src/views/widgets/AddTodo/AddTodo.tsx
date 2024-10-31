import { FC, ReactNode, useContext } from 'react';
import styles from './AddTodo.module.scss';
import { LocaleContext } from '../../../utils';
import { localeSet } from '../../../consts/localisation';

interface Props {
  className?: string;
  children?: ReactNode;
  handleAddTodo: React.FormEventHandler;
}

export const AddTodo: FC<Props> = (props: Props) => {
  const { handleAddTodo } = props;
  const locale = useContext(LocaleContext);

  return (
    <form data-testid="addTodoForm" className={styles.form} onSubmit={handleAddTodo}>
      <input data-testid="addTodo" name="todo" placeholder={localeSet[locale].add} />
    </form>
  );
};

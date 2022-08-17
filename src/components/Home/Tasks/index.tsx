import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../TaskCard';
import styles from './index.module.scss';

const Tasks: FC<any> = (props: any) => {
  const navigate = useNavigate();
  return (
    <section className={styles.tasks}>
      <div className={styles.header}>
        <p style={{ zIndex: '1' }}>New Tasks</p>

        <span
          onClick={() => navigate('/tasks/all')}
          style={{ cursor: 'pointer', zIndex: '1' }}
        >
          View all
        </span>
      </div>
      <section className={styles['tasks-cont']}>
        {props.data.map((task: any) => (
          <TaskCard
            key={task.id}
            data={task}
            width="365px"
            height="130px"
            location="home"
          />
        ))}
      </section>
    </section>
  );
};

export default Tasks;

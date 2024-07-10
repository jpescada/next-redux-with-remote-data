import { fetchTest, selectItems, selectStatus } from '@/lib/features/test/testSlice';
import { useEffect } from 'react';

import styles from "./test.module.css";
import { useAppDispatch, useAppSelector } from '@/lib/store';

export default function Test() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTest());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Hello</h1>
      <div className={styles.actions}>
        <button onClick={() => dispatch(fetchTest({ amount: 5 }))}>Fetch 5 items</button>
        <button onClick={() => dispatch(fetchTest({ amount: 10 }))}>Fetch 10 items</button>
      </div>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Failed to load items</div>}
      {status === 'idle' && (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}
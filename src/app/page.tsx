'use client';

import { Provider } from 'react-redux';
import styles from "./page.module.css";
import { store } from '@/lib/store';
import Test from './test/Test';

export default function Home() {
  return (
    <Provider store={store}>
      <main className={styles.main}>
        <Test />
      </main>
    </Provider>
  );
}

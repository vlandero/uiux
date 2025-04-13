import React from 'react'
import styles from './index.module.css'

import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>Welcome to Rezervo</h1>
      <button onClick={() => navigate('/register')}>I'm a Restaurant Owner</button>
      <button onClick={() => navigate('/browse')}>I'm Looking for a Restaurant</button>
    </div>
  );
}

import React from 'react';
import { Animate } from 'react-animate-mount';
import styles from './alert.module.scss';

export default props => (
  <Animate show={props.show}>
    <div className={styles.alert}>{props.message}</div>
  </Animate>
);

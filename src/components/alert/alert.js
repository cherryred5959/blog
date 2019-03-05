import React from 'react';
import styles from './alert.module.scss';

export default props => <div className={styles.alert}>{props.message}</div>;

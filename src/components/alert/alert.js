import React from 'react';
import PropTypes from 'prop-types';
import { Animate } from 'react-animate-mount';
import styles from './alert.module.scss';

const Alert = props => (
  <Animate show={props.show}>
    <div className={styles.alert} onClick={props.onAlertClicked}>
      {props.message}
    </div>
  </Animate>
);

Alert.defaultProps = {
  show: true
};

Alert.propTypes = {
  show: PropTypes.bool,
  onAlertClicked: PropTypes.func,
  message: PropTypes.string
};

export default Alert;

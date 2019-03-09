import React from 'react';
import PropTypes from 'prop-types';
import { Animate } from 'react-animate-mount';
import styles from './alert.module.scss';

const Alert = props => (
  <Animate show={props.show}>
    <div
      className={styles.alert}
      onClick={props.onAlertClicked}
      style={{ [props.position]: 0 }}
    >
      {props.message}
    </div>
  </Animate>
);

Alert.defaultProps = {
  show: true,
  position: 'top'
};

Alert.propTypes = {
  show: PropTypes.bool,
  position: PropTypes.oneOf(['top', 'bottom']),
  onAlertClicked: PropTypes.func,
  message: PropTypes.string
};

export default Alert;

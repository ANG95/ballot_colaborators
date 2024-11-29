import PropTypes from 'prop-types';
import './loading.css';

function AbsoluteLoading() {
  return (
    <div className="container-loading">
      <div className="spinner-frame">
        <div className="spinner-cover" />
        <div className="spinner-bar" />
      </div>
    </div>
  );
}

export default AbsoluteLoading;

AbsoluteLoading.propTypes = {
  // onChange: PropTypes.func.isRequired,
};

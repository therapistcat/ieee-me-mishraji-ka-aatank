import './LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Searching papers...' }) => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;

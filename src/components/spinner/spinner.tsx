import './spinner.css';

export default function Spinner(): JSX.Element {
  return (
    <div className="spinner__container">
      <span className='spinner' data-testid='spinner'></span>
    </div>
  );
}

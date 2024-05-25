interface SpinnerProps {}

const Spinner: React.FC<SpinnerProps> = () => {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;

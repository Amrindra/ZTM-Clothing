import "./FormInput.scss";

const FormInput = ({ label, ...otherAttributeProps }) => {
  console.log({ ...otherAttributeProps });
  return (
    <div>
      <label htmlFor="">{label}</label>
      <input {...otherAttributeProps} />
    </div>
  );
};

export default FormInput;

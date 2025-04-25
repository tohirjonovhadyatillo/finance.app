import "./FormInput.scss";

function FormInput({ label, name, placeholder, type }) {
  return (
    <label>
      <span>{label}</span>
      <input type={type} name={name} placeholder={placeholder} />
    </label>
  );
}

export default FormInput;

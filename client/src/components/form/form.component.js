import { StyledInput, StyledButton } from "../../style";

function BasicForm(props) {
  const fields = props.fields;
  return (
    <div>
      {fields.map((field) => {
        return (
          <StyledInput
            type={field.inputType}
            value={field.value}
            onChange={field.onChange}
            placeholder={field.placeholder}
          ></StyledInput>
        );
      })}
      <StyledButton onClick={props.submitCallback}>
        {props.submitText}
      </StyledButton>
    </div>
  );
}

export default BasicForm;

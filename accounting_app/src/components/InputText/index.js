import React from 'react';
import TextField from '@material-ui/core/TextField';



export default function InputText(props) {
  const { disabled,typeInput,labelInput, nameInput, idInput, valueInput,htmlnput ,onchangeValue} = props

  return (
      <>
      <TextField
        disabled={disabled}
        id={idInput}
        label={htmlnput}
        typeInput={typeInput}
        name={nameInput}
        value={valueInput}
        onChange={onchangeValue}
          multiline
        />
      </>
  
  );
}

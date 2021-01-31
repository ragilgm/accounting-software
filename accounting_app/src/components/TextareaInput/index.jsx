import React, { Component } from 'react';

class TextareaInput extends Component {
   render() {
      const { labelInput, idInput, nameInput, innerHtml, valueInput} = this.props
      return (
         <>
            <div class="form-group">
               <label for={labelInput}>{innerHtml}</label>
               <textarea class="form-control" id={idInput} name={nameInput} value={valueInput} rows="3"></textarea>
            </div>
         </>
      );
   }
}

export default TextareaInput;
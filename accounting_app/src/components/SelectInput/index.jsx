import React, { Component } from 'react';

class SelectInput extends Component {
   render() {
      const { labelInput, idInput, itemInput, valueInput,labelHtml} = this.props
      return (
         <>
            <div class="form-group">
               <label for={labelInput}>{labelHtml}</label>
               <select class="form-control" id={idInput}>
                  {itemInput.map(item =>
                     <option key={item.id}
                        className="select-item" id={item.id}
                        value={item.value}>{item.html}</option>
                  )}
               </select>
            </div>
         </>
      );
   }
}

export default SelectInput;
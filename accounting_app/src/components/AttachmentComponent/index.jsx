import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'

 
export default class AttachmentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }
 
    handleClose() {
        this.setState({
            open: false
        });
    }
 
    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
    }

    
 
    handleOpen() {
        this.setState({
            open: true,
        });
    }
 
    render() {
        return (
            <div>
                <button type="button" onClick={this.handleOpen.bind(this)} className="btn btn-link">
                  Attachment <i class="fa fa-paperclip" aria-hidden="true"></i>
                </button>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['csv', 'xls', 'pdf','image/jpeg', 'image/png']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                />
            </div>
        );
    }
}
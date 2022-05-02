import React, { Component } from 'react';
import Dropzone from './Dropzone';
import SubmitButton from './SubmitButton';

class UploadProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestBody: null,
            requestResults: {
                items: [],
            },
            errorMessage: ""
        };
    }
    
    dropzoneCallback = async (childData) => {
        console.log(childData);
        this.setState({requestBody: childData});
    }
    
    requestCallback = async (res) => {
        console.log(res);
        switch (res.data.statusCode) {
            case 200:
                this.setState({errorMessage: ""});
                this.setState({requestResults: {items: res.data.body}});
                break;
            case 400:
                this.setState({errorMessage: res.data.errorMessage});
                break
            default:
                this.setState({errorMessage: res.data.statusCode.toString() + " is an unrecognized statusCode."});
        }
    }

    render() { 
        return (
            <div className='col'>
                <Dropzone 
                    type={'upload'}
                    parentCallback={this.dropzoneCallback}
                />
                {this.state.requestBody === null ?
                    "" :
                    <SubmitButton 
                        path='/uploadproductitems' 
                        body={this.state.requestBody} 
                        parentCallback={this.requestCallback} 
                    />
                }
                {this.state.requestResults.items.length === 0 ?
                    "" :
                    "Successfully uploaded/updated " + this.state.requestResults.items.length.toString() + " items."
                }
                <div className='errorText'>{this.state.errorMessage}</div>
            </div>
        );
    }
}

 
export default UploadProducts;
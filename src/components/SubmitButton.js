import React, { Component } from 'react'
import axios from 'axios';

class SubmitButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: "",
            path: props.path
        }
    }

    async lookupData(body) {
        console.log(body);
        const response = await axios.post('https://4xvaen79se.execute-api.us-west-2.amazonaws.com/dev' + this.props.path, body);
        console.log(response);
        this.props.parentCallback(response);
    }
     
    render() { 
        return <div className='LookupBtn'>
            <div className={'submitButton'} onClick={() => this.lookupData(this.props.body)}>
                Submit
            </div>
        </div>;
    }
}
 
export default SubmitButton;
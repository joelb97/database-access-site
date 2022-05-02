import React, { Component } from 'react';
import Dropzone from './Dropzone';
import SubmitButton from './SubmitButton';
import { CSVLink } from 'react-csv';

class FetchPopulation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestBody: null,
            requestResults: [],
            errorMessage: ""
        };
    }
    
    dropzoneCallback = async (childData) => {
        console.log(childData);
        this.setState({requestBody: childData});
    }
    
    lookupCallback = async (res) => {
        console.log(res);
        switch (res.data.statusCode) {
            case 200:
                this.setState({errorMessage: ""});
                this.setState({requestResults: res.data.body});
                break;
            case 400:
                this.setState({errorMessage: res.data.errorMessage});
                break
            default:
                this.setState({errorMessage: res.data.statusCode.toString() + " is an unrecognized statusCode."});
        }
    }

    handleOnClick = () => {
        this.setState({
            requestResults: []
        });
    }

    render() { 
        return (
            <div className='col'>
                <Dropzone 
                    type={'fetch'}
                    parentCallback = {this.dropzoneCallback}
                />
                {this.state.requestBody === null ?
                    "" :
                    <SubmitButton 
                        path='/getpopulationitems' 
                        body={this.state.requestBody} 
                        parentCallback={this.lookupCallback} 
                    />
                }
                {this.state.requestResults.length === 0 ?
                    "" :
                    <CSVLink data={this.state.requestResults} onClick={this.handleOnClick}>
                        Download results as CSV file
                    </CSVLink>
                }
                <em>{this.state.errorMessage}</em>
            </div>
        );
    }
}
 
export default FetchPopulation;
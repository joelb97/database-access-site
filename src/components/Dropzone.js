import React from 'react';
import { parseFetch, parseUpload } from './utils/CSVParser';
import downloadIcon from '../assets/download-icon.png'
import SubmitButton from './SubmitButton';

class Dropzone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlighted: false,
            text: "drag 'n' drop .csv file here"
        };
    }

    handleCallback = (req) => {
        this.setState({
            text: req.filename + " ready to upload"
        });
        this.props.parentCallback(req.requestBody);
    }

    handleError = (e) => {
        this.setState({
            highlighted: false
        });
        this.setState({
            text: e
        });
        this.props.parentCallback(null);
    }

    onDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        try {
            switch(this.props.type) {
                case 'fetch':
                    parseFetch(files, this.handleCallback, this.handleError);

                    break;
                case 'upload':
                    parseUpload(files, this.handleCallback, this.handleError);

                    break;
                default:
                    throw 'Incorrect Dropzone type.'
            }
        } catch (e) {
            console.error(e);
            this.setState({text: e});
        }
    }

    render() {
        return <div 
                className={`dropzone ${this.state.highlighted ? "highlighted" : ""}`}
                onDragEnter={() => {
                    this.setState({highlighted: true});
                }}
                onDragLeave={() => {
                    this.setState({highlighted: false});
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                }}
                onDrop={this.onDrop}
            >
                <div>
                    <img src={downloadIcon} className={'icon-large'}></img>
                </div>
                <div 
                    className={`dropzone-text ${this.state.highlighted ? "highlighted-text" : ""}`}
                >{this.state.text}</div>
            </div>;
    }
}

export default Dropzone;
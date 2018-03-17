import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FilesUpload from './FilesUpload'
import FilesUploadItemList from './FilesUploadItemList'
import ContentPane from '../../../components/ContentPane'
import Loading from '../../../components/Loading'

export default class FilesAdd extends Component {

    constructor (props) {
        super(props)
        this.state = {
            files: [],
            isLoading: false
        }
    }
    
    onFilesChange = (files) => {
        this.setState({
            files
        }, () => {
            //   console.log(this.state.files)
        })
    }

    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }

    filesRemoveOne = (file) => {
        this.refs.files.removeFile(file)
    }

    filesRemoveAll = () => {
        this.refs.files.removeFiles()
    }

    filesUpload = () => {

        try {
            const formData = new FormData()
            Object.keys(this.state.files).forEach(async(key) => {
                const file = this.state.files[key]
                formData.append("file", file)
                formData.append("uploadManifest", `{"input":{"name":"${file.name}"}}`)
                this.setState({
                    isLoading: true
                })
                await this.props.glpi.uploadFile({ itemtype: "PluginFlyvemdmFile", input: formData })
                this.setState({
                    isLoading: false
                })
                this.props.setNotification({
                    title: 'Successfully',
                    body: 'Saved file',
                    type: 'success'
                })
                this.props.changeAction("reload")
            })
        } catch (error) {
            if (error.length > 1) {
                this.props.setNotification({
                    title: error[0],
                    body: error[1],
                    type: 'alert'
                })
            }
            this.setState({
                isLoading: false
            })
        }
    }

    render() {
        let renderComponent
        if (this.state.isLoading) {
            renderComponent = (
                <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} >
                    <Loading message="Loading..." />
                </ContentPane>)
        } else {
            renderComponent = (
                <ContentPane itemListPaneWidth={this.props.itemListPaneWidth} >
                    <button className="btn --primary" onClick={this.filesUpload}>Save</button>
                    <div className="separator" />
                    <React.Fragment>
                        <FilesUpload
                            ref='files'
                            className='files-dropzone'
                            onChange={this.onFilesChange}
                            onError={this.onFilesError}
                            maxFiles={1}
                            maxFileSize={10000000}
                            minFileSize={0}
                            clickable
                        >
                            Drop the file here or click to upload
                        </FilesUpload>
                        <div>
                            {
                                this.state.files.length > 0
                                    ? <div>
                                        {this.state.files.map((file) =>
                                            <FilesUploadItemList key={file.id} fileData={file} onRemove={this.filesRemoveOne.bind(this, file)} />
                                        )}
                                    </div>
                                    : null
                            }
                        </div>
                    </React.Fragment>
                </ContentPane>
            )
        }
        return renderComponent
    }
}
FilesAdd.propTypes = {
    changeAction: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}
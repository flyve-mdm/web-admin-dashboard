import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../../components/ContentPane'
import Confirmation from '../../../components/Confirmation'
import Loading from '../../../components/Loading'
import { I18n } from "react-i18nify"
import itemtype from '../../../shared/itemtype'
import publicURL from '../../../shared/publicURL'

export default class FilesContent extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    componentWillMount() {
        if (this.props.selectedItems.length === 0) {
            const path = `${publicURL}/app/files`
            this.props.history.push(path)
        }
    }

    handleEdit = () => {
        const location = `${this.props.history.location.pathname}/edit`
        this.props.history.push(location)
    }

    handleDelete = async () => {
        try {
            const isOK = await Confirmation.isOK(this.contentDialog)
            if (isOK) {

                let itemListToDelete = this.props.selectedItems.map((item) => {
                    return {
                        id: item["PluginFlyvemdmFile.id"]
                    }
                })

                this.setState({
                    isLoading: true
                })

                await this.props.glpi.deleteItem({ itemtype: itemtype.PluginFlyvemdmFile, input: itemListToDelete, queryString: { force_purge: true } })

                this.props.setNotification({
                    title: I18n.t('commons.success'),
                    body: I18n.t('notifications.file_successfully_removed'),
                    type: 'success'
                })
                this.props.changeSelectionMode(false)
                this.props.changeAction('reload')
        
            } else {
                this.setState({
                    isLoading: false
                })
            }

        } catch (error) {
            this.props.setNotification(this.props.handleMessage({ type: 'alert', message: error }))
            this.setState({
                isLoading: false
            })
        }
    }

    render() {
        if (this.state.isLoading) {
            return (<Loading message={`${I18n.t('commons.loading')}...`} />)
        } else {
            const fileName = this.props.selectedItems.length > 0 ? this.props.selectedItems[0]["PluginFlyvemdmFile.name"] : ''
            return (
                <ContentPane>
                    <div className="contentHeader" style={{ margin: '0 10px' }}>
                        <div className="itemInfo">
                            <span className="fileIcon" style={{ fontSize: '48px', paddingLeft: '20px', paddingTop: '20px' }} />
                            <div className="contentStatus">
                                <div className="name">{fileName}</div>
                                <br />
                                <div>
                                    <span
                                        className="editIcon"
                                        style={{ marginRight: '20px', fontSize: '20px' }}
                                        onClick={this.handleEdit}
                                    />
                                    <span
                                        className="deleteIcon"
                                        style={{ marginRight: '20px', fontSize: '20px' }}
                                        onClick={this.handleDelete}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="separator" />
                    <Confirmation title={I18n.t('files.delete_one')} message={fileName} reference={el => this.contentDialog = el} />
                </ContentPane>
            )
        }
    }
}
FilesContent.propTypes = {
    selectedItems: PropTypes.array,
    changeAction: PropTypes.func.isRequired,
    changeSelectionMode: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}

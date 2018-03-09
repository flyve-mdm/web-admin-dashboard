import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentPane from '../../components/ContentPane'
import EmptyMessage from '../../components/EmptyMessage'
import Loading from '../../components/Loading'
import { Select, Input, DatePicker, TextArea } from '../../components/Forms'
import ErrorValidation from '../../components/ErrorValidation'

export default class DevicesEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            itemListEdit: [...this.props.selectedItemList],
            isLoading: false,
            field: undefined,
            newValue: '',
            passwordConfirmation: '',
            passwordConfiguration: {},
            forceValidation: false
        }
    }

    handleSave = async () => {
        let isCorrect = true

        if (this.state.field === "Password") {
            if (!ErrorValidation.validation(this.state.passwordConfiguration, this.state.newValue).isCorrect) 
                isCorrect = false
            
            if (!ErrorValidation.validation(this.state.passwordConfiguration, this.state.passwordConfirmation).isCorrect) 
                isCorrect = false
        }

        if (isCorrect) {
            this.setState({
                isLoading: true
            }, async () => {
                let input

                switch (this.state.field) {
                    case 'Realname': input = {realname: this.state.newValue}
                        break

                    case 'First name': input = {firstname: this.state.newValue}
                        break
                    
                    case 'Title': input = {usertitles_id: this.state.newValue}
                        break

                    case 'Location': input = {locations_id: this.state.newValue}
                        break
                    
                    case 'Default profile': input = {profiles_id: this.state.newValue}
                        break

                    case 'Password': input = {password: this.state.newValue, password2: this.state.passwordConfirmation}
                        break

                    case 'Valid since': input = {begin_date: this.state.newValue}
                        break

                    case 'Valid until': input = {end_date: this.state.newValue}
                        break
                    
                    case 'Phone': input = {phone: this.state.newValue}
                        break

                    case 'Phone 2': input = {phone2: this.state.newValue}
                        break

                    case 'Mobile phone': input = {mobile: this.state.newValue}
                        break

                    case 'Administrative number': input = {registration_number: this.state.newValue}
                        break

                    case 'Category': input = {usercategories_id: this.state.newValue}
                        break

                    case 'Default entity': input = {entities_id: this.state.newValue}
                        break

                    case 'Comments': input = {comment: this.state.newValue}
                        break

                    default:
                        break
                }

                input = this.props.selectedItemList.map(element => {
                    return ({
                        id: element['User.id'],
                        ...input
                    })
                })

                try {
                    await this.props.glpi.updateItem({itemtype: 'User', input})
                    this.props.showNotification('Success', 'saved profile')
                    this.props.changeActionList(null)
                } catch (e) {
                    this.setState ({isLoading: false})            
                    this.props.showNotification('Error', e)
                }
                
            })
        } else {
            this.setState({
                forceValidation: true
            })
        }
    }

    change = (name, value) => {
        if(name === "field") {
            this.setState({
                newValue: ''
            }, ()=> {
                if (value === "Password") {
                    this.setState({
                        isLoading: true
                    }, async () => {
                        const { cfg_glpi } = await this.props.glpi.getGlpiConfig()
                        this.setState({
                            passwordConfiguration: {
                                minimunLength: cfg_glpi.password_min_length,
                                needDigit: cfg_glpi.password_need_number,
                                needLowercaseCharacter: cfg_glpi.password_need_letter,
                                needUppercaseCharacter: cfg_glpi.password_need_caps,
                                needSymbol: cfg_glpi.password_need_symbol
                            },
                            isLoading: false
                        })
                    })
                }
            })
        } 
        this.setState({
            [name]: value
        })
    }

    render() {
        if (this.props.selectedItemList) {
            let renderComponent
            if (this.state.isLoading) {
                renderComponent = <Loading message="Loading..." />
            } else {
                let input
                switch (this.state.field) {
                    case 'Realname':
                    case 'First name':
                    case 'Phone':
                    case 'Phone 2':
                    case 'Mobile phone':
                    case 'Administrative number':
                        input = (
                            <Input
                                label="What will be the new value?"
                                type="text"
                                name="newValue"
                                value={this.state.newValue}
                                function={this.change}
                            />
                        )
                    break

                    case 'Password':
                        input = [
                            <Input
                                label="What is the new password?"
                                type="password"
                                name="newValue"
                                value={this.state.newValue}
                                parametersToEvaluate={this.state.passwordConfiguration}
                                function={this.change}
                                forceValidation={this.state.forceValidation}
                                key="password-1"
                            />,
                            <Input
                                label="Please repeat the password"
                                type="password"
                                name="passwordConfirmation"
                                value={this.state.passwordConfirmation}
                                parametersToEvaluate={{
                                    ...this.state.passwordConfiguration,
                                    isEqualTo: {
                                        value: this.state.newValue,
                                        message: "Passwords do not match"
                                    }
                                }}
                                function={this.change}
                                forceValidation={this.state.forceValidation}
                                key="password-2"
                            />
                        ]
                    break

                    case 'Title':
                        input = (
                            <Select
                                label= "What will be the new value?"
                                name="newValue"
                                value={this.state.newValue}
                                options={[]}
                                function={this.change}
                                glpi={this.props.glpi}
                                request={{
                                    params: {itemtype: 'UserTitle', options: {range: '0-200', forcedisplay: [2]}},
                                    method: 'searchItems',
                                    content: '1',
                                    value: '2'
                                }}
                            />
                        )
                    break

                    case 'Location':
                        input = (
                            <Select
                                label= "What will be the new value?"
                                name="newValue"
                                value={this.state.newValue}
                                options={[]}
                                function={this.change}
                                glpi={this.props.glpi}
                                request={{
                                    params: {itemtype: 'Location', options: {range: '0-200', forcedisplay: [2]}},
                                    method: 'searchItems',
                                    content: '1',
                                    value: '2'
                                }}
                            />
                        )
                    break

                    case 'Default profile':
                        input = (
                            <Select
                                label= "What will be the new value?"
                                name="newValue"
                                value={this.state.newValue}
                                options={[]}
                                function={this.change}
                                glpi={this.props.glpi}
                                request={{
                                    params: {},
                                    method: 'getMyProfiles',
                                    content: 'name',
                                    value: 'id'
                                }}
                            />
                        )
                    break

                    case 'Category':
                        input = (
                            <Select
                                label= "What will be the new value?"
                                name="newValue"
                                value={this.state.newValue}
                                options={[]}
                                function={this.change}
                                glpi={this.props.glpi}
                                request={{
                                    params: {itemtype: 'UserCategory', options: {range: '0-200', forcedisplay: [2]}},
                                    method: 'searchItems',
                                    content: '1',
                                    value: '2'
                                }}
                            />
                        )  
                    break

                    case 'Default entity':
                        input = (
                            <Select
                                label="What will be the new value?"
                                name="newValue"
                                value={this.state.newValue}
                                options={[]}
                                function={this.change}
                                glpi={this.props.glpi}
                                request={{
                                    params: {},
                                    method: 'getMyEntities',
                                    content: 'name',
                                    value: 'id'
                                }}
                            />
                        )  
                    break

                    case 'Valid since':
                    case 'Valid until':
                        input = (
                            <DatePicker
                                label="What will be the new value?"
                                name="newValue"
                                value={this.state.newValue}
                                function={this.change}
                            />
                        )
                    break

                    case 'Comments': 
                        input = (
                            <TextArea
                                label="What will be the new value?"
                                type="text"
                                name="newValue"
                                value={this.state.newValue}
                                function={this.change}
                            />
                        )
                    break
                
                    default:
                        break
                }
                renderComponent = (
                    <div>
                        {input}
                    </div>
                )
            }              

            return (
                <ContentPane itemListPaneWidth={this.props.itemListPaneWidth}>
                    <div className="contentHeader">
                        <h2 className="win-h2 titleContentPane" > Edit {this.props.location[0]} </h2>
                        <h4  className="win-h4">
                            Select the field that you want to update
                        </h4>
                        <Select
                            name="field"
                            value={this.state.field}
                            options={[
                                'Realname',
                                'First name',
                                'Title',
                                'Location',
                                'Default profile',
                                'Password',
                                'Valid since',
                                'Valid until',
                                'Phone',
                                'Phone 2',
                                'Mobile phone',
                                'Administrative number',
                                'Category',
                                'Default entity',
                                'Comments'
                            ]}
                            function={this.change}
                        />
                        
                        {renderComponent}

                        <br/>
                        
                        <button className="win-button win-button-primary" onClick={this.handleSave}>
                            Save
                        </button>
                    </div>
                </ContentPane>
            )

        } else {
            return (
                <EmptyMessage message="No Selection" itemListPaneWidth={this.props.itemListPaneWidth} />
            )
        }
    }
}
DevicesEdit.propTypes = {
    itemListPaneWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selectedItemList: PropTypes.array,
    location: PropTypes.array.isRequired,
    onNavigate: PropTypes.func.isRequired,
    selectedIndex: PropTypes.array,
    changeSelectionMode: PropTypes.func.isRequired,
    actionList: PropTypes.string,
    changeActionList: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    glpi: PropTypes.object.isRequired
}

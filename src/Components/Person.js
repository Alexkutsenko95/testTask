import React from 'react';
import {Field, reduxForm} from 'redux-form'
import './Person.scss'
import {connect} from 'react-redux';
import {patchData, postData, deleteData} from '../actions'
import {
    push
} from 'react-router-redux'

const renderField = ({
                         input,
                         label,
                         type,
                         meta: {touched, error, warning}
                     }) => (
    <div className='field-wrapper'>
        <label>{label}</label>
        <div className='field'>
            <input {...input} className='text-field'
                   placeholder={label} type={type}/>
            {touched &&
            ((error &&
                <span className='error-field'>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
);

class Person extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }


    handleSubmit(values) {
        this.props.match.params.userId == "new" ? this.props.postData(values) : this.props.patchData(values);
    }

    handleDelete(values) {
        this.props.deleteData(values);
    }


    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;

        return (
            <div className='form-wrapper'>
                <form className='form-fields' onSubmit={handleSubmit(this.handleSubmit)} autoComplete="off">

                    <div className='fields-wrapper'>
                        <Field name="name" component={renderField} label="name"/>
                        <Field
                            name="email"
                            type="text"
                            className='field'
                            component={renderField}
                            label="email"
                        />

                        <div className='form-buttons'>

                            <button type="button" className='delete-button' onClick={handleSubmit(this.handleDelete)}>
                                Delete
                            </button>

                            <div className='submit-wrapper'>
                                <button type="button" className='cancel-button'
                                        onClick={() => this.props.dispatch(push('/'))}>
                                    Cancel
                                </button>
                                <button type="submit" className='ok-button' disabled={pristine || submitting}>
                                    Ok
                                </button>

                            </div>

                        </div>

                    </div>

                </form>

            </div>);
    }
}

const validate = values => {
    const errors = {}
    const requiredFields = [
        'email',
        'name',
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address'
    }
    return errors
};

Person = reduxForm({
    form: 'MaterialUiForm',
    fields: ['name', 'email'],
    enableReinitialize: true,
    validate
})(Person);

function searchById(user, userId) {
    if (user.id === parseInt(userId)) {
        return user
    }
}

const mapStateToProps = (state, ownProps) => {
    if (parseInt(ownProps.match.params.userId) > 0 && state.users.users !== void 0) {
        return {
            users: state.users.users,
            initialValues: state.users.users.find((user) => searchById(user, ownProps.match.params.userId)) || {}
        };
    } else {
        return {
            users: state.users.users,
            initialValues: {}
        };
    }

};

const mapDispatchToProps = {patchData, postData, deleteData};
export default connect(mapStateToProps, mapDispatchToProps)(Person);

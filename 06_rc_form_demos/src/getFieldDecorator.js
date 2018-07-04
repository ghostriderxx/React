/////////////////////////////////////////////////////////////////////////////
// Dependency
//
// ## React
import React from 'react';
import ReactDOM from 'react-dom';

// ## rc-form
import {createForm, formShape} from 'rc-form';

@createForm()
class Form extends React.Component {

    static propTypes = {
        form: formShape,
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((error, values) => {
            if (!error) {
                console.log('ok', values);
            } else {
                console.log('error', error, values);
            }
        });
    };

    onChange = (e) => {
        console.log(e.target.value);
    }

    render() {
        const {getFieldDecorator, getFieldError} = this.props.form;

        return (
            <form onSubmit={this.onSubmit}>
                {
                    getFieldDecorator('name', {
                        initialValue: '',
                        rules: [{
                            required: true,
                            message: 'What\'s your name?',
                        }],
                    })(
                        <input onChange={this.onChange}/>
                    )
                }
                <div style={{color: 'red'}}>
                    {(getFieldError('name') || []).join(', ')}
                </div>
                <button>Submit</button>
            </form>
        );
    }
}

/////////////////////////////////////////////////////////////////////////////
// Start
//
ReactDOM.render(
    <Form/>,
    document.getElementById('app')
);

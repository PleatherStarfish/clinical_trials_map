import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";

function Form(props) {
    return (
        <TextField
            id={ props.id }
            label={ props.label }
            InputLabelProps={{
                id: "text-field-label"
            }}
            value={ props.location }
            onChange={ props.handleFormChange }
        />
    );
}

export default Form;

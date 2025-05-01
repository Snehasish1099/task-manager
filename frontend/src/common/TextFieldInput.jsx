import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputLabel, FormHelperText } from '@mui/material';

function TextFieldInput(props) {

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            props.onKeyPress();
        }
    };

    const onFocus = (e) => {
        if (e.currentTarget === e.target && props.onFocusOut) {
            const trimmed = e.target.value.trim();
            props.onFocusOut(props.textinputname);
            props.onChange(e.target.name, trimmed);
        }
    };

    return (
        <div>
            {props.inputLabel && (
                <InputLabel
                    shrink
                    htmlFor="custom-input"
                    required={props.required}
                    className={`textinputlabel ${props.extralabelcls}`}
                >
                    {props.inputLabel}
                </InputLabel>
            )}

            <TextField
                name={props.textinputname}
                className={props.textnewclass}
                disabled={props.disabled}
                defaultValue={props.defaultValue}
                type={props.typeNumber ? 'number' : props.typePassword ? 'password' : 'text'}
                value={props.value}
                onChange={(event) => props.onChange(event)}
                placeholder={props.placeholder}
                error={props.error}
                required={props.required}
                autoComplete="off"
                onBlur={props.onBlur}
                autoFocus={props.autoFocus}
                fullWidth={props.fullWidth}
                multiline={props.multiline}
                minRows={props.minRows}
                maxRows={props.maxRows}
                rows={props.rows}
                onKeyDown={handleKeyDown}
                onFocus={onFocus}
                variant={props.variant || 'outlined'}
                label={
                    props.floatingLabel && (
                        <span className={`${props.floatingError ? 'errorLabelCls' : ''} flotinglabelclss`}>
                            {props.floatingLabel}
                        </span>
                    )
                }
                focused={props.focused}
                slotProps={{
                    input: {
                        endAdornment: props.endAdornment,
                        startAdornment: props.startAdornment,
                    },
                }}
                id="custom-input"
            />

            {props.errorText && (
                <FormHelperText className="errormsg text-[10px] text-red-600">
                    {props.errorText}
                </FormHelperText>
            )}
        </div>
    );
}

TextFieldInput.propTypes = {
    inputLabel: PropTypes.string,
    extralabelcls: PropTypes.string,
    textnewclass: PropTypes.string,
    textinputname: PropTypes.string,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.string,
    error: PropTypes.bool,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    floatingLabel: PropTypes.string,
    helpicon: PropTypes.bool,
    multiline: PropTypes.bool,
    minRows: PropTypes.number,
    maxRows: PropTypes.number,
    rows: PropTypes.number,
    onKeyPress: PropTypes.func,
    errorText: PropTypes.string,
    floatingError: PropTypes.bool,
    onFocusOut: PropTypes.func,
    customStyles: PropTypes.object,
    fullWidth: PropTypes.bool,
    endAdornment: PropTypes.node,
    startAdornment: PropTypes.node,
    typePassword: PropTypes.bool,
    variant: PropTypes.string,
    autoFocus: PropTypes.bool,
    onBlur: PropTypes.func,
    typeNumber: PropTypes.bool,
    focused: PropTypes.bool,
};

export default TextFieldInput;

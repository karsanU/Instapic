/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const filter = createFilterOptions();
const useStyles = makeStyles({
    root: {

        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--dark-text)"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "var(--dark-text)"
        },

        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "var(--dark-text)"
        }
    }
});

export default function SearchBar({ usernames, }) {
    const [value, setValue] = React.useState(null);
    const usernameStrings = (usernames.map((username) => {
        return username.userName
    }));


    const classes = useStyles();
    const history = useHistory();

    return (
        <Autocomplete
            value={value}
            // push the user's profile if the input username exists 
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    if (usernameStrings.includes(newValue)) {
                        history.push(`/user/${newValue}`)
                    }
                    setValue('')
                } else if (typeof newValue === 'object' && newValue.userName) {
                    history.push(`/user/${newValue.userName}`)
                    setValue('')
                }
            }}

            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={usernames}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.userName;
            }}
            renderOption={(option) => option.userName}
            style={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label="Search" className={classes.root}
                    variant="outlined" size="small" />
            )}
        />
    );
}

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser } from '../redux/User/action';
import { useParams } from 'react-router-dom';

const defaultTheme = createTheme();

export default function AddUser() {

    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        departmentName: '',
        contact: ''
    }

    const [user, setUser] = React.useState(initialState);
    const [isDone, setIsDone] = React.useState(false);

    const usersData = useSelector((state) => state.user.users);

    const dispatch = useDispatch();
    const { userId } = useParams();

    React.useEffect(() => {

        if (userId) {
            const data = usersData.find((item) => item.userId === userId);
            setUser(data);
        } else {
            setUser(initialState);
        }
    }, [userId]);

    const { firstName, lastName, email, contact } = user;

    const handleSubmit = (event) => {

        event.preventDefault();

        if (userId) {
            dispatch(updateUser({ userId, user }));
        } else {
            dispatch(addUser(user));
            setUser(initialState);
        }
        setIsDone(true);
        setTimeout(() => {
            setIsDone(false);
        }, 3000);
    };

    const handleChange = (e) => {
        const { value, name } = e.target
        setUser({ ...user, [name]: value });
    }


    return (
        <ThemeProvider theme={defaultTheme}>
            {isDone &&
                <Alert severity="success" color="info">
                    Successfully done 💖!
                </Alert>
            }
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                        {userId ? "Update Existing User" : "Add New User"}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="User First Name"
                            name="firstName"
                            autoComplete="firstName"
                            value={firstName}
                            onChange={handleChange}
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="User Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            value={lastName}
                            onChange={handleChange}

                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type='email'
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={handleChange}
                            error={email && !isValidEmail(email)}
                            helperText={email && !isValidEmail(email) ? 'Invalid email' : ''}
                        />

                        <TextField
                            margin="normal"
                            required
                            type='number'
                            fullWidth
                            label="Contact Number"
                            name="contact"
                            autoComplete="contact"
                            value={contact}
                            onChange={handleChange}
                        />

                        <BasicSelect user={user} setUser={setUser} />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {userId ? "UPDATE USER" : "ADD USER"}
                        </Button>

                    </Box>
                </Box>
            </Container>

        </ThemeProvider>
    );
}



const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
};


function BasicSelect({ user, setUser }) {

    const handleChange = (event) => {
        setUser({ ...user, departmentName: event.target.value })
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={user.departmentName}
                    label="Department"
                    onChange={handleChange}
                >
                    <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
                    <MenuItem value={"Information Technology"}>Information Technology</MenuItem>
                    <MenuItem value={"User Experience & Design"}>User Experience & Design</MenuItem>
                    <MenuItem value={"Backend Development"}>Backend Development</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
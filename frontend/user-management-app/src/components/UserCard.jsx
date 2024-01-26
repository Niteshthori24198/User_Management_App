import React from 'react'

import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const styylesCard = { display: 'flex', alignItems: 'center', marginBottom: '10px' }

function UserCard({ user, handleDelete }) {

    return (

        <Card sx={{
            maxWidth: 300,
            cursor: 'pointer'
        }}>

            <CardMedia
                sx={{
                    height: 150,
                    width: 150,
                    borderRadius: '50%', // Make the image round
                    margin: 'auto', // Center the image horizontally
                    marginTop: '10px', // Add top margin
                    marginBottom: '10px', // Add bottom margin
                    overflow: 'hidden', // Ensure the rounded border is visible
                }}
                image={"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1706140800&semt=ais"}
                title="User Image"
            />

            <CardContent>

                <Typography variant="h6" color="text.secondary" style={{ display: 'flex', alignItems: 'center', fontWeight: '200', color: 'black' }}>
                    <MailIcon style={{ marginRight: '4px', fontWeight: 'bold', color: 'black' }} />
                    {user.email}
                </Typography>

                <Typography gutterBottom variant="body1" color="text.secondary" component="div" style={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon style={{ marginRight: '4px', fontWeight: 'bold', color: 'black' }} />
                    {user.firstName + " " + user.lastName}
                </Typography>

                <Typography variant="body1" color="text.secondary" style={styylesCard}>
                    <PhoneIcon style={{ marginRight: '4px', fontWeight: 'bold', color: 'black' }} />
                    {"+91 " + user.contact}
                </Typography>

                <Typography variant="body1" color="text.secondary" style={styylesCard}>
                    <CorporateFareIcon style={{ marginRight: '4px', fontWeight: 'bold', color: 'black' }} />
                    {user.departmentName}
                </Typography>

            </CardContent>

            <ActionButtons user={user} handleDelete={handleDelete} />

        </Card>
    )
}

export default UserCard


const ActionButtons = ({ user, handleDelete }) => (

    <Box sx={{ pl: 5, pr: 5 }}>
        <Link to={`/edit-user/${user.userId}`}>
            <Button
                fullWidth
                variant="outlined"
                color="primary" // Use your desired color
                sx={{ mt: 1, mb: 1 }}
            >
                Edit User
            </Button>
        </Link>
        <Button
            fullWidth
            variant="outlined"
            color="error"
            sx={{ mb: 2 }}
            onClick={() => handleDelete(user.userId)}
        >
            Delete User
        </Button>
    </Box>
);
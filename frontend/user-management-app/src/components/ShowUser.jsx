import { Box, Grid, Pagination, Stack } from '@mui/material'
import React from 'react'
import UserCard from './UserCard';

function ShowUser({ totalCount, users, limit, page, handlePageChange, handleDelete }) {

    if (!totalCount || users.length == 0) {
        return <h2 style={{ textAlign: 'center' }}>No user Present 🙌</h2>
    }

    return (
        <>
            <Box
                sx={{
                    width: '80%',
                    margin: 'auto'
                }}
            >
                <Grid
                    sx={{
                        display: 'grid',
                        alignItems: 'center',
                        placeItems: 'center',
                        justifyContent: 'center',
                        gridTemplateColumns: "repeat(auto-fill, 300px)",
                        gap: 5
                    }}
                >
                    {users?.map((user, index) => (

                        <Grid item xs={2} sm={4} md={4} key={index} style={{ width: '100%' }}>

                            <UserCard
                                user={user}
                                handleDelete={handleDelete}
                            />

                        </Grid>

                    ))}
                </Grid>

            </Box>
            <Stack
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 4, my: 5 }}
            >
                <Pagination count={Math.ceil(totalCount / limit)} page={page} onChange={handlePageChange} color="primary" />
            </Stack>
        </>
    )
}

export default ShowUser
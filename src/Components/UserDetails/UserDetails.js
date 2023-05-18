import React, { useState, useEffect } from 'react';
import axios from "axios";
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom'
import { Typography, Grid, Paper, Box } from '@mui/material';
import "./UserDetails.css";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#F7F9F9",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    margin: "0",
    // textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const UserDetails = () => {
    let { id } = useParams();
    const baseURL = `https://jsonplaceholder.typicode.com/users/${id}`;
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        axios?.get(baseURL)?.then((response) => {
            setUserDetails(response?.data);
        });
    }, [baseURL]);
    let { email, name, phone, username } = userDetails;

    return (
        <Box sx={{ flexGrow: 1 }} className='campaignBox'>
            <Grid item xs={12}>
                <Item className='camp-detail'>
                    <Typography
                        className='camp-detail-heading'
                        noWrap
                        variant='h4'
                    >
                        User Details
                    </Typography>

                    <Grid container>
                        <Typography >NAME:</Typography>
                        <Typography className='camp-form-value'>{name || ""}</Typography>
                    </Grid>
                    <Grid container className='campaigncontainer'>
                        <Typography  noWrap className='camp-brand-name'>USERNAME:</Typography>
                        <Typography className='camp-form-value'>{username || ''}</Typography>
                    </Grid>
                    <Grid container className='datecontainer'>
                        <Typography  noWrap className='camp-brand-backg'>EMAIL:</Typography>
                        <Typography className='camp-form-value'>{email || ''}</Typography>
                    </Grid>
                    <Grid container className='datecontainer'>
                        <Typography  noWrap className='camp-purpose'>PHONE:</Typography>
                        <Typography className='camp-form-value'>{phone || ''}</Typography>
                    </Grid>
                    <Typography
                        className='camp-detail-heading'
                        noWrap
                        variant='h4'
                    >
                        Address Details
                    </Typography>
                    <Grid container className='datecontainer'>
                        <Typography  noWrap className='camp-key-msg'>STREET:</Typography>
                        <Typography className='camp-form-value'>{userDetails?.address?.street || ''}</Typography>
                    </Grid>
                    <Grid container className='datecontainer'>
                        <Typography  noWrap component="div" className='camp-target-aud'>SUITE:</Typography>
                        <Typography className='camp-form-value'>{userDetails?.address?.suite || ''}</Typography>
                    </Grid>
                    <Grid container className='datecontainer'>
                        <Typography  noWrap component="div" className='camp-boost-opt'>CITY:</Typography>
                        <Typography className='camp-form-value'>{userDetails?.address?.city || ''}</Typography>
                    </Grid>
                    <Grid container className='datecontainer'>
                        <Typography  noWrap className='camp-boost-opt'>ZIP CODE:</Typography>
                        <Typography className='camp-form-value'>{userDetails?.address?.zipcode || ''}</Typography>
                    </Grid>
                </Item>
            </Grid>
        </Box>
    )
}

export default UserDetails
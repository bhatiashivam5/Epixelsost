import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./UsersList.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function UsersList() {
    const baseURL = 'https://jsonplaceholder.typicode.com/users';
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [favData, setFavData] = useState([]);
    useEffect(() => {
        axios?.get(baseURL)?.then((response) => {
            const result = response?.data?.sort((a, b) => a?.name?.localeCompare(b?.name))
            setUserData(result);
        });
    }, []);

    const favUser = (user) => {
        const newFavList = [...favData, user?.id]
        setFavData(newFavList)
        localStorage.setItem("favorites", JSON.stringify(newFavList))
    }

    const removefavUser = (index) => {
        const existingUsers = JSON?.parse(localStorage?.getItem("favorites"));
        let newArr = existingUsers?.splice(index, 1)
        localStorage?.setItem("favorites", JSON?.stringify(newArr));
    }

    const localFav = localStorage?.getItem("favorites")
    const localFavNew = JSON?.parse(localFav)

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead >
                    <TableRow>
                        <StyledTableCell align="right" className='table-head'>Name</StyledTableCell>
                        <StyledTableCell align="right" className='table-head'>Username</StyledTableCell>
                        <StyledTableCell align="right" className='table-head'>Email</StyledTableCell>
                        <StyledTableCell align="right" className='table-head'>Phone no.</StyledTableCell>
                        <StyledTableCell align="right" className='table-head'>Favorite</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userData ? userData?.map((row, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell
                                component="th"
                                scope="row"
                                align="right"
                                className='username-row'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/userDetails/${row?.id}`)
                                }}
                            >
                                {row?.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row?.username}</StyledTableCell>
                            <StyledTableCell align="right">{row?.email}</StyledTableCell>
                            <StyledTableCell align="right">{row?.phone}</StyledTableCell>

                            <StyledTableCell align="right">
                                {
                                    localFavNew?.includes(row?.id) ?
                                        <FavoriteIcon
                                            onClick={() => removefavUser(index)}
                                        />
                                        :
                                        <FavoriteBorderIcon
                                            onClick={() => favUser(row)}
                                        />
                                }
                            </StyledTableCell>
                        </StyledTableRow>
                    ))
                        :
                        "no users found"}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

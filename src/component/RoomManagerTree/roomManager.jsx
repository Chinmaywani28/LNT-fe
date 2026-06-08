import React, { useEffect, useState } from "react";
import { getTree, fetchTree, updateTree, deleteTree } from "../Services/tree.service";
import { Alert, Box, Button, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';

const RoomManager = () => {
    const [data, setData] = useState(null);
    const [JsonData, setJsonData] = useState(null)
    const [facilityIndex, setFacilityIndex] = useState(0);
    const [floorIndex, setFloorIndex] = useState(0);
    const [newRoom, setNewRoom] = useState("");
    const [removeRoom, setRemoveRoom] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const userId = sessionStorage.getItem('userId');

    const fetchTreeStructure = async () => {
        try {
            const data = await fetchTree();
            setData(data.result);
            setJsonData(data.result)
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddRoom = async () => {
        if (!newRoom) return alert("Please enter a room name");

        const obj = {
            location: newRoom,
            userId
        };

        const resp = await updateTree(obj);
        if (resp) {
            setSnackbarOpen(true);
            setSnackbarMessage('New Location Added Success : ' + newRoom);
            await fetchTreeStructure()
        }
    };

    const handleRemoveRoom = async () => {
        if (!removeRoom) return alert("Please enter the name of the room to remove");

        const obj = {
            location: removeRoom,
            userId
        };

        const resp = await deleteTree(obj);
        if (resp) {
            setSnackbarOpen(true);
            setSnackbarMessage(resp?.message)
            await fetchTreeStructure()
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        fetchTreeStructure()
    }, [])

    const styles = {
        thinBorder: {
            border: "0.5px solid #E5E7EB",
            // boxShadow: "0 8px 16px rgba(0, 0, 0, 0.05)",
            backgroundColor: "white",
        },
    };

    return (
        <Box sx={{ ...styles.thinBorder, display: 'flex', margin: 'auto', flexDirection: 'column', gap: '20px', padding: 4, width: '50%', borderRadius: '20px', height: '100%' }}>
            <h1 style={{ textAlign: 'center' }}>Custom Location Update</h1>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <TextField
                    label="Enter a new location"
                    sx={{ width: 400 }}
                    margin="normal"
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                />
                {/* <TextField
                    select
                    label="削除する場所を選択"
                    sx={{ width: 400 }}
                    margin="normal"
                    value={removeRoom}
                    onChange={(e) => setRemoveRoom(e.target.value)}
                >
                    {data?.map((room, index) => (
                        <MenuItem key={index} value={room}>
                            {room}
                        </MenuItem>
                    ))}
                </TextField> */}
                <TextField
                    select
                    label="Select the location to delete"
                    sx={{ width: 400 }}
                    margin="normal"
                    value={removeRoom}
                    onChange={(e) => setRemoveRoom(e.target.value)}
                >
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((room, index) => (
                            <MenuItem key={index} value={room}>
                                {room}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>Location not found</MenuItem>
                    )}
                </TextField>

            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <Button variant="contained" color="primary" onClick={handleAddRoom}>
                    <AddLocationAltIcon /> Add a location
                </Button>
                <Button variant="contained" color="secondary" onClick={handleRemoveRoom}>
                    <WrongLocationIcon /> Delete Location
                </Button>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
            >
                <Alert variant='filled' onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default RoomManager;


import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
    IconButton, Grid, Divider
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from 'axios';
import './Admin.css';
import ErrorToast from '../Form/Toaster';
import SuccessToast from '../Form/SuccessToast';

const ManageProducts = () => {
    const [tyres, setTyres] = useState([]);
    const [newTyre, setNewTyre] = useState({ brand: '', size: '', price: '', available: '' });
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedTyre, setSelectedTyre] = useState(null);
    const [message, setMessage] = useState('');
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState(""); // 'success' or 'error'

    useEffect(() => {
        fetchAllTyres();
    }, []);

    // Fetch All Tyres
    const fetchAllTyres = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/all-tyre-data');
            setTyres(response.data.data);
        } catch (error) {
            console.error('Error fetching tyre data:', error);
            showToast('Error fetching tyre data.', 'error');
        }
    };

    

    // Add New Tyres
    const addTyre = async () => {
        try {
            await axios.post('http://localhost:8080/admin/add-tyres', newTyre);
            fetchAllTyres();
            showToast('Tyre added successfully!', 'success');
            setNewTyre({ brand: '', size: '', price: '', available: '' });
        } catch (error) {
            console.error('Error adding tyre:', error);
            showToast('Error adding tyre.', 'error');
        }
    };

    // Update Tyre Data
    const handleEditClick = (tyre) => {
        setSelectedTyre(tyre);
        setOpenEditDialog(true);
    };

    const handleUpdateTyre = async () => {
        try {
            await axios.put(`http://localhost:8080/admin/update-tyre/${selectedTyre._id}`, selectedTyre);
            fetchAllTyres();
            showToast(`Tyre ${selectedTyre.brand} updated successfully!`, 'success');
            setOpenEditDialog(false);
        } catch (error) {
            console.error('Error updating tyre:', error);
            showToast('Error updating tyre.', 'error');
        }
    };

    // Delete Tyre by ID
    const deleteTyre = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/admin/delete-tyre/${id}`);
            fetchAllTyres();
            showToast('Tyre deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting tyre:', error);
            showToast('Error deleting tyre.', 'error');
        }
    };

    const showToast = (message, type) => {
        setToastMessage(message);
        setToastType(type);
        setTimeout(() => {
            setToastMessage("");
            setToastType("");
        }, 3000); // Hide toast after 3 seconds
    };

    return (
        <div className="manage-users-container">
            <h2>Manage Tyres</h2>
            {message && <p>{message}</p>}

            {/* Add New Tyre Section */}
            <div>
                <h3>Add New Tyre</h3>
               
                <TextField
                    label="Image"
                    value={newTyre.image}
                    onChange={(e) => setNewTyre({ ...newTyre, image: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Brand"
                    value={newTyre.brand}
                    onChange={(e) => setNewTyre({ ...newTyre, brand: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Size"
                    value={newTyre.size}
                    onChange={(e) => setNewTyre({ ...newTyre, size: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Price"
                    type="number"
                    value={newTyre.price}
                    onChange={(e) => setNewTyre({ ...newTyre, price: e.target.value })}
                    fullWidth
                />
                <TextField
                    label="Available"
                    type="number"
                    value={newTyre.available}
                    onChange={(e) => setNewTyre({ ...newTyre, available: e.target.value })}
                    fullWidth
                />
                <Button variant="contained" color="primary" onClick={addTyre}>Add Tyre</Button>
            </div>

            {/* All Tyres Table */}
            <TableContainer component={Paper} className="table-container" style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell>Size</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Available</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tyres.map(tyre => (
                            <TableRow key={tyre._id}>
                                <TableCell><img className='new-tyre-src' src={tyre.image}/></TableCell>
                                <TableCell>{tyre.tyre_brand}</TableCell>
                                <TableCell>{tyre.tyre_size}</TableCell>
                                <TableCell>{tyre.price}</TableCell>
                                <TableCell>{tyre.available}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEditClick(tyre)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => deleteTyre(tyre._id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Tyre Dialog */}
            <Dialog
                open={openEditDialog}
                onClose={() => setOpenEditDialog(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{ style: { borderRadius: 15 } }} // Added border-radius
            >
                <DialogTitle className='Dialogue-title'>Edit Tyre</DialogTitle>
                <Divider />
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Image"
                                fullWidth
                                value={selectedTyre?.image || ''}
                                onChange={(e) => setSelectedTyre({ ...selectedTyre, image: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Brand"
                                fullWidth
                                value={selectedTyre?.tyre_brand || ''}
                                onChange={(e) => setSelectedTyre({ ...selectedTyre, tyre_brand: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Size"
                                fullWidth
                                value={selectedTyre?.tyre_size || ''}
                                onChange={(e) => setSelectedTyre({ ...selectedTyre, tyre_size: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Price"
                                type="number"
                                fullWidth
                                value={selectedTyre?.price || ''}
                                onChange={(e) => setSelectedTyre({ ...selectedTyre, price: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                    <Button onClick={handleUpdateTyre} color="primary">Update</Button>
                </DialogActions>
            </Dialog>

            {/* Toast Messages */}
            {toastMessage && (
                toastType === 'success' ? (
                    <SuccessToast message={toastMessage} />
                ) : (
                    <ErrorToast message={toastMessage} />
                )
            )}
        </div>
    );
};

export default ManageProducts;

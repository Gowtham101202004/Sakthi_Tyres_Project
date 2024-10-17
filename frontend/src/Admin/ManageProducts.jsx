import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
    IconButton, Grid, Divider, Collapse
} from "@mui/material";
import { Delete, Edit, Add, Close } from "@mui/icons-material"; // Imported Close icon
import axios from 'axios';
import './Admin.css'; 
import ErrorToast from '../Form/Toaster';
import SuccessToast from '../Form/SuccessToast';

const ManageProducts = () => {
    const [tyres, setTyres] = useState([]);
    const [newTyre, setNewTyre] = useState({ image: '', vehicle_type: '', vehicle_brand: '', vehicle_model: '', tyre_brand: '', tyre_model: '', tyre_size: '', price: ''});
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedTyre, setSelectedTyre] = useState(null);
    const [openAddSection, setOpenAddSection] = useState(false); // State for plus icon
    const [message, setMessage] = useState('');
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState(""); // 'success' or 'error'

    useEffect(() => {
        fetchAllTyres();
    }, []);

    const fetchAllTyres = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/all-tyre-data');
            setTyres(response.data.data);
        } catch (error) {
            console.error('Error fetching tyre data:', error);
            showToast('Error fetching tyre data.', 'error');
        }
    };

    const addTyre = async () => {
        try {
            await axios.post('http://localhost:8080/admin/add-tyres', newTyre);
            fetchAllTyres();
            showToast('Tyre added successfully!', 'success');
            setNewTyre({ image: '', vehicle_type: '', vehicle_brand: '', vehicle_model: '', tyre_brand: '', tyre_model: '', tyre_size: '', price: ''});
        } catch (error) {
            console.error('Error adding tyre:', error);
            showToast('Error adding tyre.', 'error');
        }
    };

    const handleEditClick = (tyre) => {
        setSelectedTyre(tyre);
        setOpenEditDialog(true);
    };

    const handleUpdateTyre = async () => {
        try {
            await axios.put(`http://localhost:8080/admin/update-tyre/${selectedTyre._id}`, selectedTyre);
            fetchAllTyres();
            showToast(`Tyre ${selectedTyre.tyre_brand} updated successfully!`, 'success');
            setOpenEditDialog(false);
        } catch (error) {
            console.error('Error updating tyre:', error);
            showToast('Error updating tyre.', 'error');
        }
    };

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
        }, 3000);
    };

    return (
        <div className="manage-users-container">
            <h2>Manage Tyres</h2>

            {/* Plus icon to toggle add section */}
            <div className="add-tyre-toggle">
                <IconButton onClick={() => setOpenAddSection(!openAddSection)} color="primary">
                    <Add />
                </IconButton>
                <span>Add New Tyre</span>
            </div>

            <Collapse in={openAddSection}>
                <div className="add-tyre-section">
                    {/* Close Icon */}
                    <div className="add-tyre-header">
                        <IconButton 
                            className="close-add-tyre" 
                            onClick={() => setOpenAddSection(false)} 
                            color="error"
                        >
                            <Close />
                        </IconButton>
                    </div>
                    <h3>Add New Tyre</h3>
                    <TextField
                        label="Image"
                        value={newTyre.image}
                        onChange={(e) => setNewTyre({ ...newTyre, image: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Vehicle Type"
                        value={newTyre.vehicle_type}
                        onChange={(e) => setNewTyre({ ...newTyre, vehicle_type: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Vehicle Brand"
                        value={newTyre.vehicle_brand}
                        onChange={(e) => setNewTyre({ ...newTyre, vehicle_brand: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Vehicle Model"
                        value={newTyre.vehicle_model}
                        onChange={(e) => setNewTyre({ ...newTyre, vehicle_model: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Tyre Brand"
                        value={newTyre.tyre_brand}
                        onChange={(e) => setNewTyre({ ...newTyre, tyre_brand: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Tyre Model"
                        value={newTyre.tyre_model}
                        onChange={(e) => setNewTyre({ ...newTyre, tyre_model: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Tyre Size"
                        value={newTyre.tyre_size}
                        onChange={(e) => setNewTyre({ ...newTyre, tyre_size: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Price"
                        type="number"
                        value={newTyre.price}
                        onChange={(e) => setNewTyre({ ...newTyre, price: e.target.value })}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" onClick={addTyre}>Add Tyre</Button>
                </div>
            </Collapse>

            {/* All Tyres Table */}
            <TableContainer component={Paper} className="table-container" style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Vehicle Type</TableCell>
                            <TableCell>Vehicle Brand & Model</TableCell>
                            <TableCell>Tyre Brand</TableCell>
                            <TableCell>Tyre Model</TableCell>
                            <TableCell>Tyre Size</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tyres.map(tyre => (
                            <TableRow key={tyre._id}>
                                <TableCell>
                                    <img className='new-tyre-src' src={tyre.image} alt="tyre" />
                                </TableCell>
                                <TableCell>{tyre.vehicle_type}</TableCell>
                                <TableCell>{tyre.vehicle_brand} ({tyre.vehicle_model})</TableCell>
                                <TableCell>{tyre.tyre_brand}</TableCell>
                                <TableCell>{tyre.tyre_model}</TableCell>
                                <TableCell>{tyre.tyre_size}</TableCell>
                                <TableCell>{tyre.price}</TableCell>
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
                PaperProps={{ style: { borderRadius: 15 } }}
            >
                <DialogTitle>Edit Tyre</DialogTitle>
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
                                label="Vehicle Type"
                                fullWidth
                                value={selectedTyre?.vehicle_type || ''}
                                onChange={(e) => setSelectedTyre({ ...selectedTyre, vehicle_type: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Vehicle Brand"
                                fullWidth
                                value={selectedTyre?.vehicle_brand || ''}
                                onChange={(e) => setSelectedTyre({ ...selectedTyre, vehicle_brand: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Vehicle Model"
                                fullWidth
                                value={selectedTyre?.vehicle_model || ''}
                                onChange={(e) => setSelectedTyre({ ...selectedTyre, vehicle_model: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Tyre Brand"
                                fullWidth
                                value={selectedTyre?.tyre_brand || ''}
                                onChange={(e) => setSelectedTyre({ ...selectedTyre, tyre_brand: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Tyre Model"
                                fullWidth
                                value={selectedTyre?.tyre_model || ''}
                                onChange={(e) => setSelectedTyre({ ...selectedTyre, tyre_model: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Tyre Size"
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

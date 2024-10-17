import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Grid, MenuItem, Select, InputLabel, FormControl,
  Divider
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import './Admin.css';
import axios from "axios";
import ErrorToast from '../Form/Toaster';
import SuccessToast from '../Form/SuccessToast';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(""); // 'success' or 'error'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/admin/all-orders-data");
        setOrders(res.data.data);
      } catch (err) {
        setToastMessage("Error fetching orders data.");
        setToastType("error");
        console.log(err.response);
      }
    };
    fetchData();
  }, []);

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage("");
      setToastType("");
    }, 3000); // Hide toast after 3 seconds
  };

  const handleDeleteClick = (order) => {
    setSelectedOrder(order);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/admin/delete-order/${selectedOrder._id}`);
      setOrders(orders.filter((order) => order._id !== selectedOrder._id));
      showToast(`Order ${selectedOrder._id} deleted successfully.`, "success");
    } catch (err) {
      showToast("Error deleting order.", "error");
      console.log(err.response);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setOpenEditDialog(true);
  };

  const handleUpdateOrder = async () => {
    try {
      await axios.put(`http://localhost:8080/admin/update-order/${selectedOrder._id}`, {
        items: selectedOrder.items,
        totalPrice: selectedOrder.totalPrice,
        paymentType: selectedOrder.paymentType,
        paymentMethod: selectedOrder.paymentMethod,
      });
      setOrders(orders.map((order) => (order._id === selectedOrder._id ? selectedOrder : order)));
      showToast(`Order ${selectedOrder._id} updated successfully.`, "success");
    } catch (err) {
      showToast("Error updating order.", "error");
      console.log(err.response);
    } finally {
      setOpenEditDialog(false);
    }
  };

  return (
    <>
      <div className="manage-orders-container">
        <h2>Manage Orders</h2>

        {/* Orders Table */}
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Payment Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                  <TableCell>{order.paymentType}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditClick(order)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteClick(order)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          PaperProps={{ style: { borderRadius: 15 } }} // Added border-radius
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>Are you sure you want to delete order <b>{selectedOrder?._id}</b>?</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button onClick={handleConfirmDelete} color="error">Delete</Button>
          </DialogActions>
        </Dialog>

        {/* Edit Order Dialog */}
        <Dialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{ style: { borderRadius: 15 } }} // Added border-radius
        >
          <DialogTitle>Edit Order</DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Order ID"
                  fullWidth
                  disabled
                  value={selectedOrder?._id || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="User ID"
                  fullWidth
                  disabled
                  value={selectedOrder?.userId || ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Total Price"
                  fullWidth
                  value={selectedOrder?.totalPrice || ""}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, totalPrice: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Payment Type"
                  fullWidth
                  value={selectedOrder?.paymentType || ""}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, paymentType: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateOrder} color="primary">Update</Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* Toast Messages */}
      {toastMessage && (
        toastType === 'success' ? (
          <SuccessToast message={toastMessage} />
        ) : (
          <ErrorToast message={toastMessage} />
        )
      )}
    </>
  );
};

export default ManageOrders;

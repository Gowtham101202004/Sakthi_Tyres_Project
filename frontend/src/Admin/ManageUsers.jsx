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

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [password, setPassword] = useState(""); 
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(""); // 'success' or 'error'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/admin/get-all-users-data");
        setUsers(res.data.data);
      } catch (err) {
        setToastMessage("Error fetching users data.");
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

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/admin/delete-users/${selectedUser._id}`);
      setUsers(users.filter((user) => user._id !== selectedUser._id));
      showToast(`User ${selectedUser.name} deleted successfully.`, "success");
    } catch (err) {
      showToast("Error deleting user.", "error");
      console.log(err.response);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const handleUpdateUser = async () => {
    const updatedUser = {
      ...selectedUser,
      password: password ? password : selectedUser.password,
    };

    try {
      await axios.put(`http://localhost:8080/admin/update-users-data/${updatedUser._id}`, {
        name: updatedUser.name,
        email: updatedUser.email,
        newPassword: updatedUser.password,
        isadmin: updatedUser.isadmin,
      });
      setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
      showToast(`User ${updatedUser.name} updated successfully.`, "success");
    } catch (err) {
      showToast("Error updating user.", "error");
      console.log(err.response);
    } finally {
      setOpenEditDialog(false);
    }
  };

  return (
    <>
      <div className="manage-users-container">
        <h2>Manage Users</h2>

        {/* Users Table */}
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} style={{ backgroundColor: user.isadmin ? 'rgba(144,238,144,0.3)' : 'transparent' }}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.isadmin ? "Admin" : "User"}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditClick(user)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteClick(user)}>
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
          <DialogContent>Are you sure you want to delete {selectedUser?.name}?</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button onClick={handleConfirmDelete} color="error">Delete</Button>
          </DialogActions>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{ style: { borderRadius: 15 } }} // Added border-radius
        >
          <DialogTitle>Edit User</DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  fullWidth
                  disabled
                  value={selectedUser?.name || ""}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  fullWidth
                  disabled
                  value={selectedUser?.email || ""}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                {/* Role Dropdown Menu */}
                <FormControl fullWidth>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    value={selectedUser?.isadmin ? "Admin" : "User"}
                    label="Role"
                    onChange={(e) => setSelectedUser({ ...selectedUser, isadmin: e.target.value === "Admin" })}
                  >
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Change Password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave empty to keep the current password"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateUser} color="primary">Update</Button>
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

export default ManageUsers;
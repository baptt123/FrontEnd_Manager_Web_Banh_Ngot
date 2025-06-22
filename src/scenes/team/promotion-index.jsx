import React, { useEffect, useState } from "react";
import {
  Box,
  useTheme,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import {
  fetchAllPromotions,
  deletePromotion,
  createPromotion,
  updatePromotion,
} from "../../api/storePromotionAPI";

const PromotionManager = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const toLocalDateTimeString = (date) => {
    if (!date) return "";
    // Nếu đã đúng định dạng LocalDateTime thì giữ nguyên
    if (date.includes("T")) return date;
    return date + "T00:00:00";
  };
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("create"); // 'create' or 'edit'
  const [selectedPromotion, setSelectedPromotion] = useState({
    name: "",
    description: "",
    discountPercentage: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = async () => {
    setLoading(true);
    try {
      const data = await fetchAllPromotions();
      setPromotions(data);
    } catch (error) {
      console.error("Failed to fetch promotions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (mode, promotion = null) => {
    setDialogMode(mode);
    setSelectedPromotion(
        promotion || {
          name: "",
          description: "",
          discountPercentage: "",
          startDate: "",
          endDate: "",
        }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPromotion(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedPromotion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...selectedPromotion,
        startDate: toLocalDateTimeString(selectedPromotion.startDate),
        endDate: toLocalDateTimeString(selectedPromotion.endDate),
      };

      if (dialogMode === "create") {
        await createPromotion(payload);
      } else {
        await updatePromotion(selectedPromotion.promotionId, payload);
      }
      handleCloseDialog();
      loadPromotions();
    } catch (error) {
      console.error("Failed to save promotion:", error);
    }
  };

  const handleDeletePromotion = async (id) => {
    setSelectedDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await deletePromotion(selectedDeleteId);
      setSelectedDeleteId(null);
      loadPromotions();
    } catch (error) {
      console.error("Failed to delete promotion:", error);
    }
  };

  const cancelDelete = () => {
    setSelectedDeleteId(null);
  };

  const columns = [
    { field: "promotionId", headerName: "ID", width: 80 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1.5 },
    {
      field: "discountPercentage",
      headerName: "Discount (%)",
      width: 130,
      valueFormatter: ({ value }) => `${value}%`,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1.2,
      valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1.2,
      valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: ({ row }) => (
          <Box display="flex" gap={1}>
            <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => handleOpenDialog("edit", row)}
            >
              Edit
            </Button>
            <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleDeletePromotion(row.promotionId)}
            >
              Delete
            </Button>
          </Box>
      ),
    },
  ];

  return (
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="PROMOTIONS" subtitle="Manage Store Promotions" />
          <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenDialog("create")}
          >
            Add New Promotion
          </Button>
        </Box>

        {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
              <CircularProgress />
            </Box>
        ) : (
            <Box
                height="75vh"
                mt={2}
                sx={{
                  "& .MuiDataGrid-root": { border: "none" },
                  "& .MuiDataGrid-cell": { borderBottom: "none" },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.greenAccent[700],
                    borderBottom: "none",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.greenAccent[700],
                  },
                }}
            >
              <DataGrid
                  rows={promotions}
                  columns={columns}
                  getRowId={(row) => row.promotionId}
              />
            </Box>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={!!selectedDeleteId} onClose={cancelDelete}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this promotion?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete}>Cancel</Button>
            <Button color="error" onClick={confirmDelete}>Delete</Button>
          </DialogActions>
        </Dialog>

        {/* Create/Edit Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {dialogMode === "create" ? "Create New Promotion" : "Edit Promotion"}
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              <TextField
                  label="Name"
                  name="name"
                  value={selectedPromotion?.name || ""}
                  onChange={handleInputChange}
                  fullWidth
              />
              <TextField
                  label="Description"
                  name="description"
                  value={selectedPromotion?.description || ""}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={3}
              />
              <TextField
                  label="Discount Percentage"
                  name="discountPercentage"
                  type="number"
                  value={selectedPromotion?.discountPercentage || ""}
                  onChange={handleInputChange}
                  fullWidth
                  InputProps={{
                    inputProps: { min: 0, max: 100 }
                  }}
              />
              <TextField
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={selectedPromotion?.startDate || ""}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
              />
              <TextField
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={selectedPromotion?.endDate || ""}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} color="primary" variant="contained">
              {dialogMode === "create" ? "Create" : "Update"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
};

export default PromotionManager;
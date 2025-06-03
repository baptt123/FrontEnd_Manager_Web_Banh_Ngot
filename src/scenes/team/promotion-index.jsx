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
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import {
  getPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from "../../api/storePromotionAPI.js";

const PromotionManager = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    discountAmount: "",
    startDate: "",
    endDate: "",
    minPurchaseAmount: "",
    maxUsage: "",
  });

  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const data = await getPromotions();
      setPromotions(data);
    } catch (error) {
      console.error("Failed to fetch promotions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleOpenCreate = () => {
    setEditingPromotion(null);
    setFormData({
      code: "",
      description: "",
      discountAmount: "",
      startDate: "",
      endDate: "",
      minPurchaseAmount: "",
      maxUsage: "",
    });
    setOpenDialog(true);
  };

  const handleOpenEdit = (promotion) => {
    setEditingPromotion(promotion);
    setFormData({
      code: promotion.code,
      description: promotion.description || "",
      discountAmount: promotion.discountAmount || "",
      startDate: promotion.startDate?.split("T")[0] || "",
      endDate: promotion.endDate?.split("T")[0] || "",
      minPurchaseAmount: promotion.minPurchaseAmount || "",
      maxUsage: promotion.maxUsage || "",
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      if (editingPromotion) {
        const updated = await updatePromotion(editingPromotion.promotionId, formData);
        setPromotions((prev) =>
          prev.map((promo) =>
            promo.promotionId === updated.promotionId ? updated : promo
          )
        );
      } else {
        const created = await createPromotion(formData);
        setPromotions((prev) => [...prev, created]);
      }
      setOpenDialog(false);
    } catch (error) {
      console.error("Failed to save promotion:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePromotion(id);
      setPromotions((prev) => prev.filter((promo) => promo.promotionId !== id));
    } catch (error) {
      console.error("Failed to delete promotion:", error);
    }
  };

  const columns = [
    { field: "promotionId", headerName: "ID", width: 70 },
    {
      field: "code",
      headerName: "Code",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
    },
    {
      field: "discountAmount",
      headerName: "Discount Amount",
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "",
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "",
    },
    {
      field: "minPurchaseAmount",
      headerName: "Min Purchase",
      flex: 1,
    },
    {
      field: "maxUsage",
      headerName: "Max Usage",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      renderCell: ({ row }) => (
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleOpenEdit(row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(row.promotionId)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="PROMOTIONS" subtitle="Manage Promotion Codes" />
      <Button variant="contained" color="success" onClick={handleOpenCreate}>
        Add New Promotion
      </Button>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
          mt={2}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Box
          mt={2}
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-cell": { borderBottom: "none" },
            "& .name-column--cell": { color: colors.greenAccent[300] },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
            checkboxSelection
            rows={promotions}
            columns={columns}
            getRowId={(row) => row.promotionId}
          />
        </Box>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingPromotion ? "Edit Promotion" : "Add New Promotion"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            margin="dense"
            label="Discount Amount"
            name="discountAmount"
            type="number"
            value={formData.discountAmount}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            margin="dense"
            label="End Date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            margin="dense"
            label="Minimum Purchase Amount"
            name="minPurchaseAmount"
            type="number"
            value={formData.minPurchaseAmount}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Maximum Usage"
            name="maxUsage"
            type="number"
            value={formData.maxUsage}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editingPromotion ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PromotionManager;
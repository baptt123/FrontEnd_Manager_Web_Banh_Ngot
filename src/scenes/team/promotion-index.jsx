import React, { useEffect, useState } from "react";
import {
  Box,
  useTheme,
  Button,
  CircularProgress,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import {
  fetchAllPromotions,
  fetchPromotionById,
  deletePromotion,
} from "../../api/storePromotionAPI";

const PromotionManager = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

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

  const handleViewDetails = async (id) => {
    setDetailLoading(true);
    try {
      const data = await fetchPromotionById(id);
      setSelectedPromotion(data);
    } catch (error) {
      console.error("Failed to fetch promotion:", error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleDeletePromotion = async (id) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      try {
        await deletePromotion(id);
        loadPromotions();
      } catch (error) {
        console.error("Failed to delete promotion:", error);
      }
    }
  };

  const handleCloseDialog = () => setSelectedPromotion(null);

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
        <>
          <Button
            variant="contained"
            size="small"
            sx={{ mr: 1 }}
            onClick={() => handleViewDetails(row.promotionId)}
          >
            View
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDeletePromotion(row.promotionId)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="PROMOTIONS" subtitle="Manage Store Promotions" />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
        </Box>
      ) : (
        <Box height="75vh" mt={2}
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

      <Dialog open={!!selectedPromotion} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Promotion Details</DialogTitle>
        <DialogContent dividers>
          {detailLoading ? (
            <CircularProgress />
          ) : selectedPromotion ? (
            <>
              <Typography gutterBottom><strong>ID:</strong> {selectedPromotion.promotionId}</Typography>
              <Typography gutterBottom><strong>Name:</strong> {selectedPromotion.name}</Typography>
              <Typography gutterBottom><strong>Description:</strong> {selectedPromotion.description}</Typography>
              <Typography gutterBottom><strong>Discount:</strong> {selectedPromotion.discountPercentage}%</Typography>
              <Typography gutterBottom>
                <strong>Start:</strong> {new Date(selectedPromotion.startDate).toLocaleDateString()}
              </Typography>
              <Typography gutterBottom>
                <strong>End:</strong> {new Date(selectedPromotion.endDate).toLocaleDateString()}
              </Typography>
            </>
          ) : (
            <Typography>Promotion not found.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PromotionManager;

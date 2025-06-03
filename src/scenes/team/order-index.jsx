// src/pages/orders/OrderManager.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  CircularProgress,
  Button,
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
  fetchAllOrdersByStore,
  fetchOrderById,
} from "../../api/storeOrderAPI";

const OrderManager = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Fetch all orders when component mounts
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await fetchAllOrdersByStore();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (orderId) => {
    try {
      setDetailLoading(true);
      const data = await fetchOrderById(orderId);
      setSelectedOrder(data);
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCloseDialog = () => setSelectedOrder(null);

  const columns = [
    { field: "orderId", headerName: "Order ID", width: 100 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "paymentMethod", headerName: "Payment", flex: 1 },
    {
      field: "totalAmount",
      headerName: "Total (VND)",
      flex: 1,
      valueFormatter: ({ value }) => value.toLocaleString(),
    },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1.5,
      valueFormatter: ({ value }) => new Date(value).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: ({ row }) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleViewDetails(row.orderId)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="ORDERS" subtitle="Manage Customer Orders" />

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
          }}
        >
          <DataGrid
            rows={orders}
            columns={columns}
            getRowId={(row) => row.orderId}
          />
        </Box>
      )}

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent dividers>
          {detailLoading ? (
            <CircularProgress />
          ) : selectedOrder ? (
            <>
              <Typography gutterBottom><strong>Order ID:</strong> {selectedOrder.orderId}</Typography>
              <Typography gutterBottom><strong>Status:</strong> {selectedOrder.status}</Typography>
              <Typography gutterBottom><strong>Payment:</strong> {selectedOrder.paymentMethod}</Typography>
              <Typography gutterBottom>
                <strong>Total:</strong> {selectedOrder.totalAmount.toLocaleString()} VND
              </Typography>
              <Typography gutterBottom>
                <strong>Created At:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>Order Items:</Typography>
              <Box sx={{ pl: 2 }}>
                {selectedOrder.orderDetails?.map((item, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Typography>
                      - {item.productName} x{item.quantity} — {item.price.toLocaleString()} VND
                    </Typography>
                    {item.customization && (
                      <Typography sx={{ ml: 2, fontStyle: "italic" }}>
                        Custom: {item.customization}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </>
          ) : (
            <Typography>Order not found.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderManager;

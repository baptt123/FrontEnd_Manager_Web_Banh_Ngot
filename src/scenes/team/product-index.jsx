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
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/storeProductAPI";

const ProductManager = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    quantity: "",
    categoryId: "",
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      image: "",
      description: "",
      quantity: "",
      categoryId: "",
    });
    setOpenDialog(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image || "",
      description: product.description || "",
      quantity: product.quantity,
      categoryId: product.categoryId,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.productId, formData);
        setProducts((prev) =>
          prev.map((prod) =>
            prod.productId === updated.productId ? updated : prod
          )
        );
      } else {
        const created = await createProduct(formData);
        setProducts((prev) => [...prev, created]);
      }
      setOpenDialog(false);
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((prod) => prod.productId !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const columns = [
    { field: "productId", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "categoryId", headerName: "Category ID", flex: 1 },
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
            onClick={() => handleDelete(row.productId)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="PRODUCTS" subtitle="Manage Products" />
      <Button variant="contained" color="success" onClick={handleOpenCreate}>
        Add New Product
      </Button>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh" mt={2}>
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Box
          mt={2}
          height="75vh"
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
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
            rows={products}
            columns={columns}
            getRowId={(row) => row.productId}
            checkboxSelection
          />
        </Box>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
        <DialogContent>
          {["name", "price", "image", "description", "quantity", "categoryId"].map((field) => (
            <TextField
              key={field}
              margin="dense"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              fullWidth
              multiline={field === "description"}
              rows={field === "description" ? 4 : 1}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editingProduct ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManager;

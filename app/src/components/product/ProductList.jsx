import { Paper, Button, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const ProductList = ({ products, onEditProduct, onDeleteProduct }) => {
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });
console.log(products)
    const columns = [
        { field: "name", headerName: "Product Name", flex: 1 },
        {
            field: "price",
            headerName: "Price",
            width: 120,
            valueFormatter: (params) => {
              return params.value
            }
        },
        { field: "amount", headerName: "Amount", width: 120 },
        { field: "description", headerName: "Description", flex: 1.5 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <Button
                        size="small"
                        onClick={() => onEditProduct(params.row)}
                        variant="outlined"
                        color="primary"
                        startIcon={<EditIcon />}
                    />
                    <Button
                        size="small"
                        onClick={() => onDeleteProduct(params.row._id)}
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                    />
                </Stack>
            ),
        }
    ];

    const rows = products.map(product => ({
        id: product._id,
        _id: product._id,
        name: product.name || "",
        price: parseFloat(product.price) || 0,
        amount: typeof product.amount === 'number' ? product.amount : 0,
        description: product.description || ""
    }));

    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{ border: 0 }}
            />
        </Paper>
    );
};

export default ProductList;
// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     CircularProgress,
//     Typography,
//     TextField,
//     InputAdornment,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useNavigate } from "react-router-dom";
// import apiClient from "../Services/api"; // Ensure this is your configured axios instance
// import SearchIcon from '@mui/icons-material/Search';

// const MandatoryProducts = ({ serviceId }) => {
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [search, setSearch] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await apiClient.get(
//                     `/services/${serviceId}/mandatory-products`
//                 );
//                 const productsWithSrNo = response.data.map(
//                     (product, index) => ({
//                         ...product,
//                         srNo: index + 1,
//                     })
//                 );
//                 setProducts(productsWithSrNo);
//                 setFilteredProducts(productsWithSrNo);
//             } catch (error) {
//                 console.error("Error fetching mandatory products:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, [serviceId]);

//     const handleRowClick = (params) => {
//         navigate(`/products/${params.row.product_slug}`);
//     };

//     const handleSearch = (event) => {
//         setSearch(event.target.value);
//         if (event.target.value === "") {
//             setFilteredProducts(products);
//         } else {
//             setFilteredProducts(
//                 products.filter((product) =>
//                     product.product_name
//                         .toLowerCase()
//                         .includes(event.target.value.toLowerCase())
//                 )
//             );
//         }
//     };

//     const getColumns = () => {
//         const baseColumns = [
//             { field: "srNo", headerName: "Sr. No.", width: 70 },
//             { field: "product_name", headerName: "Product Name", flex: 1 },
//             {
//                 field: "product_category_name",
//                 headerName: "Category Name",
//                 flex: 1,
//             },
//         ];

//         const isStandardColumn = {
//             field: "product_is_standard",
//             headerName: "IS Standard",
//             flex: 1,
//         };
//         const groupColumn = {
//             field: "product_group",
//             headerName: "Group",
//             flex: 1,
//         };
//         const schemeColumn = {
//             field: "product_scheme",
//             headerName: "Scheme",
//             flex: 1,
//         };

//         if (filteredProducts.length > 0) {
//             const firstProduct = filteredProducts[0];
//             if (firstProduct.service_compliance === "Indian Standard") {
//                 return [...baseColumns, isStandardColumn];
//             } else if (firstProduct.service_compliance === "Group, Scheme") {
//                 return [...baseColumns, groupColumn, schemeColumn];
//             }
//         }

//         return baseColumns;
//     };

//     if (loading) {
//         return (
//             <Box
//                 sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     height: "100vh",
//                 }}
//             >
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     return (
//         <Box sx={{ width: "100%" }}>
//           <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'} marginBlock={3}>
//             {/* <Typography variant="h6" gutterBottom>
//         Mandatory Products
//       </Typography> */}
//             <TextField
//                 variant="outlined"
//                 placeholder="Enter the IS & Product Name"
//                 value={search}
//                 onChange={handleSearch}
//                 sx={{
//                     backgroundColor: "white",
//                     borderRadius: "5px",
//                    width: { xs: "100%", md: "60%" }
//                 }}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <SearchIcon color="action" />
//                     </InputAdornment>
//                   ),
//                 }}
//             />
// </Box>
//             <DataGrid
//            className="mandatory-product"
//                 rows={filteredProducts}
//                 color="primary"
//                 backgroundColor="#c3e7ff"
//                 columns={getColumns()}
//                 pageSize={25}
//                 rowsPerPageOptions={[25]}
//                 pagination
//                 onRowClick={handleRowClick}
//                 getRowId={(row) => row.product_slug} // Ensure unique row ID
//                 initialState={{
//                     pagination: { paginationModel: { pageSize: 25 } },
//                     sorting: {
//                         sortModel: [{ field: "category_id", sort: "asc" }],
//                     },
//                 }}
//             />
//         </Box>
//     );
// };

// export default MandatoryProducts;

import React, { useState, useEffect } from "react";
import {
    Box,
    CircularProgress,
    Typography,
    TextField,
    InputAdornment,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import apiClient from "../Services/api"; // Ensure this is your configured axios instance
import SearchIcon from "@mui/icons-material/Search";

const MandatoryProducts = ({ serviceId }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get(
                    `/services/${serviceId}/mandatory-products`
                );
                const productsWithSrNo = response.data.map(
                    (product, index) => ({
                        ...product,
                        srNo: index + 1,
                    })
                );
                setProducts(productsWithSrNo);
                setFilteredProducts(productsWithSrNo);
            } catch (error) {
                console.error("Error fetching mandatory products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [serviceId]);

    const handleRowClick = (params) => {
        navigate(`/products/${params.row.product_slug}`);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value === "") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter((product) =>
                    product.product_name
                        .toLowerCase()
                        .includes(event.target.value.toLowerCase())
                )
            );
        }
    };

    const getColumns = () => {
        const baseColumns = [
            { field: "srNo", headerName: "Sr. No.", width: 70 },
            { field: "product_name", headerName: "Product Name", flex: 1 },
            {
                field: "product_category_name",
                headerName: "Category Name",
                flex: 1,
            },
        ];

        const isStandardColumn = {
            field: "product_is_standard",
            headerName: "IS Standard",
            flex: 1,
        };
        const groupColumn = {
            field: "product_group",
            headerName: "Group",
            flex: 1,
        };
        const schemeColumn = {
            field: "product_scheme",
            headerName: "Scheme",
            flex: 1,
        };

        if (filteredProducts.length > 0) {
            const firstProduct = filteredProducts[0];
            if (firstProduct.service_compliance === "Indian Standard") {
                return [...baseColumns, isStandardColumn];
            } else if (firstProduct.service_compliance === "Group, Scheme") {
                return [...baseColumns, groupColumn, schemeColumn];
            }
        }

        return baseColumns;
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                marginBlock={3}
            >
                <TextField
                    variant="outlined"
                    placeholder="Enter the IS & Product Name"
                    value={search}
                    onChange={handleSearch}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                        width: { xs: "100%", md: "60%" },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <div style={{ width: "100%", marginBottom: 20 }}>
                <DataGrid
                    className="mandatory-product"
                    rows={filteredProducts}
                    columns={getColumns()}
                    pageSize={25}
                    rowsPerPageOptions={[25]}
                    pagination
                    onRowClick={handleRowClick}
                    getRowId={(row) => row.product_slug} // Ensure unique row ID
                    autoHeight
                />
            </div>
        </Box>
    );
};

export default MandatoryProducts;


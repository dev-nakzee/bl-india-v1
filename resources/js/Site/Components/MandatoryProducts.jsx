import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
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
        const productsWithSrNo = response.data.map((product, index) => ({
          ...product,
          srNo: index + 1,
          service_id: serviceId, // Add serviceId to the product data
        }));
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

  const handleRowClick = (params, event) => {
    localStorage.setItem("serviceId", params.row.service_id);
    const url = `/products/${params.row.product_slug}`;
    if (event.ctrlKey || event.metaKey) {
      window.open(url, "_blank");
    } else {
      navigate(url);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const lowerCaseQuery = event.target.value.toLowerCase();
    if (lowerCaseQuery === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          Object.keys(product).some((key) =>
            String(product[key]).toLowerCase().includes(lowerCaseQuery)
          )
        )
      );
    }
  };
  

  const getColumns = () => {
    const baseColumns = [
      {
        field: "srNo",
        headerName: "Sr. No.",
        width: 150,
        renderCell: (params) => (
          <Box sx={{ pl: 1, py: 2, pr: 2 }}>{params.value}</Box>
        ),
      },
      {
        field: "product_name",
        headerName: "Product Name",
        flex: 1,
        minWidth: 170,
        renderCell: (params) => (
          <Box sx={{ whiteSpace: "pre-line", pl: 1, py: 2, pr: 2 }}>
            {params.value}
          </Box>
        ),
      },
      {
        field: "product_category_names",
        headerName: "Category Names",
        flex: 1,
        minWidth: 170,
        renderCell: (params) => (
          <Box sx={{ whiteSpace: "pre-line", pl: 1, py: 2, pr: 2 }}>
            {params.value.join(", ")}
          </Box>
        ),
      },
    ];

    const isStandardColumn = {
      field: "product_is_standard",
      headerName: "IS Standard",
      flex: 1,
      minWidth: 170,
      renderCell: (params) => (
        <Box sx={{ whiteSpace: "pre-line", pl: 1, py: 2, pr: 2 }}>
          {params.value}
        </Box>
      ),
    };
    const groupColumn = {
      field: "product_group",
      headerName: "Group",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Box sx={{ whiteSpace: "pre-line", pl: 1, py: 2, pr: 2 }}>
          {params.value}
        </Box>
      ),
    };
    const schemeColumn = {
      field: "product_scheme",
      headerName: "Scheme",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Box sx={{ whiteSpace: "pre-line", pl: 1, py: 2, pr: 2 }}>
          {params.value}
        </Box>
      ),
    };
    const eeeCodeColumn = {
      field: "product_others",
      headerName: "EEE Code",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Box sx={{ whiteSpace: "pre-line", pl: 1, py: 2, pr: 2 }}>
          {params.value}
        </Box>
      ),
    };

    if (filteredProducts.length > 0) {
      const firstProduct = filteredProducts[0];
      if (firstProduct.service_compliance === "Indian Standard") {
        return [...baseColumns, isStandardColumn];
      } else if (firstProduct.service_compliance === "Group, Scheme") {
        return [...baseColumns, groupColumn, schemeColumn];
      } else if (firstProduct.service_compliance === "EEE Code") {
        return [...baseColumns, eeeCodeColumn];
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
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Box
        display="flex"
        justifyContent={isSmallScreen ? "center" : "flex-end"}
        alignItems="center"
        marginBlock={3}
        sx={{ width: isSmallScreen ? "100%" : "auto" }}
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
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25, page: 0 },
            },
          }}
          pageSizeOptions={[25, 50, 100]}
          pagination
          onRowClick={handleRowClick}
          getRowId={(row) => row.product_slug} // Ensure unique row ID
          autoHeight
          getRowHeight={() => "auto"}
        />
      </div>
    </Box>
  );
};

export default MandatoryProducts;

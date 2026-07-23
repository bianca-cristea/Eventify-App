import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Button,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { FiArrowUp, FiArrowDown, FiRefreshCcw, FiSearch } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({ categories }) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortOrder") || "asc";
    const currentKeyword = searchParams.get("keyword") || "";

    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSearchTerm(currentKeyword);
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        searchParams.set("keyword", searchTerm);
      } else {
        searchParams.delete("keyword");
      }
      navigate(`${pathname}?${searchParams.toString()}`);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;

    if (selectedCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", selectedCategory);
    }

    navigate(`${pathname}?${params.toString()}`);
    setCategory(selectedCategory);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => {
      const newOrder = prev === "asc" ? "desc" : "asc";
      params.set("sortOrder", newOrder);
      navigate(`${pathname}?${params.toString()}`);
      return newOrder;
    });
  };

  const handleClearFilters = () => {
    navigate(pathname);
    setSearchTerm("");
    setCategory("all");
    setSortOrder("asc");
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
      <div className="relative flex items-center w-full max-w-md">
        <FiSearch className="absolute left-3 text-gray-400" size={18} />

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg py-2 pl-10 pr-4
                     focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <FormControl variant="outlined" size="small" className="min-w-[160]">
          <InputLabel id="category-select-label" className="text-white/60">
            Category
          </InputLabel>

          <Select
            labelId="category-select-label"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            displayEmpty
            renderValue={(selected) => (
              <span className="text-white font-medium tracking-wide">
                {selected === "all" ? "All Categories" : selected}
              </span>
            )}
            className="bg-transparent backdrop-blur-md rounded-lg"
            sx={{
              color: "white",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.12)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(99,102,241,0.6)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#6366f1",
              },
              ".MuiSvgIcon-root": {
                color: "white",
              },
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  background: "#0b1020",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.1)",
                },
              },
            }}
          >
            <MenuItem value="all">All</MenuItem>

            {categories.map((item) => (
              <MenuItem
                key={item.categoryId}
                value={item.categoryName}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(99,102,241,0.25)",
                  },
                }}
              >
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Tooltip
          title={
            sortOrder === "asc" ? "Price: Low → High" : "Price: High → Low"
          }
        >
          <Button
            variant="contained"
            onClick={toggleSortOrder}
            className="flex items-center gap-2 h-10 normal-case shadow-md hover:shadow-lg transition"
            style={{
              backgroundColor: sortOrder === "asc" ? "#1976d2" : "#9c27b0",
            }}
          >
            Sort
            {sortOrder === "asc" ? (
              <FiArrowUp size={18} />
            ) : (
              <FiArrowDown size={18} />
            )}
          </Button>
        </Tooltip>

        <button
          onClick={handleClearFilters}
          className="flex items-center gap-2 px-3 py-2 rounded-md
                     bg-red-600 hover:bg-red-700 text-white
                     shadow-md hover:shadow-lg transition"
        >
          <FiRefreshCcw size={18} />
          Clear
        </button>
      </div>
    </div>
  );
};

export default Filter;

import { Pagination } from "@mui/material";
import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Paginations = ({ numberOfPage, totalEvents }) => {
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();
  const paramValue = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const onChangeHandler = (event, value) => {
    params.set("page", value.toString());
    navigate(`${pathname}?${params}`);
  };

  return (
    <Pagination
      count={numberOfPage}
      page={paramValue}
      defaultPage={0}
      siblingCount={0}
      boundaryCount={2}
      shape="rounded"
      onChange={onChangeHandler}
      sx={{
        "& .MuiPaginationItem-root": {
          color: "white",
          borderColor: "rgba(255,255,255,0.2)",
        },
        "& .Mui-selected": {
          backgroundColor: "#4f46e5 !important",
          color: "white",
        },
        "& .MuiPaginationItem-root:hover": {
          backgroundColor: "rgba(255,255,255,0.1)",
        },
      }}
    />
  );
};

export default Paginations;

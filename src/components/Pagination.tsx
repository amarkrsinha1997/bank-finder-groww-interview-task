import React from "react";
import styled from "styled-components";
import { usePaginationContext } from "../context/PaginationContext";

const Container = styled.nav`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Box = styled.button`
  border: 1px solid #ddd;
  padding: 5px;
  cursor: pointer;
  opacity: 0.8;
  ${(props) => (props.selected ? "background: white;" : "")}
  :hover {
    opacity: 1;
  }
`;

export const Pagination = () => {
  const paginationContext = usePaginationContext();
  const middlePage =
    paginationContext.currentPage < paginationContext.totalPage - 2
      ? [paginationContext.currentPage + 1]
      : [paginationContext.totalPage - 1];
  return (
    <Container>
      <Box type="button" onClick={paginationContext.prevPage}>
        {"<<"} Prev
      </Box>
      {paginationContext.totalPage === 0 ? null : (
        <React.Fragment>
          {[
            ...(paginationContext.currentPage === 1 ||
            paginationContext.currentPage > paginationContext.totalPage - 2
              ? [1]
              : [1, paginationContext.currentPage]),
            ...middlePage,
            paginationContext.totalPage
          ].map((pageNum) => (
            <Box
              type="button"
              key={pageNum}
              selected={paginationContext.currentPage === pageNum}
              onClick={() => paginationContext.goToPage(pageNum)}
            >
              {pageNum}
            </Box>
          ))}
        </React.Fragment>
      )}

      <Box type="button" onClick={paginationContext.nextPage}>
        Next {">>"}
      </Box>
    </Container>
  );
};

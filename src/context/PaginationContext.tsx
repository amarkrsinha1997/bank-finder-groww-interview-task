import React from "react";
import {
  IPaginationProviderProps,
  IPaginaition,
  IPaginationContextProps
} from "../models";
import { bankPerPage } from "../config";

export const PaginationContext = (perPage: number): IPaginaition => {
  const Context = React.createContext({} as IPaginationContextProps);

  const PaginationProvider = (props: IPaginationProviderProps): JSX.Element => {
    const [pageNumber, setPageNumber] = React.useState(props.page || 1);
    const [totalPage, setTotalPage] = React.useState(1);

    const nextPage = () => {
      console.log(totalPage, pageNumber);
      if (totalPage === pageNumber || totalPage === 0) {
        return;
      }
      setPageNumber((prevPageNum) => ++prevPageNum);
    };

    const prevPage = () => {
      if (pageNumber === 1 || pageNumber === 0) {
        return;
      }
      setPageNumber((prevPageNum) => --prevPageNum);
    };
    const goToPage = (pageNumber: number) => {
      if (pageNumber > totalPage) {
        return;
      }
      setPageNumber(pageNumber);
    };

    const getCurrentPageData = () => {
      const startPageIndex = (pageNumber - 1 - 1) * perPage;
      const endPageIndex = perPage * (pageNumber - 1) - 1;
      return props.value.slice(startPageIndex, endPageIndex);
    };

    React.useEffect(() => {
      const totalPages = Math.floor(props.value.length / perPage);
      setTotalPage(totalPages);
      setPageNumber(1);
    }, [props.value]);

    return (
      <React.Fragment>
        <Context.Provider
          value={{
            nextPage,
            prevPage,
            goToPage,
            currentPage: pageNumber,
            totalPage,
            list: getCurrentPageData()
          }}
        >
          {props.children}
        </Context.Provider>
      </React.Fragment>
    );
  };
  const usePaginationContext = (): IPaginationContextProps => {
    const context = React.useContext(Context);
    return context;
  };

  return { PaginationProvider, usePaginationContext };
};

const { PaginationProvider, usePaginationContext } = PaginationContext(
  bankPerPage
);
export { PaginationProvider, usePaginationContext };

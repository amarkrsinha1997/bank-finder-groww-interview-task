import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
import styled from "styled-components";
import { links } from "./config";
import { AllBanks } from "./screen/AllBanks";
import { BankDetails } from "./screen/BankDetails";

const Main = styled.div`
  display: flex;
  min-height: 100%;
  margin: 20px;
  @media only screen and (max-width: 720px) {
    flex-direction: column;
  }
`;

// TODO: for mobile;
const Menu = styled.nav`
  margin-top: 20px;
  padding: 10px;
  min-width: 150px;
  @media only screen and (max-width: 720px) {
    min-width: 100%;
  }
`;

const LinkBox = styled(Link)`
  font-size: 15px;
  text-align: center;
  border: 1px solid green;
  padding: 15px 30px;
  border-radius: 3px;
  margin-bottom: 3px;
  background: #00d09c;
  color: #eef;
  opacity: 0.9;
  text-decoration: none;
  :hover {
    color: white;
    background: #00d0a8;
  }
`;

export default function App() {
  return (
    <Router>
      <Main>
        <Menu>
          {links.map((link) => {
            return (
              <LinkBox key={link.link} to={link.link}>
                {link.name}
              </LinkBox>
            );
          })}
        </Menu>
        <Switch>
          <Route exact path="/">
            <Redirect to="/all-banks" />
          </Route>
          <Route path="/all-banks">
            <AllBanks />
          </Route>
          <Route path="/bank-details/:ifscCode">
            <BankDetails />
          </Route>
          <Route path="*">{/* <NoMatch /> */}</Route>
        </Switch>
      </Main>
    </Router>
  );
}

/**
 * TODO:
 * -Favaurite
 * -Pagination Negative
 * -Bank Detail Page
 * -NotFound/Error/Loading
 *
 * Notes:
 * - Config - Cities, CacheDuration, Pagination, Category
 *
 * - 5 cites - MUMBAI, BANGALORE, DELHI, PUNE, HYDERABAD
 *
 * - Search Category - bankName, ifscCode
 * - SearchBar - using debounce on typing (500ms) & Alphanumeric
 *
 * - Routes
 *      A. /all-banks => This route will house the Bank List component and the
 *         filter/search logic
 *      B. /bank-details/{ifsc_code} => This route will display details of an
 *         individual bank with corresponding ifsc_code
 *      C. /favorites => That contains the list of all the favorite banks. Allow the user
 *         to unmark them as well.
 *
 * - Rows should take to the bank details page on click
 *
 * - Default
 *    - Should render without any filter.
 *    - Should Pick one of the cities.
 *
 * - Pagination System by default 10
 *   const [Producer, usePaginatedList] = PaginationContext
 *   const [data, nextPage(), prevPage()] = usePaginatedList(data, perPage)
 *
 * - Caching API response in localStorage & setInterval function
 *
 * - Basic Error - Going to another page
 * - Loading - city, navigation, search bar
 * - Not Found - City, Search Bar, Favorite
 *
 * - Deploy to Netlify
 *
 */

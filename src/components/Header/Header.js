import React from "react";
import styles from "../../common/styles/Headers.module.scss";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import axios from "axios";
import { loadProducts } from "../../redux/productsSlice";
import { useDispatch } from "react-redux";

function Header(props) {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(window.localStorage.getItem("user"));
  const getProuctsFromAPI = async () => {
    try {
      const response = await axios.get("http://localhost:9000/products");
      dispatch(loadProducts(response.data));
    } catch (error) {
      console.error("Error loading products", error);
    }
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.signedUserInfo}>
        <Typography sx={{ m: 2 }} variant="h5">
          Zalogowany:{" "}
          {`${currentUser.userfirstName} ${currentUser.userLastName}`}
        </Typography>
        <Button variant="contained" onClick={() => getProuctsFromAPI()}>
          Załaduj produkty
        </Button>
        <Link to="/">
          <Button variant="contained" color="error">
            Wyloguj
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;

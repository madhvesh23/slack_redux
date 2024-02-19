import React, { useEffect } from "react";
import { Button } from "semantic-ui-react";
import { logout } from "../../Firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleLogout = async () => {
      await logout(dispatch);
      navigate("/login");
    };

  return (
      <Button color="violet" onClick={handleLogout} fluid type="submit">
      Logout
    </Button>
  );
}

export default Logout;

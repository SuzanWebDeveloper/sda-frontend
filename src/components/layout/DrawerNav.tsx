import React, { useState } from "react"
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import MenuIcon from "@mui/icons-material/Menu"
import { Link } from "react-router-dom"
import useUsersState from "@/hook/useUsersState"

const DrawerNav = () => {
  const [openDrawer, setOpenDrawer] = useState(false)

  const { isLoggedIn, userData } = useUsersState()

  return (
    <div>
      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box
          sx={{
            pt: 2,
            // height: 1,
            backgroundColor: "ffffff",
            width: "200px"
          }}
        >
          <List>
            <Box textAlign="left" sx={{ pl: "1.2rem" }}>
              <IconButton aria-label="close" sx={{ mb: 1 }} onClick={() => setOpenDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 1 }} />
            {isLoggedIn && (
              <>
                <Link
                  to={`/dashboard/${userData && userData.role == "admin" ? "admin" : "user"}`}
                  className="custom-link"
                >
                  <ListItemButton onClick={() => setOpenDrawer(false)}>
                    <ListItemIcon>
                      <ListItemText sx={{ pl: "1rem" }}>
                        {userData && userData.role == "admin" ? "Admin Dashboard" : "My Account"}
                      </ListItemText>
                    </ListItemIcon>
                  </ListItemButton>
                </Link>
                <Divider sx={{ mb: 1, mt: 1 }} />
              </>
            )}
            {/* {!isLoggedIn && (
              <>
                <Link className="nav__link" to="/login">
                  <button>Login</button>
                </Link>
              </>
            )} */}

            <Link to="/" className="custom-link">
              <ListItemButton onClick={() => setOpenDrawer(false)}>
                <ListItemIcon>
                  <ListItemText sx={{ pl: "1rem" }}>Home</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </Link>

            <Link to="/products" className="custom-link">
              <ListItemButton onClick={() => setOpenDrawer(false)}>
                <ListItemIcon>
                  <ListItemText sx={{ pl: "1rem" }}>Products</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </Link>

            <Link to="/about" className="custom-link">
              <ListItemButton onClick={() => setOpenDrawer(false)}>
                <ListItemIcon>
                  <ListItemText sx={{ pl: "1rem" }}>About</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </Link>
          </List>
        </Box>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </div>
  )
}

export default DrawerNav

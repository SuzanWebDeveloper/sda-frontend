// import { RootState } from "@/toolkit/store"
// import { useSelector } from "react-redux"
// import { Link } from "react-router-dom"

// const AdminSidebar = () => {
//   //get user data from the store
//   const { userData } = useSelector((state: RootState) => state.userR)

//   return (
//     <aside className="sidebar-container">
//       <div>
//         <h3>Dashboard</h3>

//         <p>Admin: {userData?.name}</p>
//         <hr></hr>
//         <br />
//         {/* <p>{userData?.email}</p> */}
//       </div>
//       <ul>
//         <li>
//           <Link to="/dashboard/admin/categories">Categories</Link>
//         </li>
//         <li>
//           <Link to="/dashboard/admin/products">Products</Link>
//         </li>
//         <li>
//           <Link to="/dashboard/admin/users">Users</Link>
//         </li>
//         <li>
//           <Link to="/dashboard/admin/orders">Orders</Link>
//         </li>
//       </ul>
//     </aside>
//   )
// }

// export default AdminSidebar

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles"
import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import CssBaseline from "@mui/material/CssBaseline"
import IconButton from "@mui/material/IconButton"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import DashboardIcon from "@mui/icons-material/Dashboard"
import PersonIcon from "@mui/icons-material/Person"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/toolkit/store"
import GroupIcon from "@mui/icons-material/Group"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import CategoryIcon from "@mui/icons-material/Category"

import { toggleOpen } from "@/toolkit/slices/miniDrawerSlice"

const drawerWidth = 185

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme)
    })
  })
)

const AdminSidebar = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const dispatch: AppDispatch = useDispatch()

  const { open } = useSelector((state: RootState) => state.miniDrawerR)

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={() => dispatch(toggleOpen())}>
              {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>

          {/* <Divider /> */}

          <List sx={{ mt: "22px" }}>
            <Link to="/dashboard/admin" className="mini-drawer-custom-link">
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center"
                    }}
                  >
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to="/dashboard/admin/categories" className="mini-drawer-custom-link">
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center"
                    }}
                  >
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Categories" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/dashboard/admin/products")
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center"
                  }}
                >
                  <Inventory2Icon />
                </ListItemIcon>
                <ListItemText primary="Products" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <Link to="/dashboard/admin/users" className="mini-drawer-custom-link">
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center"
                    }}
                  >
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to="/dashboard/admin/orders" className="mini-drawer-custom-link">
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3.2 : "auto",
                      justifyContent: "center",
                      ml: "3px"
                    }}
                  >
                    <i className="fa-solid fa-box fa-lg"></i>
                  </ListItemIcon>
                  <ListItemText primary="Orders" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Drawer>
      </Box>
    </>
  )
}
export default AdminSidebar

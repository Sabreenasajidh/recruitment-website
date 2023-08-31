import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import MenuItemComponent from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './MainPage.css'
import logo from "../Header/pearl-island-logo.jpg"

function MainPage() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    function handleClick(event) {
        if (anchorEl !== event.currentTarget) {
            console.log("ooooooooo");
            setAnchorEl(event.currentTarget);
        }
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const menuClick = (e) => {

        console.log(e.currentTarget);
        //e.target.innerText)
    };

    const menus = ["profile", "items", "cart"];

    // const Menu = () => {
       // const [openedItem, setOpenedItem] = React.useState("") // here you can set some menu item so it can be opened by default

        const handleMenuItemOpen = (itemId) => {
            //setOpenedItem(itemId)
        }

        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ background: 'darkblue' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <img src={logo} alt="logo" className="logoS" />
                        </Typography>
                        <Button
                            color="inherit"
                            aria-owns={anchorEl ? "simple-menu" : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                            onMouseOver={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            Assets
                        </Button>
                        <Menu>
                            {/* {menus.map(menuItem => (
                                <MenuItemComponent
                                    // isOpened={openedItem === menuItem}
                                    // handleOpen={() => setOpenedItem(menuItem)}
                                >
                                    {menuItem}
                                </MenuItemComponent>
                            ))} */}
                        </Menu>
                    </Toolbar>
                </AppBar>
            </Box>

        )
    

    // return (

    //     <Box sx={{ flexGrow: 1 }}>
    //         <AppBar position="static" style={{ background: 'darkblue' }}>
    //             <Toolbar>
    //                 <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    //                     <img src={logo} alt="logo" className="logoS" />
    //                 </Typography>
    //                 <div class="dropdown-divider">
    //                     <Button
    //                         color="inherit"
    //                         aria-owns={anchorEl ? "simple-menu" : undefined}
    //                         aria-haspopup="true"
    //                         onClick={handleClick}
    //                         onMouseOver={handleClick}
    //                         endIcon={<KeyboardArrowDownIcon />}
    //                     >
    //                         Assets
    //                     </Button>
    //                     <Menu
    //                         id="simple-menu"
    //                         anchorEl={anchorEl}
    //                         open={Boolean(anchorEl)}
    //                         onClose={handleClose}
    //                         MenuListProps={{ onMouseLeave: handleClose }}
    //                     >
    //                         <MenuItem
    //                             className="menuItem"
    //                             onClick={menuClick}
    //                         // onMouseEnter={(e) => e.target.style.color = 'green'}
    //                         // onMouseLeave={(e) => e.target.style.color = 'black'}
    //                         >
    //                             Client
    //                         </MenuItem>
    //                         <MenuItem
    //                             className="menuItem"
    //                             onClick={menuClick}
    //                         // onMouseEnter={(e) => e.target.style.color = 'green'}
    //                         // onMouseLeave={(e) => e.target.style.color = 'black'}
    //                         >
    //                             Candidates
    //                         </MenuItem>
    //                     </Menu>

    //                 </div>


    //                 {/* <Button
    //                     color="inherit"
    //                     aria-owns={anchorEl ? "simple-menu" : undefined}
    //                     aria-haspopup="true"
    //                     onClick={handleClick}
    //                     onMouseOver={handleClick}
    //                     endIcon={<KeyboardArrowDownIcon />}
    //                 >
    //                     Recruitments
    //                 </Button>
    //                 <Menu
    //                     id="simple-menu"
    //                     anchorEl={anchorEl}
    //                     open={Boolean(anchorEl)}
    //                     onClose={handleClose}
    //                     MenuListProps={{ onMouseLeave: handleClose }}
    //                 >
    //                     <MenuItem
    //                         className="menuItem"
    //                         onClick={menuClick}
    //                         // onMouseEnter={(e) => e.target.style.color = 'green'}
    //                         // onMouseLeave={(e) => e.target.style.color = 'black'}
    //                     >
    //                         Recruitment
    //                     </MenuItem>
    //                     <MenuItem
    //                     className="menuItem"
    //                         onClick={menuClick}
    //                         // onMouseEnter={(e) => e.target.style.color = 'green'}
    //                         // onMouseLeave={(e) => e.target.style.color = 'black'}
    //                     >
    //                         Agreement
    //                     </MenuItem>
    //                 </Menu> */}
    //                 <div class="dropdown-divider">
    //                     <Button color="inherit"
    //                         className="btn"
    //                         endIcon={<KeyboardArrowDownIcon />}
    //                         // aria-controls={open ? 'basic-menu' : undefined}
    //                         // aria-haspopup="true"
    //                         // aria-expanded={open ? 'true' : undefined}
    //                         onClick={handleClick}
    //                         onMouseOver={handleClick}
    //                     >Recruitments
    //                     </Button>
    //                     <Menu
    //                         id="basic-menu"
    //                         anchorEl={anchorEl}
    //                         // open={open}
    //                         onClose={handleClose}
    //                         MenuListProps={{
    //                             'aria-labelledby': 'basic-button',
    //                         }}
    //                     >
    //                         <MenuItem onClick={menuClick}>Recruitment</MenuItem>
    //                         <MenuItem onClick={menuClick}>Agreement</MenuItem>
    //                     </Menu>
    //                 </div>
    //             </Toolbar>
    //         </AppBar>
    //     </Box>
    //     //     <Box sx={{ flexGrow: 1 }}>
    //     //     <AppBar className="appbar">
    //     //       <Toolbar>
    //     //       <img src={logo} alt="logo" className="logoS" />
    //     //       <Box sx={{ flexGrow: 1 }}>
    //     //       <Button
    //     //         id="basic-button"
    //     //         className= "btn"
    //     //         align="right"
    //     //         // aria-controls={open ? 'basic-menu' : undefined}
    //     //         // aria-haspopup="true"
    //     //         // aria-expanded={open ? 'true' : undefined}
    //     //         // onClick={handleClick}
    //     //       >
    //     //         Assests
    //     //       </Button>
    //     //       </Box>
    //     //       <Menu
    //     //         id="basic-menu"
    //     //         // anchorEl={anchorEl}
    //     //         // open={open}
    //     //         // onClose={handleClose}
    //     //         // MenuListProps={{
    //     //         //   'aria-labelledby': 'basic-button',
    //     //         // }}
    //     //       >
    //     //         <MenuItem>Profile</MenuItem>
    //     //         <MenuItem>My account</MenuItem>
    //     //         <MenuItem>Logout</MenuItem>
    //     //       </Menu>
    //     //       </Toolbar>
    //     //     </AppBar>
    //     //   </Box>
    // )
}

export default MainPage
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { DeliveryDining } from "@mui/icons-material";


const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box
            sx={{
                "& .pro-sidebar": {
                    width: isCollapsed ? "80px !important" : "250px !important", // Điều chỉnh chiều rộng
                    minWidth: isCollapsed ? "80px !important" : "250px !important", // Thêm minWidth
                },
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                    height: "100vh !important", // Đảm bảo chiều cao 100%
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                    margin: "5px 0", // Thêm margin giữa các items
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
                // Thêm style cho Typography trong MenuItem
                "& .pro-menu-item .MuiTypography-root": {
                    fontSize: "14px", // Điều chỉnh kích thước chữ
                    marginLeft: "10px", // Thêm khoảng cách với icon
                },
                // Style cho icons
                "& .pro-menu-item svg": {
                    width: "20px", // Điều chỉnh kích thước icon
                    height: "20px",
                },
                // Style cho section headers
                "& .section-header": {
                    fontSize: "12px", // Điều chỉnh kích thước chữ cho headers
                    marginTop: "15px",
                    marginBottom: "5px",
                    paddingLeft: "20px",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    ADMIN
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`../../assets/user.png`}
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        border: `2px solid ${colors.grey[100]}` // Thêm border cho avatar
                                    }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{
                                        m: "10px 0 0 0",
                                        fontSize: "20px" // Điều chỉnh kích thước chữ
                                    }}
                                >
                                    Ed Roh
                                </Typography>
                                <Typography
                                    variant="h5"
                                    color={colors.greenAccent[500]}
                                    sx={{
                                        fontSize: "14px" // Điều chỉnh kích thước chữ
                                    }}
                                >
                                    VP Fancy Admin
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            className="section-header"
                        >
                            Data
                        </Typography>

                        <Item
                            title="Quản lý danh mục"
                            to="/category-manager"
                            icon={<ContactsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                         <Item
                            title="Quản lý khuyến mãi"
                            to="/promotion-manager"
                            icon={<ContactsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Quản lý sản phẩm"
                            to="/product-manager"
                            icon={<DeliveryDining />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Quản lí người dùng"
                            to="/user-manager"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                      
                        <Item
                            title="Quản lí đơn hàng"
                            to="/order-manager"
                            icon={<ReceiptOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            className="section-header"
                        >
                            Pages
                        </Typography>
                        <Item
                            title="Profile"
                            to="/form"
                            icon={<PersonOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="FAQ Page"
                            to="/faq"
                            icon={<HelpOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            className="section-header"
                        >
                            Doanh thu
                        </Typography>
                        <Item
                            title="Biểu đồ cột"
                            to="/bar"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Biểu đồ tròn"
                            to="/pie"
                            icon={<PieChartOutlineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Biểu đồ đường"
                            to="/line"
                            icon={<TimelineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

// Cập nhật component Item
const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography
                sx={{
                    fontSize: "14px", // Điều chỉnh kích thước chữ
                    fontWeight: selected === title ? "bold" : "normal" // Thêm bold cho item được chọn
                }}
            >
                {title}
            </Typography>
            <Link to={to} />
        </MenuItem>
    );
};
export default Sidebar;
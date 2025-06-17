import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import axios from "axios";
import { tokens } from "../../theme";
import {
    HomeOutlined as HomeOutlinedIcon,
    PeopleOutlined as PeopleOutlinedIcon,
    ContactsOutlined as ContactsOutlinedIcon,
    ReceiptOutlined as ReceiptOutlinedIcon,
    PersonOutlined as PersonOutlinedIcon,
    HelpOutlineOutlined as HelpOutlineOutlinedIcon,
    BarChartOutlined as BarChartOutlinedIcon,
    PieChartOutlineOutlined as PieChartOutlineOutlinedIcon,
    TimelineOutlined as TimelineOutlinedIcon,
    MenuOutlined as MenuOutlinedIcon,
    DeliveryDining
} from "@mui/icons-material";

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/profile/me", {
                    withCredentials: true // 👉 gửi cookie JWT kèm theo
                });
                setUserProfile(response.data);
            } catch (err) {
                console.error("Lỗi lấy thông tin người dùng:", err);
            }
        };
        fetchProfile();
    }, []);


    return (
        <Box
            sx={{
                "& .pro-sidebar": {
                    width: isCollapsed ? "80px !important" : "250px !important",
                    minWidth: isCollapsed ? "80px !important" : "250px !important",
                },
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                    height: "100vh !important",
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                    margin: "5px 0",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
                "& .pro-menu-item .MuiTypography-root": {
                    fontSize: "14px",
                    marginLeft: "10px",
                },
                "& .pro-menu-item svg": {
                    width: "20px",
                    height: "20px",
                },
                "& .section-header": {
                    fontSize: "12px",
                    marginTop: "15px",
                    marginBottom: "5px",
                    paddingLeft: "20px",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
                    >
                        {!isCollapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                <Typography variant="h3" color={colors.grey[100]}>
                                    ADMIN
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && userProfile && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Avatar
                                    alt="avatar"
                                    src={userProfile.avatarUrl || "../../assets/user.png"}
                                    sx={{ width: 100, height: 100, border: `2px solid ${colors.grey[100]}` }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0", fontSize: "20px" }}>
                                    {userProfile.fullName}
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]} sx={{ fontSize: "14px" }}>
                                    {userProfile.address || "Chưa có địa chỉ"}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item title="Dashboard" to="/home" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Typography variant="h6" color={colors.grey[300]} className="section-header">
                            Data
                        </Typography>
                        <Item title="Quản lý danh mục" to="/category-manager" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Quản lý khuyến mãi" to="/promotion-manager" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Quản lý sản phẩm" to="/product-manager" icon={<DeliveryDining />} selected={selected} setSelected={setSelected} />
                        <Item title="Quản lí người dùng" to="/user-manager" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Quản lí đơn hàng" to="/order-manager" icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Quản lí bình luận" to="/comment-manager" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Typography variant="h6" color={colors.grey[300]} className="section-header">
                            Pages
                        </Typography>
                        <Item title="Profile" to="/form" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="FAQ Page" to="/faq" icon={<HelpOutlineOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Typography variant="h6" color={colors.grey[300]} className="section-header">
                            Doanh thu
                        </Typography>
                        <Item title="Biểu đồ cột" to="/bar" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Biểu đồ tròn" to="/pie" icon={<PieChartOutlineOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Biểu đồ đường" to="/line" icon={<TimelineOutlinedIcon />} selected={selected} setSelected={setSelected} />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{ color: colors.grey[100] }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography sx={{ fontSize: "14px", fontWeight: selected === title ? "bold" : "normal" }}>
                {title}
            </Typography>
            <Link to={to} />
        </MenuItem>
    );
};

export default Sidebar;

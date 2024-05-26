import { COLLABORATOR_ROUTE_PATH, CUSTOMER_ROUTE_PATH, DONATE_ROUTE_PATH } from "../constant/paths";

export const menuItems = (navigate, isAdmin) => isAdmin ? adminItems(navigate) : userItems(navigate)

const userItems = navigate => [
    {
        key: "collaborator",
        label: "Cộng tác viên",
        children: [
            {
                key: "collaborator-overall",
                label: "Tổng quan",
                onClick: () => navigate(COLLABORATOR_ROUTE_PATH.overall),

            },
            {
                key: "collaborator-customer",
                label: "Thông tin khách khách hàng",
                onClick: () => navigate(COLLABORATOR_ROUTE_PATH.customer),

            },
            {
                key: "setting",
                label: "Cài đặt hồ sơ cho thuê",
                onClick: () => navigate(COLLABORATOR_ROUTE_PATH.setting),
            },
        ],
    },
    {
        key: "donate",
        label: "Donate",
        onClick: () => navigate(DONATE_ROUTE_PATH.donate),
    },
    {
        key: "customer",
        label: "Thông tin khách hàng",
        children: [
            {
                key: "customer-overall",
                label: "Tổng quan",
                onClick: () => navigate(CUSTOMER_ROUTE_PATH.overall),

            },
            {
                key: "order-history",
                label: "Lịch sử thuê",
                onClick: () => navigate(CUSTOMER_ROUTE_PATH.orderHistory),

            },
            {
                key: "customer-donate",
                label: "Lịch sử donate",
                onClick: () => navigate(CUSTOMER_ROUTE_PATH.donateHistory),
            },
        ],
    },
];

const adminItems = navigate => [
    {
        key: "manage",
        label: "Quản lý",
        children: [
            {
                key: "manage-collaborator",
                label: "Quản lý Collaborator",
                onClick: () => navigate("/manage-collaborator")
            },
            {
                key: "services",
                label: "Services"
            }
        ]
    }
]

export const getStyles = (screens, token) => ({
    container: {
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        margin: "0 auto",
        padding: screens.md
            ? `0px ${token.paddingLG}px`
            : `0px ${token.padding}px`,
    },
    header: {
        backgroundColor: token.colorBgContainer,
        borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
        position: "relative",
    },
    logo: {
        display: "block",
        height: token.sizeLG,
        left: "50%",
        position: screens.md ? "static" : "absolute",
        top: "50%",
        transform: screens.md ? " " : "translate(-50%, -50%)",
    },
    menu: {
        backgroundColor: "transparent",
        borderBottom: "none",
        lineHeight: screens.sm ? "4rem" : "3.5rem",
        marginLeft: screens.md ? "0px" : `-${token.size}px`,
        width: screens.md ? "inherit" : token.sizeXXL,
    },
    menuContainer: {
        alignItems: "center",
        display: "flex",
        gap: token.size,
        width: "100%",
        justifyContent: "space-between",
    },
})
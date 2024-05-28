import React, { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import dayjs from "dayjs";
import { showMoney } from "../../lib/helper";

const { Column } = Table;
const { Paragraph } = Typography

const OrderTable = ({ src, renderAction, children, title = "Action", sort}) => {
    const [source, setSource] = useState([])
    const [loading, setLoading] = useState(true)
    const [expand, setExpand] = useState([])

    useEffect(() => {
        const sortFn = sort ? sort : (a, b) => a.status - b.status || dayjs(b.createdDate).diff(a.createdDate, "second")
        src.sort(sortFn)
        setSource(src)
        setExpand(src.map(item => ({ id: item.id, value: false })))
        setLoading(false)
    }, [src])

    return (
        <Table loading={loading} dataSource={source} rowKey={"id"} rowClassName={customer => customer.status !== 0 ? "disabled-row" : ""} scroll={{ x: "max-content" }}>
            <Column
                title={title}
                key="action"
                render={renderAction}
            />
            {
                children
            }
            <Column 
                title="Người thuê" 
                dataIndex="name"
            />
            <Column 
                title="Email" 
                dataIndex="email" 
            />
            <Column 
                title="Số điện thoại" 
                dataIndex="phoneNumber" 
            />
            <Column
                title="Giá mỗi giờ"
                render={(_, customer) => showMoney((+customer.offer))}
            />
            <Column 
                title="Số giờ" 
                dataIndex="times"

            />
            <Column
                title="Thành tiền"
                render={(_, customer) => showMoney((+customer.times) * (+customer.offer))}
            />
            <Column 
                title="Yêu cầu thêm"
                width={300}
                render={(_, customer) => {
                    return (
                        <Paragraph
                            ellipsis={{
                                rows: 2,
                                expandable: 'collapsible',
                                expanded: expand.length ? expand[`${customer.id}`]?.value : true,
                                onExpand: (e, info) => {
                                    setExpand(prev => prev.map(item => item.id === customer.id ? { id: item.id, value: true} : item))
                                },
                            }}
                        >
                        {
                            customer.description
                        }
                        </Paragraph>
                    )
                }}
            />
            <Column 
                title="Thông tin zalo" 
                dataIndex="zalo" 
            />
            <Column 
                title="Ngày yêu cầu"
                render={(_, customer) => dayjs(customer.createdDate).format("DD-MM-YYYY HH:mm:ss A")}
            />
            <Column 
                title="Ngày xác nhận"
                render={(_, customer) => customer.confirmedDate ? dayjs(customer.confirmedDate).format("DD-MM-YYYY HH:mm:ss A") : ""}
            />
            
        </Table>
    );
};
export default OrderTable;

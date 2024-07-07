import React, { useState } from "react";
import { Space, Select, Typography, Flex, Button, Switch } from "antd";
import FilterCollapse from "./filter/FilterCollapse";
import locationAPI from "../../api/locationAPI";
import { TreeSelect } from 'antd';

const { SHOW_PARENT } = TreeSelect;
const { Text } = Typography;
const hasAll = true;

const orderFilters = [
    {
        value: 2,
        label: "Số lượng đánh giá tăng dần",
    },
    {
        value: 3,
        label: "Số lượng đánh giá tăng dần",
    },
    {
        value: 4,
        label: "Độ tuổi giảm dần",
    },
    {
        value: 5,
        label: "Độ tuổi tăng dần",
    },
];

const statusFilters = [
    {
        value: 0,
        label: "All",
    },
    {
        value: 1,
        label: "Đang sẵn sàng",
    },
    {
        value: 2,
        label: "Chưa sẵn sàng",
    },
]

const getFilterItem = ({
    label,
    onSelect,
    defaultValue,
    options,
    mode,
    width = 200,
}) => (
    <Space direction="vertical" key={label}>
        <Text>{label}</Text>
        <Select
            showSearch
            style={{ width: width }}
            placeholder={label}
            optionFilterProp="children"
            filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
            }
            options={options}
            onSelect={onSelect}
            defaultValue={defaultValue}
            mode={mode}
        />
    </Space>
);

function FilterArea({ setFilter, filterResult, filter, services }) {
    const provinces = locationAPI.getProvinces(hasAll);
    const onProvinceSelect = (e, province) => {
        setFilter((prev) => Object.assign(prev, { city: province.value }));
    };

    const treeData = [
        {
            title: 'All',
            value: 'All',
            key: 'All',
            children: services,
          },
    ]
    const tProps = {
        treeData,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: 'Chọn dịch vụ',
        style: {
          width: '100%',
        },
        defaultValue: filter.services,
        treeDefaultExpandAll: true,
        onChange: (value) => setFilter((prev) => Object.assign(prev, { services: value }))
      };

    const filterItems = [
        {
            options: provinces,
            label: "Tỉnh/Thành phố",
            onSelect: onProvinceSelect,
            defaultValue: filter.city,
        },
        {
            label: "Giới tính",
            defaultValue: filter.sex,
            options: [
                {
                    label: "All",
                    value: "All",
                },
                {
                    label: "Nam",
                    value: "Male",
                },
                {
                    label: "Nữ",
                    value: "Female",
                },
            ],
            width: 200,
            onSelect: (value) =>
                setFilter((prev) => Object.assign(prev, { sex: value })),
        },
        {
            label: "Sắp xếp",
            defaultValue: filter.orderType,
            options: orderFilters,
            width: 200,
            onSelect: (value) =>
                setFilter((prev) => Object.assign(prev, { orderType: value })),
        },        
        {
            label: "Trạng thái",
            defaultValue: filter.status,
            options: statusFilters,
            width: 200,
            onSelect: (value) =>
                setFilter((prev) => Object.assign(prev, { status: value })),
        },
    ];

    return (
        <Space direction="vertical" size={30}>
            <Flex className="filter-area" wrap gap={20}>
                {filterItems.map((item) => getFilterItem(item))}
                {
                    <Space direction="vertical" style={{ width: "50%" }}>
                        <Text>Dịch vụ</Text>
                        <TreeSelect {...tProps} />
                    </Space>
                }
                
            </Flex>
            <Button type="primary" onClick={filterResult}>
                Tìm kiếm
            </Button>
        </Space>
    );
}

export default FilterArea;

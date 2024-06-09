import React, { useState } from "react";
import { Space, Select, Typography, Flex, Button } from "antd";
import FilterCollapse from "./filter/FilterCollapse";
import locationAPI from "../../api/locationAPI";
const { Text } = Typography;
const hasAll = true;

const orderFilters = [
    {
        value: 0,
        label: "Giá tăng dần"
    },
    {
        value: 1,
        label: "Giá giá giảm dần",
    },
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
        label: "Độ tuổi tăng dần"
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


function FilterArea({ setFilter, filterResult }) {
    const [provinceId, setProvinceId] = useState(-1);
    const provinces = locationAPI.getProvinces(hasAll);
    const districts = locationAPI.getDistrcits(provinceId, hasAll);

    const onProvinceSelect = (e, province) => {
        setFilter((prev) => Object.assign(prev, { city: province.value }));
        setProvinceId(province.id);
    };

    const filterItems = [
        {
            options: provinces,
            label: "Tỉnh",
            onSelect: onProvinceSelect,
            defaultValue: "All",
        },
        {
            label: "Huyện",
            defaultValue: "All",
            options: districts,
            onSelect: (value, item) =>
                setFilter((prev) => Object.assign(prev, { district: item.label })),
        },
        {
            label: "Giới tính",
            defaultValue: "All",
            options: [
                {
                    label: "All",
                    value: "All",
                },
                {
                    label: "Nam",
                    value: "Female",
                },
                {
                    label: "Nữ",
                    value: "Male",
                },
            ],
            width: 200,
            onSelect: (value) =>
                setFilter((prev) => Object.assign(prev, { sex: value })),
        },
        {
            label: "Sắp xếp",
            defaultValue: 0,
            options: orderFilters,
            width: 200,
            onSelect: (value) =>
                setFilter((prev) => Object.assign(prev, { orderType: value })),
        },
    ];

    return (
        <FilterCollapse>
            <Space direction="vertical" size={30}>
                <Flex className="filter-area" wrap gap={20}>
                    {filterItems.map((item) => getFilterItem(item))}
                </Flex>
                <Button type="primary" onClick={filterResult}>
                    Tìm kiếm
                </Button>
            </Space>
        </FilterCollapse>
    );
}

export default FilterArea;

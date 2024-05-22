import React, { useState } from "react";
import useFetchProvinces from "../../hooks/useFetchProvinces";
import { Space, Select, Typography, Flex, Button } from "antd";
import useFetchDistricts from "../../hooks/useFetchDistricts";
import Range from "./filter/Range";
import FilterCollapse from "./filter/FilterCollapse";
import DataService from "../../lib/DataService";
import { HOME_PATH } from "../../constant/urls";
const { Text } = Typography;
const hasAll = true;

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
    const [rangeValue, setRangeValue] = useState(50)
    const provinces = useFetchProvinces(hasAll);
    const districts = useFetchDistricts(provinceId, hasAll);

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
    ];

    return (
        <FilterCollapse>
            <Space direction="vertical" size={30}>
                <Flex className="filter-area" wrap gap={20}>
                    {filterItems.map((item) => getFilterItem(item))}
                    <Range label={"Độ tuổi"} min={14} max={50} width={400} rangeValue={rangeValue} setRangeValue={setRangeValue}/>
                </Flex>
                <Button type="primary" onClick={filterResult}>
                    Tìm kiếm
                </Button>
            </Space>
        </FilterCollapse>
    );
}

export default FilterArea;

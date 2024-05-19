import React, { useState } from 'react'
import useFetchProvinces from '../../hooks/useFetchProvinces';
import { Space, Select, Typography } from 'antd';
import useFetchDistricts from '../../hooks/useFetchDistricts';
import useFetchServices from '../../hooks/useFetchServices';
const { Text } = Typography;
const hasAll = true

const getFilterItem = ({ label, onSelect, defaultValue, options, mode, width = 200 }) => (
    <Space direction="vertical">
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
)

function FilterArea({ services }) {
    const [provinceId, setProvinceId] = useState(-1)
    const provinces = useFetchProvinces(hasAll)
    const districts = useFetchDistricts(provinceId, hasAll)

    const onProvinceSelect = (e, province) => {
        setProvinceId(province.id);
    }

    const filterItems = [
        {
            options: provinces,
            label: "Tỉnh",
            onSelect: onProvinceSelect,
            defaultValue: "All"
        },
        {
            label: "Huyện",
            defaultValue: "All",
            options: districts
        },
        {
            label: "Dịch vụ",
            defaultValue: -1,
            options: services,
            width: 400,
            mode: "multiple"
        },
    ]
    return (
        <Space>
            {
                filterItems.map(item => getFilterItem(item))
            }
        </Space>

    )
}

export default FilterArea

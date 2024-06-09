import { districts, provinces } from "../constant/location"

const getProvince = id => {
    return provinces.find(province => province.id === id) ?? null
}

const getProvinces = (hasAll = false) => {
    const result = provinces.map(item => ({ value: item.province_name, label: item.province_name, id: item.province_id }))
    if (hasAll) {
        result.unshift({
            label: "All",
            value: "All",
            id: -1
        })
    }
    return result
}

const getDistrcits = (provinceId, hasAll = false) => {
    const result = districts.filter(dis => dis.parent_code === provinceId).map(item => ({ value: item.name, label: item.name }))
    if(hasAll){
        result.unshift({
            label: "All",
            value: -1
        })
    }
    return result
}

export default {
    getProvinces: getProvinces,
    getProvince: getProvince,
    getDistrcits: getDistrcits
}
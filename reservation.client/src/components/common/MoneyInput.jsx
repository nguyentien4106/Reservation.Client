import { InputNumber } from 'antd'
import React from 'react'

function MoneyInput() {
    return (
        <InputNumber
            min={10000}
            width={"100%"}
            style={{
                width: "100%",
            }}
            formatter={(
                value
            ) =>
                `đ ${value}`.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ","
                )
            }
            parser={(value) =>
                value.replace(
                    /\đ\s?|(,*)/g,
                    ""
                )
            }
        />
    )
}

export default MoneyInput

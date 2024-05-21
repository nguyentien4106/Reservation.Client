import React from "react";
import { Typography, Image, Flex } from "antd";
import MomoQR from "@/assets/momo.png"
import VibQR from "@/assets/vib.png"

const { Text, Title } = Typography

export default function Donate() {
    return (
        <div>
            <h3>Hiện tại page mình lập ra để support mọi người có nhu cầu có thể tìm thấy nhau một cách dễ dàng hơn. Nếu có thể xin mọi người xem dùm mình cái quảng cáo là được  </h3>
            <h3>Dù free nhưng mà mình vẫn phải chịu các chi phí liên quan tới software nên nếu bạn có lòng thì donate cho mình 1 chút nhé. Thank you very much</h3>
            <Flex 
                gap={20}
            >
                <Image src={MomoQR} preview={false} height={350}/>
                <Image src={VibQR} preview={false} height={350} />
            </Flex>
        </div>
    );
}

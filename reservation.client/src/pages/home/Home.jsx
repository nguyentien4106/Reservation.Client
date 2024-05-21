import { App, Flex, Space, Spin } from "antd";
import DataService from "../../lib/DataService.js";
import { Suspense, lazy, useEffect, useState } from "react";
import { COLLABORATOR_PATH, HOME_PATH } from "../../constant/urls.js";
import { GET_COLLABORATOR_TYPES } from "../../constant/settings.js";
import FilterArea from "../../components/home/FilterArea.jsx";
import useFetchServices from "../../hooks/useFetchServices.jsx";
import "./index.css"

const CollaboratorCard = lazy(() => import("../../components/home/collaborators/CollaboratorCard.jsx"))

function Home() {
    const { message } = App.useApp();
    const [collaborators, setCollaborators] = useState([])
    const services = useFetchServices()

    useEffect(() => {
        DataService.get(COLLABORATOR_PATH.getAll + GET_COLLABORATOR_TYPES.all).then(res => {
            const { data } = res.data
            setCollaborators(data)
        })
            .catch(err => message.error(err.message))
    }, [])

    const card = collaborator => (
        <Suspense key={collaborator.id} fallback={<Spin />}>
            <CollaboratorCard 
                key={collaborator.id}
                collaborator={collaborator} 
                services={services}
            />
        </Suspense>
    )
    
    return (
        <Flex vertical gap={50} wrap >
            <FilterArea services={services} />
            <Space size="middle" className="collaborators">
                {
                    collaborators && collaborators.map(collaborator => card(collaborator))
                }
            </Space>

        </Flex>
    );
}

export default Home;
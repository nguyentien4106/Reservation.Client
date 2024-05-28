import { App, Flex, Space, Spin } from "antd";
import DataService from "../../lib/DataService.js";
import { Suspense, lazy, useContext, useEffect, useState } from "react";
import { COLLABORATOR_PATH, HOME_PATH } from "../../constant/urls.js";
import { GET_COLLABORATOR_TYPES } from "../../constant/settings.js";
import FilterArea from "../../components/home/FilterArea.jsx";
import useFetchServices from "../../hooks/useFetchServices.jsx";
import "./index.css";
import { UserContext } from "../../context/useUserContext.jsx";
import { getUser } from "../../lib/helper.js";
import { useDispatch } from "react-redux";
import { show, hide } from "@/state/loading/loadingSlice";

const CollaboratorCard = lazy(() =>
    import("../../components/home/collaborators/CollaboratorCard.jsx")
);

const defaultFilter = {
    city: "All",
    district: "All",
    sex: "All",
    orderType: 0,
};

function Home() {
    const [filter, setFilter] = useState(defaultFilter);
    const { message } = App.useApp();
    const [collaborators, setCollaborators] = useState([]);
    const services = useFetchServices();
    const { setUser } = useContext(UserContext);
    const dispatch = useDispatch();

    const getCollaborators = () => {
        dispatch(show());
        const params = new URLSearchParams(filter);

        DataService.get(HOME_PATH.getAllFilter + params)
            .then((res) => {
                const { data } = res.data;
                setCollaborators(data);
                console.log(data)
            })
            .catch((err) => message.error(err.message))
            .finally(() => {
                dispatch(hide());
            });
    };
    useEffect(() => {
        getCollaborators();
        setUser(getUser());
    }, []);

    const filterResult = () => {
        getCollaborators();
    };

    const card = (collaborator) => (
        <Suspense key={collaborator.id} fallback={<Spin />}>
            <CollaboratorCard
                key={collaborator.id}
                collaborator={collaborator}
                services={services}
            />
        </Suspense>
    );

    return (
        <Flex vertical gap={50} wrap>
            <FilterArea
                services={services}
                filterResult={filterResult}
                setFilter={setFilter}
            />
            <Space size="middle" className="collaborators">
                {collaborators.length ? (
                    collaborators.map((collaborator) => card(collaborator))
                ) : (
                    <h3>Không tìm thấy dữ liệu</h3>
                )}
            </Space>
        </Flex>
    );
}

export default Home;

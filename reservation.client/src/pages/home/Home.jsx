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
    maxAge: 50,
};
function Home() {
    const [filter, setFilter] = useState(defaultFilter);
    const { message } = App.useApp();
    const [collaborators, setCollaborators] = useState([]);
    const services = useFetchServices();
    const { setUser } = useContext(UserContext);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(show());
        DataService.get(COLLABORATOR_PATH.getAll + GET_COLLABORATOR_TYPES.all)
            .then((res) => {
                const { data } = res.data;
                setCollaborators(data);
            })
            .catch((err) => message.error(err.message))
            .finally(() => {
                dispatch(hide());
            });
        setUser(getUser());
    }, []);

    const filterResult = () => {
        const params = new URLSearchParams(filter);
        dispatch(show());
        DataService.get(HOME_PATH.getAllFilter + params)
            .then((res) => {
                console.log(res.data);
                setCollaborators(res.data.data);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                dispatch(hide())
            })
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
                {collaborators &&
                    collaborators.map((collaborator) => card(collaborator))}
            </Space>
        </Flex>
    );
}

export default Home;

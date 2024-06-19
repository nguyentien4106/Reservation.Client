import { App, Col, Flex, Pagination, Row, Space, Spin } from "antd";
import DataService from "../../lib/DataService.js";
import { Suspense, lazy, useContext, useEffect, useState } from "react";
import { COLLABORATOR_PATH, HOME_PATH } from "../../constant/urls.js";
import FilterArea from "../../components/home/FilterArea.jsx";
import useFetchServices from "../../hooks/useFetchServices.jsx";
import "./index.css";
import { getUser } from "../../lib/helper.js";
import { useDispatch } from "react-redux";
import { show, hide } from "@/state/loading/loadingSlice";
import { defaultPaging } from "../../constant/options.js";
import { setUser } from "../../state/user/userSlice.js";

const CollaboratorCard = lazy(() =>
    import("../../components/home/collaborators/CollaboratorCard.jsx")
);

const defaultFilter = {
    city: "All",
    district: "All",
    sex: "All",
    orderType: 0,
};

function Collaborators() {
    const [filter, setFilter] = useState(defaultFilter);
    const { message } = App.useApp();
    const [collaborators, setCollaborators] = useState([]);
    const services = useFetchServices();
    const dispatch = useDispatch();
    const [paging, setPaging] = useState(defaultPaging);
    const [total, setTotal] = useState(0);

    const getCollaborators = () => {
        dispatch(show());
        const params = new URLSearchParams({ ...filter, ...paging });

        DataService.get(COLLABORATOR_PATH.getAll + params)
            .then((res) => {
                const { data } = res.data;
                setCollaborators(data.data);
                setTotal(data.total);
            })
            .catch((err) => message.error(err.message))
            .finally(() => {
                dispatch(hide());
            });
    };

    useEffect(() => {
        getCollaborators();
        dispatch(setUser(getUser()))
    }, []);

    useEffect(() => {
        getCollaborators();
    }, [filter, paging]);

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
            <Row className="row" gutter={[30, 30]} wrap={true}>
                {collaborators.length ? (
                    collaborators.map((collaborator) => (
                        <Col
                            key={collaborator.id}
                            xs={{
                                flex: "100%",
                            }}
                            sm={{
                                flex: "50%",
                            }}
                            md={{
                                flex: "40%",
                            }}
                            lg={{
                                flex: "20%",
                            }}
                            xl={{
                                flex: "20%",
                            }}
                        >
                            {card(collaborator)}
                        </Col>
                    ))
                ) : (
                    <h3>Không tìm thấy dữ liệu</h3>
                )}
            </Row>
            <Pagination
                defaultCurrent={1}
                total={total}
                responsive
                onChange={(index, pageSize) =>
                    setPaging({ pageIndex: index - 1, pageSize })
                }
                defaultPageSize={20}
                pageSize={paging.pageSize}
            />
        </Flex>
    );
}

export default Collaborators;

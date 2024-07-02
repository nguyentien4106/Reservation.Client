import { App, Col, Flex, Modal, Pagination, Row, Space, Spin } from "antd";
import DataService from "../../lib/DataService.js";
import { Suspense, lazy, useEffect, useState } from "react";
import { COLLABORATOR_PATH } from "../../constant/urls.js";
import FilterArea from "../../components/home/FilterArea.jsx";
import useFetchServices from "../../hooks/useFetchServices.jsx";
import "./index.css";
import { getUser } from "../../lib/helper.js";
import { useDispatch } from "react-redux";
import { show, hide } from "@/state/loading/loadingSlice";
import { defaultPaging } from "../../constant/options.js";
import { setUser } from "../../state/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_ROUTE_PATH } from "../../constant/paths.js";

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
    const navigate = useNavigate();
    const [openFilter, setOpenFilter] = useState(false);

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
        dispatch(setUser(getUser()));
    }, []);

    useEffect(() => {
        console.log(filter)
        getCollaborators();
    }, [filter, paging]);

    const filterResult = () => {
        setOpenFilter(false);
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
        <Flex vertical gap={50} style={{ paddingBottom: 50 }}>
            <Flex
                justify="space-between"
                style={{
                    marginTop: 20,
                    backgroundColor: "rgb(223 223 237)",
                    padding: "10px",
                    borderRadius: "8px",
                }}
            >
                <Space
                    align="center"
                    onClick={() => setOpenFilter(true)}
                    className="pointer"
                >
                    <img
                        width="40"
                        height="40"
                        src="https://img.icons8.com/ios/50/filter--v1.png"
                        alt="filter--v1"
                    />
                    <strong>Lọc</strong>
                </Space>
                <Space
                    align="center"
                    onClick={() =>
                        navigate(ACCOUNT_ROUTE_PATH.collaboratorSetting)
                    }
                    className="pointer"
                >
                    <strong>Tạo profile</strong>
                    <img
                        width="40"
                        height="40"
                        src="https://img.icons8.com/ios/50/add--v1.png"
                        alt="add--v1"
                    />
                </Space>
            </Flex>

            <div
                style={{
                    overflowY: "auto",
                    overflowX: "hidden",
                    padding: 20,
                    boxSizing: "border-box",
                }}
            >
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
                        <Col>
                            <strong style={{ color: "red" }}>
                                Hiện tại chưa có talents nào đang mở.
                            </strong>
                        </Col>
                    )}
                </Row>
            </div>
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

            <Modal
                onCancel={() => setOpenFilter(false)}
                open={openFilter}
                footer={null}
            >
                <FilterArea
                    services={services}
                    filterResult={filterResult}
                    setFilter={setFilter}
                    filter={filter}
                />
            </Modal>
        </Flex>
    );
}

export default Collaborators;

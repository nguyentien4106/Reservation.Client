import React, { lazy } from "react";
import { Route } from "react-router-dom";
import { JOBS_ROUTE_PATH } from "../constant/paths";
import Jobs from "../pages/jobs/Jobs";
import PostJob from "../pages/jobs/PostJob";

export const JobsRoute = (
    <>
        <Route path={JOBS_ROUTE_PATH.jobs} element={<Jobs />} />
        <Route path={JOBS_ROUTE_PATH.post} element={<PostJob />} />

    </>
)
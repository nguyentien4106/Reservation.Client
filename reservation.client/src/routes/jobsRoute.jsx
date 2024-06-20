import React, { lazy } from "react";
import { Route } from "react-router-dom";
import { JOBS_ROUTE_PATH } from "../constant/paths";
import Jobs from "../pages/jobs/Jobs";
import PostJob from "../pages/jobs/PostJob";
import Job from "../components/jobs/Job";
import JobDetails from "../components/jobs/details/JobDetails";

export const JobsRoute = (
    <>
        <Route path={JOBS_ROUTE_PATH.jobs} element={<Jobs />} />
        <Route path={JOBS_ROUTE_PATH.job} element={<JobDetails />} />
        <Route path={JOBS_ROUTE_PATH.post} element={<PostJob />} />

    </>
)
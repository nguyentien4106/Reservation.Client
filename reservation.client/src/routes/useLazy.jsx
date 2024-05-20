import React, { Suspense } from "react";
import Loading from '@/components/common/Loading'

export default function useLazy(children) {
    return <Suspense fallback={<Loading />}>{children}</Suspense>;
}

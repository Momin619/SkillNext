import { lazy, Suspense } from "react";
import Loader from "../../../components/ui/Loader";
const SubFieldDetail = lazy(() =>
  import("../../../components/Career/SubFieldDetail")
);
import PageTransition from "../../../components/ui/PageTransition";
export default function SubFieldDetailPage() {
  return (
    <Suspense fallback={<Loader />}>
      <PageTransition>
        <SubFieldDetail />
      </PageTransition>
    </Suspense>
  );
}

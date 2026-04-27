import { lazy, Suspense } from "react";
import Loader from "../../../components/ui/Loader";
const Fields = lazy(() => import("../../../components/Career/Fields"));
import PageTransition from "../../../components/ui/PageTransition";
export default function FieldsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <PageTransition>
        <Fields />
      </PageTransition>
    </Suspense>
  );
}

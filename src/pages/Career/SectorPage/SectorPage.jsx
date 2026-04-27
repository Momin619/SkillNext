import { lazy, Suspense } from "react";
import Loader from "../../../components/ui/Loader";
const Sector = lazy(() => import("../../../components/Career/Sector"));
import PageTransition from "../../../components/ui/PageTransition";
export default function SectorPage() {
  return (
    <Suspense fallback={<Loader />}>
      <PageTransition>
        <Sector />
      </PageTransition>
    </Suspense>
  );
}

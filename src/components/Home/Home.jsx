import { lazy, Suspense } from "react";
// testing
import Navbar from "../ui/Navbar";
const Hero = lazy(() => import("./Hero"));
const Features = lazy(() => import("./Features"));
const WorkFlow = lazy(() => import("./WorkFlow"));
const Trusted = lazy(() => import("./Trusted"));
const Testimonials = lazy(() => import("./Testimonials"));
import Footer from "../ui/Footer";
export default function Home({ startSplitText }) {
  return (
    <div>
      <Navbar border={true} />
      <Suspense fallback={null}>
        <Hero startSplitText={startSplitText} />
      </Suspense>
      <Suspense fallback={null}>
        <Features />
      </Suspense>
      <Suspense fallback={null}>
        <WorkFlow />
      </Suspense>
      <Suspense fallback={null}>
        <Trusted />
      </Suspense>
      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>
      <Footer />
    </div>
  );
}

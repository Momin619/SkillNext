import React from "react";
import About from "../../components/About/About";

import PageTransition from "../../components/ui/PageTransition";
export default function AboutPage() {
  return (
    <>
      <div>
        <PageTransition>
          <About />
        </PageTransition>
      </div>
    </>
  );
}

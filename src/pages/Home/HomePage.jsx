import React, { useState } from "react";
import Home from "../../components/Home/Home";
import PageTransition from "../../components/ui/PageTransition";

export default function HomePage() {
  const [startSplitText, setStartSplitText] = useState(false);

  return (
    <div className="bg-black min-h-screen">
      <PageTransition onAnimationComplete={() => setStartSplitText(true)}>
        <Home startSplitText={startSplitText} />
      </PageTransition>
    </div>
  );
}

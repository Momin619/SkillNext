import React from "react";
import CareerForm from "../../components/CareerForm/CareerForm";
import PageTransition from "../../components/ui/PageTransition";
export default function CareerFormPage() {
  return (
    <PageTransition>
      <CareerForm />
    </PageTransition>
  );
}

import { EvaluationExperience } from "../components/EvaluationExperience";
import { PagePortal } from "../components/PagePortal";

export function Demo() {
  return (
    <>
      <PagePortal kind="demo" locale="en" />
      <EvaluationExperience locale="en" />
    </>
  );
}

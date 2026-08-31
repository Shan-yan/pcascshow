import { DatasetQuadrantFolders } from "../components/DatasetQuadrants";
import { ConstructionChain, VisibilityMasonry } from "../components/DatasetExperience";
import { Icon } from "../components/Icons";
import { PagePortal } from "../components/PagePortal";
import { SectionHeading } from "../components/UI";

export function Dataset() {
  return (
    <>
      <PagePortal kind="dataset" locale="en" />

      <section className="section section--compact">
        <div className="container">
          <div className="dataset-stats">
            {[["300", "scene–task instances"], ["1", "station waiting hall"], ["4", "candidate actions"], ["5", "human experts"]].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
        </div>
      </section>

      <DatasetQuadrantFolders locale="en" />

      <section className="section section--soft construction-chain-section">
        <div className="container">
          <SectionHeading eyebrow="02 · Construction chain" title="From a public-space problem to a standardized instance" description="Hover or focus each step to reveal the concrete work completed at that stage." />
          <ConstructionChain locale="en" />
        </div>
      </section>

      <section className="section visibility-masonry-section">
        <div className="container">
          <SectionHeading eyebrow="03 · Field visibility" title="Model input and judging reference stay deliberately separated" description="Move across either side to unfold its fields as a compact masonry view." />
          <VisibilityMasonry locale="en" />
        </div>
      </section>

      <section className="section section--soft">
        <div className="container next-step">
          <div><p className="eyebrow">Next step</p><h2>See how these fields become evaluation metrics</h2></div>
          <a className="button button--primary" href="#/methodology">Open Methodology <Icon name="arrow" /></a>
        </div>
      </section>
    </>
  );
}

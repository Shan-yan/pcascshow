import { useState } from "react";
import { citation } from "../data/benchmark";
import { AcademicBadge, MissingData, PageIntro, SectionHeading, SourceNote } from "../components/UI";
import { Icon } from "../components/Icons";

const resources = [
  ["Paper PDF", "Canonical PDF or DOI", "paper"],
  ["Dataset", "Release URL and version", "dataset"],
  ["Code repository", "Public source repository", "code"],
  ["License", "Dataset, image and website terms", "license"],
  ["Contact", "Maintenance owner and email", "contact"]
];

export function Paper() {
  const [copyState, setCopyState] = useState("Copy BibTeX");

  const copyCitation = async () => {
    if (!citation.bibtex.value) {
      setCopyState("Citation not provided");
      window.setTimeout(() => setCopyState("Copy BibTeX"), 1800);
      return;
    }
    try {
      await navigator.clipboard.writeText(citation.bibtex.value);
      setCopyState("Copied");
    } catch {
      setCopyState("Select text to copy");
    }
  };

  return (
    <>
      <PageIntro
        eyebrow="Paper & Citation"
        title="Research record and reusable citation"
        lead="This page intentionally distinguishes manuscript-confirmed benchmark facts from publication metadata that the authors must finalize before release."
        badges={
          <>
            <AcademicBadge tone="warning">Publication metadata pending</AcademicBadge>
            <AcademicBadge>Source-aware fields</AcademicBadge>
          </>
        }
      />

      <section className="section section--compact">
        <div className="container paper-layout">
          <article className="paper-record">
            <div className="paper-record__mark"><Icon name="file" size={34} /></div>
            <div>
              <p className="eyebrow">Final paper title</p>
              <h2>[AUTHOR TO PROVIDE]</h2>
              <dl>
                <div><dt>Authors</dt><dd>[AUTHOR TO PROVIDE]</dd></div>
                <div><dt>Affiliations</dt><dd>[AUTHOR TO PROVIDE]</dd></div>
                <div><dt>Venue</dt><dd>[AUTHOR TO PROVIDE]</dd></div>
                <div><dt>Status</dt><dd>[AUTHOR TO PROVIDE]</dd></div>
                <div><dt>DOI / URL</dt><dd>[AUTHOR TO PROVIDE]</dd></div>
              </dl>
            </div>
          </article>
          <aside className="paper-scope">
            <p className="eyebrow">Confirmed research identity</p>
            <h3>PCA-SC Bench</h3>
            <p>Perception–Cognition–Action for Safety and Consistency Bench</p>
            <ul>
              <li><Icon name="check" />300 standardized instances</li>
              <li><Icon name="check" />6 evaluated MLLMs</li>
              <li><Icon name="check" />Task success, safety and chain consistency</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container reading-column">
          <SectionHeading eyebrow="01 · Abstract" title="Author-approved abstract" />
          <MissingData detail="The planning document contains a website summary, but the final abstract and final paper title were not supplied. Insert the author-approved abstract here before publication." />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="02 · Citation"
            title="Citation-ready when final metadata is available"
            description="No authors, DOI, venue or publication status are inferred."
          />
          <div className="citation-block">
            <div className="citation-block__head">
              <div>
                <AcademicBadge tone="warning">[AUTHOR TO PROVIDE]</AcademicBadge>
                <h3>BibTeX</h3>
              </div>
              <button className="button button--secondary" type="button" onClick={copyCitation}>
                <Icon name="copy" />{copyState}
              </button>
            </div>
            <pre tabIndex={0}>{`@article{AUTHOR_TO_PROVIDE,
  title   = {[AUTHOR TO PROVIDE]},
  author  = {[AUTHOR TO PROVIDE]},
  journal = {[AUTHOR TO PROVIDE]},
  year    = {[AUTHOR TO PROVIDE]},
  url     = {[AUTHOR TO PROVIDE]}
}`}</pre>
            <p>This block is a labeled template, not a valid citation record.</p>
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <SectionHeading
            eyebrow="03 · Resources"
            title="Release links and stewardship"
            description="Unavailable resources are status labels rather than non-functional links."
          />
          <div className="resource-list">
            {resources.map(([title, description]) => (
              <article key={title}>
                <Icon name={title === "Dataset" ? "database" : title === "Paper PDF" ? "file" : "external"} size={24} />
                <div><h3>{title}</h3><p>{description}</p></div>
                <AcademicBadge tone="warning">[AUTHOR TO PROVIDE]</AcademicBadge>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="04 · Human-grounded validation"
            title="Protocol described; results pending"
            description="The manuscript proposes 120 model-decision cases, approximately 150 public participants and 8 experts. These are planned targets, not completed findings."
          />
          <div className="protocol-grid">
            <div><strong>120</strong><span>model-decision cases in protocol</span></div>
            <div><strong>≈150</strong><span>target public participants</span></div>
            <div><strong>8</strong><span>target experts</span></div>
            <MissingData detail="Final N, exclusions, ethics approval or exemption, agreement statistics and human-validity results." />
          </div>
          <SourceNote source="Human-grounded Validation Study protocol; completion and results are [AUTHOR TO PROVIDE]." verify />
        </div>
      </section>

      <section className="section section--soft">
        <div className="container next-step">
          <div><p className="eyebrow">Return to evidence</p><h2>Inspect the formal multi-metric model results</h2></div>
          <a className="button button--primary" href="#/models">Full Benchmark Results <Icon name="arrow" /></a>
        </div>
      </section>
    </>
  );
}

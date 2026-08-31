import { SectionHeading } from "../components/UI";
import { Icon } from "../components/Icons";
import { DarkVeilBackground, EvolutionFlow, HeroCaseGallery, OrbitExplorer, SplitTitle } from "../components/LandingExperience";
import { GlassActionLinks } from "../components/HomeActions";

export function Home() {
  return (
    <>
      <section className="hero hero--home">
        <div className="container hero__grid">
          <div className="hero__copy" data-reveal="up">
            <div className="hero__subject">
              <h1><SplitTitle text="PCA-SC Bench" /></h1>
              <p className="hero__full-name" lang="zh-CN">面向安全与一致性的感知–认知–行动评测基准</p>
              <p className="hero__acronym shiny-line" aria-label="P means Perception, C means Cognition, A means Action, S means Safety, and C means Consistency">
                <span><b>P</b> · Perception</span>
                <span><b>C</b> · Cognition</span>
                <span><b>A</b> · Action</span>
                <span><b>S</b> · Safety</span>
                <span><b>C</b> · Consistency</span>
              </p>
            </div>
            <div className="hero__supporting-copy">
              <p className="hero__position">
                A diagnostic evaluation framework for safe, high-level decisions and
                perception–cognition–action consistency in public spaces.
              </p>
              <p className="hero__description">
                PCA-SC Bench contains 300 manually designed station-hall instances.
                PCA-SC Eval reports task success, safety and decision-chain consistency
                separately, complemented by a human study with more than 50 public-space users.
              </p>
            </div>
            <GlassActionLinks locale="en" />
          </div>

          <HeroCaseGallery locale="en" />
        </div>
      </section>

      <section className="section section--soft home-section--motivation" data-reveal="up">
        <div className="container">
          <SectionHeading
            eyebrow="01 · The paper's central idea"
            title="Task success is necessary—not sufficient"
            description="Public-space agents must account for people, rules, access restrictions and the risk introduced by the way a task is carried out."
          />
          <EvolutionFlow locale="en" />
        </div>
      </section>

      <section className="section section--orbit home-section--orbit" data-reveal="up">
        <DarkVeilBackground />
        <div className="container">
          <SectionHeading
            eyebrow="02 · Begin exploring"
            title="PCA-SC research content"
            description="300 standardized instances, six evaluated models and a human study with more than 50 participants."
          />
          <OrbitExplorer locale="en" />
        </div>
      </section>

      <section className="section home-section--next">
        <div className="container next-step">
          <div><p className="eyebrow">Next step</p><h2>View the evaluation results for six models</h2></div>
          <a className="button button--primary" href="#/models">Enter evaluation results <Icon name="arrow" /></a>
        </div>
      </section>
    </>
  );
}

import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function TechnicalDiagram() {
  return (
    <div className="technical-diagram">
      <svg width="100%" height="200" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
        {/* AI Agent Service */}
        <rect x="150" y="50" width="150" height="80" rx="2" fill="#f5f7fc" stroke="#3366cc" strokeWidth="1.5" />
        <text x="225" y="90" fontFamily="'JetBrains Mono', monospace" fontSize="14" fill="#3366cc" textAnchor="middle">AI Agent Service</text>
        <text x="225" y="110" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#666" textAnchor="middle">PORT 8000</text>
        
        {/* Web Application */}
        <rect x="325" y="20" width="150" height="140" rx="2" fill="#f5f7fc" stroke="#3366cc" strokeWidth="1.5" />
        <text x="400" y="60" fontFamily="'JetBrains Mono', monospace" fontSize="14" fill="#3366cc" textAnchor="middle">Web Application</text>
        <text x="400" y="80" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#666" textAnchor="middle">PORT 3500</text>
        <text x="400" y="120" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="#666" textAnchor="middle">Next.js</text>
        
        {/* Problem Service */}
        <rect x="500" y="50" width="150" height="80" rx="2" fill="#f5f7fc" stroke="#3366cc" strokeWidth="1.5" />
        <text x="575" y="90" fontFamily="'JetBrains Mono', monospace" fontSize="14" fill="#3366cc" textAnchor="middle">Problem Service</text>
        <text x="575" y="110" fontFamily="'JetBrains Mono', monospace" fontSize="10" fill="#666" textAnchor="middle">PORT 3000</text>
        
        {/* Connection lines */}
        <line x1="300" y1="90" x2="325" y2="90" stroke="#3366cc" strokeWidth="1.5" />
        <line x1="475" y1="90" x2="500" y2="90" stroke="#3366cc" strokeWidth="1.5" />
        
        {/* Grid lines in background */}
        {Array.from({length: 20}, (_, i) => (
          <line key={`vline-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="200" stroke="#e5e7eb" strokeWidth="0.5" />
        ))}
        {Array.from({length: 5}, (_, i) => (
          <line key={`hline-${i}`} x1="0" y1={i * 40} x2="800" y2={i * 40} stroke="#e5e7eb" strokeWidth="0.5" />
        ))}
      </svg>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.technicalHeader}>
      <div className="container">
        <div className={styles.titleSection}>
          <Heading as="h1" className={styles.title}>
            GG INTERVIEW SYSTEM
          </Heading>
          <p className={styles.subtitle}>
            A reference manual for the AI-powered technical interview platform.
            <br />
            <span className={styles.authorLine}>Written and documented by the GG Team.</span>
          </p>
        </div>
        
        <TechnicalDiagram />
        
        <div className={styles.buttonContainer}>
          <Link
            className={styles.technicalButton}
            to="/intro">
            VIEW DOCUMENTATION →
          </Link>
        </div>
      </div>
    </header>
  );
}

function DocumentSection({title, description, linkTo, index}) {
  return (
    <div className={styles.docSection}>
      <div className={styles.docIndex}>{index}</div>
      <h3 className={styles.docTitle}>{title}</h3>
      <p className={styles.docDescription}>{description}</p>
      <Link to={linkTo} className={styles.docLink}>View document →</Link>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Documentation for the GG Interview System">
      <HomepageHeader />
      <main className={styles.technicalMain}>
        <div className="container">
          <div className={styles.gridDivider}>
            <span className={styles.gridLine}></span>
            <span className={styles.gridText}>PRIMARY DOCUMENTATION</span>
            <span className={styles.gridLine}></span>
          </div>
          
          <div className={styles.docGrid}>
            <DocumentSection 
              title="SYSTEM OVERVIEW" 
              description="Core architecture and components of the GG Interview System." 
              linkTo="/intro"
              index="1." />
            <DocumentSection 
              title="BUSINESS REQUIREMENTS" 
              description="SaaS model, stakeholders, and business objectives." 
              linkTo="/project-docs/business-requirements-document"
              index="2." />
            <DocumentSection 
              title="SOFTWARE REQUIREMENTS" 
              description="Technical specifications and system interactions." 
              linkTo="/project-docs/solution-requirements-document"
              index="3." />
            <DocumentSection 
              title="PROJECT CHARTER" 
              description="Project milestones, roles, and implementation plan." 
              linkTo="/project-docs/project-charter"
              index="4." />
          </div>
          
          <div className={styles.gridDivider}>
            <span className={styles.gridLine}></span>
            <span className={styles.gridText}>TECHNICAL DIAGRAMS</span>
            <span className={styles.gridLine}></span>
          </div>
          
          <div className={styles.diagramSection}>
            <Link to="/project-docs/enhanced-sequence-diagram" className={styles.diagramLink}>
              <div className={styles.diagramCard}>
                <h3>ENHANCED SEQUENCE DIAGRAMS</h3>
                <p>Detailed interaction flows between system components and external services.</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}

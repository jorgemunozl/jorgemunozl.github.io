import React from 'react';
import { Link } from 'react-router-dom';
import RelativityFieldLines from '@/components/RelativityFieldLines';
import TopControls from '@/components/TopControls';
import Footer from '@/components/Footer';
import CredentialsPdfList from '@/components/CredentialsPdfList';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BadgeCheck } from 'lucide-react';
import { certifications } from '@/content/credentials';

const AboutCertificationsPage = () => {
  return (
    <div className="page-shell">
      <RelativityFieldLines />

      <div className="fixed bottom-0 left-1/2 z-0 hidden -translate-x-1/2 translate-y-1/2 transform dark:block">
        <div
          className="h-96 w-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #030d630c, #47020209, transparent)' }}
        />
      </div>
      <div className="fixed bottom-10 left-1/2 z-0 hidden -translate-x-1/2 transform dark:block">
        <div
          className="h-48 w-48 rounded-full blur-2xl"
          style={{ background: 'radial-gradient(circle, #9900000c, #01039b0c, #b902a005)' }}
        />
      </div>

      <div className="page-surface pb-32">
        <TopControls title="Certifications" />

        <main className="pb-24 pt-40">
          <div className="mx-auto max-w-4xl space-y-10 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="ghost" size="sm" className="w-fit gap-2 text-slate-600 dark:text-slate-300" asChild>
                <Link to="/about">
                  <ArrowLeft className="h-4 w-4" />
                  Back to About
                </Link>
              </Button>
            </div>

            <header className="space-y-4 text-center">
              <span className="section-eyebrow mx-auto inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4" />
                Credentials
              </span>
              <h1 className="text-4xl font-semibold text-slate-900 dark:text-white sm:text-5xl">Certifications</h1>
              <p className="mx-auto max-w-2xl text-base text-slate-600 dark:text-slate-200/80">
                Course completions, platform certificates, and similar credentials — each as a downloadable PDF.
              </p>
            </header>

            <CredentialsPdfList
              items={certifications}
              emptyHeading="No certifications listed yet"
              emptyBody="Add PDFs for completed courses or platform certificates, then register them in credentials.ts."
            />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AboutCertificationsPage;

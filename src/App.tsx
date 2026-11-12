import { lazy, Suspense, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AmbientBackground } from '@/components/AmbientBackground'
import { Separator } from '@/components/ui/separator'
import { AboutSection } from '@/features/about/AboutSection'
import { ContactSection } from '@/features/contact/ContactSection'
import { Footer } from '@/features/navigation/Footer'
import { Header } from '@/features/navigation/Header'
import { ProjectCard } from '@/features/projects/ProjectCard'
import { projects } from '@/content/projects'
import { setLanguage } from '@/i18n/i18n'
import { usePortfolioStore } from '@/store/usePortfolioStore'

// Preload the chunk so the first open shows the Sheet immediately.
const projectSheetModule = import('@/features/projects/ProjectSheet')
void projectSheetModule.catch((error) => {
  console.error('Failed to preload the project sheet.', error)
})

const ProjectSheet = lazy(() =>
  projectSheetModule.then((module) => ({ default: module.ProjectSheet })),
)

function App() {
  const { t, i18n } = useTranslation()
  const { activeProjectId, isProjectSheetOpen, openProject, closeProject } = usePortfolioStore()
  const activeProject = projects.find((project) => project.id === activeProjectId) ?? projects[0]
  const language = i18n.language.startsWith('ru') ? 'ru' : 'en'
  const [hasOpenedProjectSheet, setHasOpenedProjectSheet] = useState(isProjectSheetOpen)

  const handleOpenProject = (id: string) => {
    setHasOpenedProjectSheet(true)
    openProject(id)
  }

  return (
    <>
      <AmbientBackground />
      <div className="relative z-10 min-h-screen bg-transparent text-primary">
        <Header
          language={language}
          onToggleLanguage={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
        />

        <main className="mx-auto max-w-page px-4 py-10 sm:px-8 sm:py-14 lg:px-10">
          <section id="projects">
            <div className="mb-4 flex items-end justify-between gap-4">
              <h1 className="font-mono text-caption uppercase tracking-editorial text-secondary">
                {t('header.projects', { defaultValue: 'Projects' })}
              </h1>
              <span className="font-mono text-caption text-secondary">{projects.length}</span>
            </div>
            <Separator className="mb-8" />

            <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpen={() => handleOpenProject(project.id)}
                />
              ))}
            </div>
          </section>

          <AboutSection />
          <ContactSection />
        </main>

        <Footer />

        {activeProject && hasOpenedProjectSheet && (
          <Suspense fallback={null}>
            <ProjectSheet
              project={activeProject}
              isOpen={isProjectSheetOpen}
              onClose={closeProject}
            />
          </Suspense>
        )}
      </div>
    </>
  )
}

export default App

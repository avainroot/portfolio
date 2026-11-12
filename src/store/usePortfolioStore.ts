import { create } from 'zustand'

import { projects } from '@/content/projects'

interface PortfolioState {
  activeProjectId: string | null
  isProjectSheetOpen: boolean
  openProject: (id: string) => void
  closeProject: () => void
  navigateProject: (direction: number) => void
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  activeProjectId: projects[0]?.id ?? null,
  isProjectSheetOpen: false,
  openProject: (id) => {
    set({ activeProjectId: id, isProjectSheetOpen: true })
  },
  closeProject: () => {
    set({ isProjectSheetOpen: false })
  },
  navigateProject: (direction) => {
    const { activeProjectId } = get()
    const currentIndex = projects.findIndex((project) => project.id === activeProjectId)
    const safeIndex = currentIndex >= 0 ? currentIndex : 0
    const nextIndex = safeIndex + direction

    if (nextIndex < 0 || nextIndex >= projects.length) {
      return
    }

    set({ activeProjectId: projects[nextIndex].id })
  },
}))

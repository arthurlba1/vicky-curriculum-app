import { Briefcase, FileUser, type LucideIcon } from "lucide-react"

interface NavItem {
    title: string
    url: string
    isActive?: boolean
}

export interface NavMainItem {
    title: string
    url: string
    icon: LucideIcon
    isActive: boolean
    items?: NavItem[]
}

export const NAV_EXPERIENCES: NavMainItem[] = [
    {
        title: 'My Experiences',
        url: '/experiences',
        icon: FileUser,
        isActive: true,
    }
]

export const NAV_JOB_VACANCIES: NavMainItem[] = [
    {
        title: 'Job Vacancies',
        url: '/#',
        icon: Briefcase,
        isActive: true,
        items: [
            {
                title: 'Job Vacancies',
                url: '/job-vacancies',
            }
        ]
    }
]

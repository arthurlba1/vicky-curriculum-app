import { techSkillsList } from '@/types/tech-skills';

const getSkillLabel = (value: string) =>
  techSkillsList.find(skill => skill.value === value)?.label || value;

export { getSkillLabel };

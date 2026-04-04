export interface BulletItem {
  label: string;
  detail: string;
}

export interface ProcessStep {
  duration: string;
  title: string;
  subtitle: string;
}

export interface ProductSection {
  tag: string;
  headline: string;
  subheadline: string;
  pills: string[]; // "Fast. Quiet. Relevant." chips
  bullets: BulletItem[];
  whenToUse?: string;
  steps?: ProcessStep[]; // Diagnostics timeline
  continuousLevels?: BulletItem[]; // App levels
  footerNote?: string;
}
export interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

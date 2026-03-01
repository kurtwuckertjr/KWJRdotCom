/** Directive types used in the custom markdown syntax */

export type DirectiveType =
  | 'callout'
  | 'timeline'
  | 'darkbox'
  | 'cardgrid'
  | 'scripture'
  | 'faq'
  | 'comparison'
  | 'warning'
  | 'checklist'
  | 'statgrid'
  | 'workout'
  | 'steps'
  | 'objection'
  | 'references'
  | 'glossary'
  | 'darkcontent';

export type AccentColor = 'teal' | 'amber' | 'red' | 'slate' | 'neutral' | 'gray';

export type IconName =
  | 'BookOpen'
  | 'Info'
  | 'AlertCircle'
  | 'CheckCircle'
  | 'Compass'
  | 'Globe'
  | 'Lock'
  | 'ShieldCheck'
  | 'Zap'
  | 'HelpCircle'
  | 'Clock'
  | 'Tool'
  | 'Dumbbell'
  | 'Footprints'
  | 'ShoppingBag'
  | 'Wallet'
  | 'Smartphone'
  | 'HardDrive'
  | 'Link2'
  | 'ArrowRight';

export interface CalloutDirective {
  type: 'callout';
  accent: AccentColor;
  icon?: IconName;
  title?: string;
}

export interface TimelineDirective {
  type: 'timeline';
  accent?: AccentColor;
}

export interface DarkBoxDirective {
  type: 'darkbox';
  title?: string;
  icon?: IconName;
}

export interface CardGridDirective {
  type: 'cardgrid';
  cols?: 2 | 3 | 4;
}

export interface ScriptureDirective {
  type: 'scripture';
  reference: string;
}

export interface FaqDirective {
  type: 'faq';
}

export interface ComparisonDirective {
  type: 'comparison';
  leftTitle?: string;
  rightTitle?: string;
}

export interface WarningDirective {
  type: 'warning';
  cols?: 2 | 3;
}

export interface ChecklistDirective {
  type: 'checklist';
}

export interface StatGridDirective {
  type: 'statgrid';
  cols?: 2 | 3 | 4;
}

export interface WorkoutDirective {
  type: 'workout';
}

export interface StepListDirective {
  type: 'steps';
  accent?: AccentColor;
}

export interface ObjectionDirective {
  type: 'objection';
}

export interface ReferencesDirective {
  type: 'references';
}

export interface GlossaryDirective {
  type: 'glossary';
}

export interface DarkContentDirective {
  type: 'darkcontent';
}

export type Directive =
  | CalloutDirective
  | TimelineDirective
  | DarkBoxDirective
  | CardGridDirective
  | ScriptureDirective
  | FaqDirective
  | ComparisonDirective
  | WarningDirective
  | ChecklistDirective
  | StatGridDirective
  | WorkoutDirective
  | StepListDirective
  | ObjectionDirective
  | ReferencesDirective
  | GlossaryDirective
  | DarkContentDirective;

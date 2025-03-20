export interface ExternalLink {
  name: string;
  url: string;
}

export interface LinkAdderProps {
  onChange: (links: ExternalLink[]) => void;
  value?: ExternalLink[];
}
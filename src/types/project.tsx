export type Project = {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  dateCompleted: string; // Formato flexível (ex: "Maio de 2023", "2023-05-15")
  description: string;
  
  links: {
    type?: "github" | "live" | "behance" | "external"; // Tipos pré-definidos para ícones
    url: string;
    label: string;
    icon_src?: string; // Opcional, se usar ícones customizados
  }[];

  media: {
    type: "image" | "gif" | "video";
    src: string;
    caption?: string; // Opcional
  }[];

  techStack: {
    label: string;
    icon_src?: string; // Opcional, para ícones de tecnologia
  }[];
  
  conclusion: string; // Pode ser vazia, mas sempre uma string
};
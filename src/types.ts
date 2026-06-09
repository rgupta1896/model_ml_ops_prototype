export type Role = "Sales" | "EM" | "Product" | "Engineering";

export type PromptDefinition = {
  role: Role;
  text: string;
  primary?: boolean;
};

export type DemoResponse = {
  role: Role;
  prompt: string;
  answer: string[];
  sources: string[];
  lastUpdated: string;
};

export type Message =
  | {
      id: string;
      type: "user";
      content: string;
    }
  | {
      id: string;
      type: "assistant";
      content: string[];
      sources: string[];
      lastUpdated: string;
    };

export type ActionResult = {
  success: boolean;
  message?: string;
  errors?: Partial<Record<string, string[]>>;
};

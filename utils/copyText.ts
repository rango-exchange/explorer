export const CopyText = (text: string): void => {
  navigator.clipboard.writeText(text);
};

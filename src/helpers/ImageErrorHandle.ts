export const onImageError = (
  e: React.FormEvent<HTMLInputElement>,
  img: string
): void => {
  e.target.src = img;
};

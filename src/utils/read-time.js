export const getReadTime = wordCount => {
  const mins = Math.ceil(wordCount / 265);

  return `${mins} min read`;
};

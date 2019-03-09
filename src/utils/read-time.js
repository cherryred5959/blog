export const getReadTime = wordCount => {
  const mins = Math.round(wordCount / 265);

  if (mins <= 1) {
    return `1 min read`;
  } else {
    return `${mins} mins read`;
  }
};

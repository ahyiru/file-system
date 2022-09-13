const fixFileSizeUnit = (size, base = 1024) => {
  const kb = size / base;
  if (kb < base) {
    return `${kb.toFixed(3) - 0} KB`;
  }
  const mb = kb / base;
  if (mb < base) {
    return `${mb.toFixed(3) - 0} M`;
  }
  const gb = mb / base;
  return `${gb.toFixed(3) - 0} G`;
};

export default fixFileSizeUnit;

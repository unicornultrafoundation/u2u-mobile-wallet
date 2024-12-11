export const groupByAlphabet = (
  data: Record<string, any>[],
  keyField: string,
) => {
  const groups = data.reduce((_groups, item) => {
    if (!item || !item[keyField]) return _groups;
    const groupString = item[keyField][0];
    if (!_groups[groupString]) {
      _groups[groupString] = [];
    }
    _groups[groupString].push(item);
    return _groups;
  }, {});

  return Object.keys(groups).map((char) => {
    return {
      char: groups[char][0][keyField][0].toUpperCase(),
      items: groups[char],
    };
  }).sort((a, b) => {
    if (a.char > b.char) return 1;
    if (a.char < b.char) return -1;
    return 0
  });
};
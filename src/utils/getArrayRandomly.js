export default (items) => {
  const outputArray = [];
  for (let i = 0, length = items.length; i < length; i += 1) { // eslint-disable-line
    const randomElementIndex = Math.floor(Math.random() * items.length);
    outputArray.push(items[randomElementIndex]);
    items.splice(randomElementIndex, 1);
  }

  return outputArray;
};

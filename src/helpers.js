export function getLetters(name) {
  const nameParts = name.toUpperCase().split(' ');
  const letters = [];
  nameParts.forEach((o) => {
    if (o.length > 1) {
      letters.push(o.charAt(0));
    }
  });
  return letters.join('').slice(0, 2);
}

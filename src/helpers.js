export function getLetters(name) {
  name = name.toUpperCase().split(' ');
  let letters = [];
  name.forEach((o) => {
    if (o.length > 1) {
      letters.push(o.charAt(0));
    }
  });
  return letters.join('').slice(0, 2);
}
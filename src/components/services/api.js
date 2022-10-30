export async function getAllCharacters(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
}

export async function getCharacters(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
}

export const searchCharacter = async (character) => {
  const charSearchUrl = `https://pokeapi.co/api/v2/pokemon/${character}`;
  const responce = await fetch(charSearchUrl);
  return await responce.json();
};

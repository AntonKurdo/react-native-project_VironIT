export const getLocationName = async({latitude, longitude}): Promise<string> => {
  try {
      const place = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
      const json = await place.json();
      return json.city;
  } catch (e) {
      console.log(e.message)
  }
};
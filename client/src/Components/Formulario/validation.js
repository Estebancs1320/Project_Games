const regexName = /^[A-Za-z\s]+$/;
const regexImage = /^(?!\s)(?=.*[./])[\s\S]*$/;
const regexDescription = /.+/;
const regexPlatforms = /.+/;
const regexDate = /^\d{4}-\d{2}-\d{2}$/;
const regexRating = /^([0-9]|10)$/;

export const validation = (event, setErrors) => {
  const { name, value } = event;

  if (name === 'name') {
    if (!regexName.test(value)) {
      setErrors((prevValue) => ({ ...prevValue, name: "This field must not contain symbols or numbers" }));
    } else {
      setErrors((prevValue) => ({ ...prevValue, name: "" }));
    }
  }

  if (name === 'image') {
    if (!regexImage.test(value)) {
      setErrors((prevValue) => ({ ...prevValue, image: "Please enter a valid image URL" }));
    } else {
      setErrors((prevValue) => ({ ...prevValue, image: "" }));
    }
  }

  if (name === 'description') {
    if (!regexDescription.test(value)) {
      setErrors((prevValue) => ({ ...prevValue, description: "Description is required" }));
    } else {
      setErrors((prevValue) => ({ ...prevValue, description: "" }));
    }
  }

  if (name === 'platforms') {
    if (!regexPlatforms.test(value)) {
      setErrors((prevValue) => ({ ...prevValue, platforms: "Platforms are required" }));
    } else {
      setErrors((prevValue) => ({ ...prevValue, platforms: "" }));
    }
  }

  if (name === 'date') {
    if (!regexDate.test(value)) {
      setErrors((prevValue) => ({ ...prevValue, date: "Please enter a valid date (YYYY-MM-DD)" }));
    } else {
      setErrors((prevValue) => ({ ...prevValue, date: "" }));
    }
  }

  if (name === 'rating') {
    if (!regexRating.test(value)) {
      setErrors((prevValue) => ({ ...prevValue, rating: "Rating must be a number from 0 to 10" }));
    } else {
      setErrors((prevValue) => ({ ...prevValue, rating: "" }));
    }
  }

  if (name === 'genres') {
    if (value === "") {
      setErrors((prevValue) => ({ ...prevValue, genres: "Genres are required" }));
    } else {
      setErrors((prevValue) => ({ ...prevValue, genres: "" }));
    }
  }

};

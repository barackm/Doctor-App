const renderProfilePicture = (picture, user) => {
  let newImage = '';
  if (!picture || picture.match(/\.(jpeg|jpg|gif|png)$/) == null) {
    if (user.gender === 'M') {
      newImage =
        'https://res.cloudinary.com/fidbagraphicscode/image/upload/v1633880714/doctor-app/avatar_face_man_boy_male_profile_smiley_happy_people_icon_181658_awodng.png';
    } else {
      newImage =
        'https://res.cloudinary.com/fidbagraphicscode/image/upload/v1633880878/doctor-app/avatar_face_girl_female_woman_profile_smiley_happy_people_icon_181665_khjhdw.png';
    }
  } else {
    newImage = picture;
  }

  return newImage;
};

export default renderProfilePicture;

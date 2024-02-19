import { getStorage, ref, uploadString,getDownloadURL,uploadBytes } from 'firebase/storage';
import Gravatar from 'react-gravatar';
import md5 from 'blueimp-md5';

export const generateGravatarURL = (email) => {
  const size = 120; // Set the size of the gravatar
  const hashedEmail = md5(email.toLowerCase());
  return `https://www.gravatar.com/avatar/${hashedEmail}?s=${size}&d=identicon`;
};

export const uploadAvatarToStorage = async (uid, avatarDataURL) => {
  try {
    const storage = getStorage();
    const avatarRef = ref(storage, `avatars/${uid}.png`);

    // Convert the data URL to a Blob
    const blob = await (await fetch(avatarDataURL)).blob();

    // Upload the Blob to Firebase Storage
    await uploadBytes(avatarRef, blob);

    // Get the download URL for the uploaded file
    const avatarURL = await getDownloadURL(avatarRef);

    return avatarURL;
  } catch (error) {
    throw error;
  }
};

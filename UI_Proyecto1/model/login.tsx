let currentUserId: string | null = null;
let currentUserMail: string | null = null;

export const setUser = (id: string) => {
  currentUserId = id;
};
export const setUEmail = (mail: string) => {
  currentUserMail = mail;
};

export const getUser = () => currentUserId;
export const getEmail = () => currentUserMail;

export const clearUser = () => {
  currentUserId = null;
};
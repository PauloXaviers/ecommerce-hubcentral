import { create } from 'zustand';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../../config/firebase';

type useAuth = {
  user: User | null;
};

export const useAuth = create<useAuth>((set) => {
  onAuthStateChanged(auth, (user: User | null) => {
    set({ user: user });
  });

  return { user: null };
});

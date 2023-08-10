import { atom, getDefaultStore, useAtomValue } from 'jotai';
import jwt_decode from 'jwt-decode';

export interface EditorUser {
  email: string;
  name: string;
  picture?: string;
}

const editorUserAtom = atom<EditorUser | null>(null);

export function useEditorUserAtom() {
  return useAtomValue(editorUserAtom, { store: getDefaultStore() });
}

export async function login(onLogout?: () => void) {
  if (getDefaultStore().get(editorUserAtom) != null) return;
  return new Promise<void>((resolve, reject) => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
      callback: (response) => {
        const credentialJwt = response.credential;
        const decoded = jwt_decode(credentialJwt) as EditorUser;
        const store = getDefaultStore();
        store.set(editorUserAtom, decoded);
        if (onLogout) store.sub(editorUserAtom, onLogout);
        resolve();
      },
    });

    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed()) {
        reject(notification.getNotDisplayedReason());
      }

      if (notification.isSkippedMoment()) {
        reject(notification.getSkippedReason());
      }

      if (notification.isDismissedMoment()) {
        reject(notification.getDismissedReason());
      }
    });
  });
}

export function logout() {
  const user = getDefaultStore().get(editorUserAtom);
  if (user == null) return;
  google.accounts.id.revoke(user.email, () => {
    getDefaultStore().set(editorUserAtom, null);
  });
}

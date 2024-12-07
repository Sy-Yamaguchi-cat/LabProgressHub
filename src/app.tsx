import React, { useState, useEffect } from "react";

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, User } from "firebase/auth";
import { getAuth, signInWithPopup, signOut } from "firebase/auth";

import firebaseConfig from "!/firebase/firebase-config.json";
  
const app = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();
console.log(import.meta.env.VITE_SIGNIN_HD);
provider.setCustomParameters({
    "hd": import.meta.env.VITE_SIGNIN_HD,
});
const auth = getAuth();

export function App() {

    return <div>
        <h1>Hello world!</h1>
        <AuthComponent />
    </div>;
}

const AuthComponent = () => {
  const [user, setUser] = useState<null | User>(null); // ログイン状態

  // ログイン状態の監視
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // ログインしている場合
        setUser(authUser);
      } else {
        // ログアウトしている場合
        setUser(null);
      }
    });

    // アンマウント時に監視解除
    return () => {
      unsubscribe();
    };
  }, []);

  // ログイン
  const handleSignIn = async () => {
    try {
      // Googleログインポップアップを表示
      const result = await signInWithPopup(auth, provider);
      // ログイン成功時の処理
      console.log('ログイン成功', result.user);
    } catch (error) {
      // エラーハンドリング
      console.error('ログインエラー', error);
    }
  };

  // ログアウト
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>ログインユーザー: {user.displayName}</p>
          <button onClick={handleSignOut}>ログアウト</button>
        </div>
      ) : (
        <div>
          <p>ログインしていません</p>
          <button onClick={handleSignIn}>ログイン</button>
        </div>
      )}
    </div>
  );
};

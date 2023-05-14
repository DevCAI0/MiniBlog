import {db} from "../firebase/config";


import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { Await } from "react-router-dom";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  // cleanup
  //deall with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  //autenticçao do usario
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      //REGISTER
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });


      setLoading(false);

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage

      if(error.message.includes("password")){
        systemErrorMessage = "A senha precisar conter pelo menos 6 caracteres."
      }else if(error.message.includes("email-already")){
        systemErrorMessage = "Email ja cadastrado."

      }else{
          systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde!!!"
          setLoading(false);
          setError(systemErrorMessage)
      };
    };
  };
  // logout -sign out
  const logout = ()=>{
    checkIfIsCancelled();


    signOut(auth);
  } 
  // login sign in

  const login = async (data)=>{
    checkIfIsCancelled();
    setLoading(true);
    setError(false);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      setLoading(false);
    } catch (error) {
      
    }

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      console.log(error.message.includes("user-not"));

      let systemErrorMessage;

      if(error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }
      setError(systemErrorMessage);
      setLoading(false);
    }

    
  }

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};

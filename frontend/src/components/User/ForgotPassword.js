import { useState } from "react";
import { useFirebase } from "../../firebase.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const firebase = useFirebase();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setMessage("Password reset email sent!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
      />
      <button type="submit">Send Password Reset Email</button>
      <div>{message}</div>
    </form>
  );
};

export default ForgotPassword;

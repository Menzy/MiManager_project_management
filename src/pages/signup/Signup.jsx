import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import imageCompression from "browser-image-compression";

//styles
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleFileChange = async (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("selected file must be an image");
      return;
    }

    try {
      if (selected.size > 100000) {
        const options = {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(selected, options);
        setThumbnail(compressedFile);
        console.log("Thumbnail updated after compression");
      } else {
        setThumbnail(selected);
        console.log("Thumbnail updated");
      }
      setThumbnailError(null);
    } catch (error) {
      setThumbnailError("Error compressing the image");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your sign-up logic goes here
    signup(email, password, displayName, thumbnail);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>Display Name:</span>
        <input
          type="text"
          required
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Profile Thumbnail:</span>
        <input
          type="file"
          accept="image/*"
          required
          onChange={handleFileChange}
        />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && (
        <button type="submit" className="btn">
          Sign up
        </button>
      )}
      {isPending && (
        <button type="submit" className="btn" disabled>
          Loading
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;

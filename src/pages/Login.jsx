import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await supabase.auth.signInWithPassword({
        email: email,
        password: pass,
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    const func = async () => {
      if (!(await supabase.auth.getUser()).error) {
        navigate("/");
      }
    };
    func();
  }, [navigate]);

  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <input
          type="email"
          name="email"
          placeholder="youremail@site.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="***************"
          onChange={(e) => setPass(e.target.value)}
        />
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default Login;

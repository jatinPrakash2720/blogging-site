import { useAuth } from "./contexts/AuthContext";
import { useBlogs } from "./contexts/BlogContext";

function App() {
  const {allBlogs }=useBlogs()
  return (
    <>
      <h1>
      </h1>
    </>
  );
}

export default App;

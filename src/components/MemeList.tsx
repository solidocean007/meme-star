import { useFavorites } from "../Providers/favorite.providers";

export const MemeList = () => {
  const { memes } = useMemes();
  const { user } = useAuth();
  const { favorites } = useFavorites();
  console.log({ user, favorites});

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        width: 1000,
        border: "3px solid black",
        padding: 40,
      }}
    >

    </div>
  )
}
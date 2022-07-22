import { useMoralis } from "react-moralis";
import Auth from "../components/Auth";
import Dashboard from "../components/Dashboard"

export default function Home() {

  const {
    isAuthenticated,
    authenticate,
    logout  
  } = useMoralis()

  if (!isAuthenticated) {
    return (
      <Auth authenticate={authenticate}/>
    )
  }

  return (
    <Dashboard logout={logout}/>
  )
}
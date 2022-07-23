import { useEffect, useState } from "react";
import { useMoralisSolanaApi } from "react-moralis";

export default function Dashboard({ logout, user }) {
  let walletAddress = user.get('solAddress');
  let SolanaApi = useMoralisSolanaApi()

  let [solanaBalance, setSolanaBalance] = useState('')
  let [splBalance, setSplBalance] = useState([{}])
  let [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await SolanaApi.account.balance({
          network: 'devnet',
          address: walletAddress
        })
        setSolanaBalance(result.solana);
      } catch (error) {
        console.log(error)
      }

      try {
        let result = await SolanaApi.account.getSPL({
          network: 'devnet',
          address: walletAddress
        })
        console.log(result)
        setSplBalance(result)
      } catch (error) {
        console.log(error) 
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center py-10 px-4 bg-black overflow-auto">
      <button onClick={logout} className="text-white self-end">logout</button>
      <p className="text-white font-bold text-xl md:text-3xl">wallet address</p>
      <p className="text-white mt-2 mb-8 text-[0.6rem] md:text-lg">
        {walletAddress}
      </p>
      <div className="w-full h-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="bg-pink rounded-2xl drop-shadow-md px-2 py-2 md:px-4 md:py-4 md:text-lg">
          <p className="text-2xl md:text-4xl">solana balance</p>
          
            {!isLoading && 
              <p className="mt-4 md:mt-10 text-3xl md:text-6xl">{solanaBalance.slice(0,6)} <span>SOL</span></p>}
        </div>
        <div className="bg-green rounded-2xl drop-shadow-md px-2 py-2 md:px-4 md:py-4 md:text-lg">
          <p className="text-2xl md:text-4xl">spl tokens {!isLoading ? splBalance.length : ''}</p>
          <ul className="list-disc ml-8 mt-4 md:mt-10 text-md md:text-lg">
            {!isLoading && splBalance.length > 0 && splBalance.map((spl, i) => (
              <li key={i}>{spl.mint?.slice(0,12)}...{' '} {spl.amount}</li>
            ))}
          </ul>
        </div>
        <div className="bg-cyan md:col-span-2 rounded-2xl drop-shadow-md px-2 py-2 md:px-4 md:py-4 md:text-lg">
          <p className="text-2xl md:text-4xl">nfts 1</p>
          <ul className="list-disc px-4 mt-4 md:mt-10 text-md md:text-lg">
            <li>Gh9ZwEmwe8rewrew...</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

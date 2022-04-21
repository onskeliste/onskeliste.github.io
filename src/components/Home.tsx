import { supabase } from "../lib/api";
import Wishes from "./WishItem";

const Home = ({ user }: any) => {



    return (
        <div className="w-full h-full bg-gray-300">
                <div
                    className="w-full h-full flex flex-col justify-center items-center p-4"
                    style={{ minWidth: 250, maxWidth: 600, margin: 'auto' }}
                >
                    <Wishes user={supabase.auth.user()} />
                    <button
                        className="btn-black w-full mt-12"
                        onClick={async () => {
                            const { error } = await supabase.auth.signOut()
                            if (error) console.log('Error logging out:', error.message)
                        }}
                    >
                        Logout
                    </button>
                </div>
        </div>
    )
};

export default Home;
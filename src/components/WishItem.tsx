import { useState, useEffect } from 'react'
import { supabase } from '../lib/api'

export default function Wishes({ user }: any) {
    const [wishes, setWishes] = useState<WishItem[]>([])
    const [newTaskText, setNewTaskText] = useState('')
    const [errorText, setError] = useState('')

    interface WishItem {
        wish_id: bigint;
        user_id: bigint;
        name: string;
        from_date: Date;
        to_date: Date;
        comments: string;
    }

    useEffect(() => {
        fetchWishes()
    }, [])

    const fetchWishes = async () => {
        let { data: wish, error } = await supabase.from('onske').select('*').order('id')
        if (error) console.log('error', error)
        else setWishes(wishes)
    }
    const addWish = async (taskText: any) => {
        let task = taskText.trim()
        if (task.length) {
            let { data: wish, error } = await supabase
                .from('onske')
                .insert({ task, user_id: user.id })
                .single()
            if (error) setError(error.message)
            else setWishes([...wishes, wish])
        }
    }

    const deleteWish = async (id:any) => {
        try {
            await supabase.from('onske').delete().eq('id', id)
            setWishes(wishes.filter((x) => x.wish_id !== id))
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <div className="w-full">
            <h1 className="mb-12">Ønskeliste.</h1>
            <div className="flex gap-2 my-2">
                <input
                    className="rounded w-full p-2"
                    type="text"
                    placeholder="ullsokker"
                    value={newTaskText}
                    onChange={(e) => {
                        setError('')
                        setNewTaskText(e.target.value)
                    }}
                />
                <button className="btn-black" onClick={() => addWish(newTaskText)}>
                    Add
                </button>
            </div>
            {!!errorText && <Alert text={errorText} />}
            <div className="bg-white shadow overflow-hidden rounded-md">
                <ul>
                    {wishes.map((wish) => (
                        <Wish wish={wish} onDelete={() => deleteWish(wish.wish_id)} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

const Wish = ({ wish, onDelete }:any) => {
    const [isCompleted, setIsCompleted] = useState(wish.is_complete)

    const toggle = async () => {
        try {
            const { data, error } = await supabase
                .from('onske')
                .update({ is_complete: !isCompleted })
                .eq('id', wish.id)
                .single()
            if (error) {
                throw new Error(error.message)
            }
            setIsCompleted(data.is_complete)
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <li
            onClick={(e) => {
                e.preventDefault()
                toggle()
            }}
            className="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out"
        >
            <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                    <div className="text-sm leading-5 font-medium truncate">{wish.task}</div>
                </div>
                <div>
                    <input
                        className="cursor-pointer"
                        onChange={(e) => toggle()}
                        type="checkbox"
                        checked={isCompleted ? true : false}
                    />
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onDelete()
                    }}
                    className="w-4 h-4 ml-2 border-2 hover:border-black rounded"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray">
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </li>
    )
}

const Alert = ({ text }:any) => (
    <div className="rounded-md bg-red-100 p-4 my-3">
        <div className="text-sm leading-5 text-red-700">{text}</div>
    </div>
)
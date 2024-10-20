import React from 'react'
import { useRouter } from 'next/navigation'

export const Logout = async () => {
    const router = useRouter();

    try {
        await axios.post("/api/users/logout");
        router.push("/logout")
    } catch (error) {
        console.log(error, error.message)
    }

}

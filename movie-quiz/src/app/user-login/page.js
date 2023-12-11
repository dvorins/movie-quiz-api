
import { redirect } from 'next/navigation';
import Cookies from "js-cookie";

export default function Page() {
// redirect to main here

   
    async function onSubmitRegister(formData) {
        'use server';
        console.log(formData.get("username"));
        const res = await fetch('http://localhost:5001/register', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({username: formData.get("username"), password: formData.get("password")})
        })
        if (!res.ok) {
            throw new Error("Error " + res.status)
        } else {
            Cookies.set("currentUser", JSON.stringify(res))
            redirect('/');
        }
    }

    async function onSubmitLogin(formData) {
        'use server';
        const res = await fetch('http://localhost:5001/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({username: formData.get("username"), password: formData.get("password")})
        })
        if (!res.ok) {
            throw new Error("Error " + res.status)
        } else {
            Cookies.set("currentUser", JSON.stringify(res))
            redirect('/');
        }
        


    }
    return (
        <form action={onSubmitLogin}>
            <label for="name">Name</label><br />
            <input type="text" name="username" /><br />
            <label for="pword">Password</label><br />
            <input type="text" name="password" /><br />
            <button type="submit" onClick={onSubmitLogin}>Login</button>
            <button formAction={onSubmitRegister}>Register</button>
        </form>
    );
}

import { redirect } from 'next/navigation';
import Cookies from "js-cookie";

export default function Page() {
// redirect to main here


    async function onSubmitRegister(formData) {
        'use server';
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
            redirect('/');
        }
        


    }
    return (
        <form action={onSubmitLogin}>
            <label for="name">Name</label><br />
            <input type="text" name="username" /><br />
            <label for="pword">Password</label><br />
            <input type="text" name="password" /><br />
            <input type="submit" value="Submit" />
        </form>
    );
}
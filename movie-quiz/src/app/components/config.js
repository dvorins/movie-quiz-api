export const config =  {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const authResponse = await fetch("/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials),
                })

                if (!authResponse.ok) {
                    return null;
                }

                const user = await authResponse.json();

                return user;
            }
        })
    ]
}
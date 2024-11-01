export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;
    console.log(email, password);
    return new Response(JSON.stringify({ message: "Login successful" }));
}
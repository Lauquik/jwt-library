import { useRouter } from "next/router";
import { useState } from "react";

const Token = () => {
  const router = useRouter();
  const { token } = router.query;
  const [email, setEmail] = useState("");
  const [validationResult, setValidationResult] = useState<string | null>(null);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, token }),
    });

    const { valid } = await response.json();
    setValidationResult(valid ? "Valid email" : "Invalid email");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-950">
      <div className="bg-white p-6 rounded shadow-md m-8">
        <h2 className="text-2xl mb-4">Your JWT Token</h2>
        <p className="mb-4 break-all">{token}</p>
        <form onSubmit={handleValidate}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 p-2 border w-30 text-gray-950"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Verify Token
          </button>
        </form>
        <p
          className={`${
            validationResult === "Invalid email"
              ? "text-red-500"
              : "text-green-500"
          } flex justify-center text-3xl`}
        >
          {validationResult}
        </p>
      </div>
    </div>
  );
};

export default Token;

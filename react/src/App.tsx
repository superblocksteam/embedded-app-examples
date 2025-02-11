import React, { useEffect, useState } from "react";
import "./App.css";
import { SuperblocksEmbed } from "@superblocksteam/embed-react";

function App() {
  const [token, setToken] = useState();
  const [customerId, setCustomerId] = useState("");
  const [properties, setProperties] = useState({ customerId });
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");
  const noToken = process.env.REACT_APP_NO_TOKEN === "true";
  console.log(process.env.REACT_APP_NO_TOKEN);

  useEffect(() => {
    if (noToken) return;
    const fetchToken = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/superblocks/token"
        );
        if (response.ok) {
          const data = await response.json();
          setToken(data.access_token);
        } else {
          // Handle empty or invalid responses here
          console.error("Response was not OK or was empty", response);
        }
      } catch (error) {
        console.error("Failed to fetch token:", error);
      }
    };
    fetchToken();
  }, [noToken]);

  return (
    <div className="App">
      <header className="App-header">Superblocks Embedding Example</header>
      <div className="App-body">
        <div className="input-row">
          <input
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
          <button onClick={() => setProperties({ customerId })}>
            Set Customer ID
          </button>
          <button
            onClick={() =>
              setColorScheme(colorScheme === "light" ? "dark" : "light")
            }
          >
            Toggle Color Scheme
          </button>
        </div>
        <div className="embed-wrapper">
          {token == null && !noToken ? (
            "Loading..."
          ) : (
            <SuperblocksEmbed
              src={
                process.env.REACT_APP_SRC ??
                "https://app.superblocks.com/embed/applications/:APP_ID"
              }
              properties={properties}
              token={token ?? undefined}
              colorScheme={colorScheme}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

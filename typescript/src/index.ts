import { createSuperblocksEmbed } from "@superblocksteam/embed";

window.addEventListener('DOMContentLoaded', () => {
    let token: string | null = null;
    let customerId = '';

    const customerIdInput = document.getElementById('customerIdInput') as HTMLInputElement;
    const setCustomerIdButton = document.getElementById('setCustomerIdButton')!;
    const embedWrapper = document.getElementById('embedWrapper')!;

    const fetchToken = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/superblocks/token");
            if (response.ok) {
                const data = await response.json();
                token = data.access_token;
                createEmbed();
            } else {
                console.error("Response was not OK or was empty", response);
                embedWrapper.textContent = "Failed to load Superblocks token.";
            }
        } catch (error) {
            console.error("Failed to fetch token:", error);
            embedWrapper.textContent = "Error fetching Superblocks token.";
        }
    };

    const createEmbed = () => {
        if (token) {
            embedWrapper.innerHTML = ''; // Clear the embed wrapper
            const embed = createSuperblocksEmbed({
                src: "YOUR_APP_EMBED_URL_HERE", 
                properties: { customerId }, 
                token,
                id: "my-embedded-app"
            });
            embedWrapper.appendChild(embed);
        }
    };

    setCustomerIdButton.addEventListener('click', () => {
        customerId = customerIdInput.value;
        const embed = document.getElementById('my-embedded-app') as any;
        if (embed) {
            embed.properties = { customerId };
        }
    });

    fetchToken();
});

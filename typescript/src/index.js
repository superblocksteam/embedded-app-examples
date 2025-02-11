"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const embed_1 = require("@superblocksteam/embed");
window.addEventListener('DOMContentLoaded', () => {
    let token = null;
    let customerId = '';
    const customerIdInput = document.getElementById('customerIdInput');
    const setCustomerIdButton = document.getElementById('setCustomerIdButton');
    const embedWrapper = document.getElementById('embedWrapper');
    const fetchToken = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch("/api/superblocks/token");
            if (response.ok) {
                const data = yield response.json();
                token = data.access_token;
                createEmbed();
            }
            else {
                console.error("Response was not OK or was empty", response);
                embedWrapper.textContent = "Failed to load Superblocks token.";
            }
        }
        catch (error) {
            console.error("Failed to fetch token:", error);
            embedWrapper.textContent = "Error fetching Superblocks token.";
        }
    });
    const createEmbed = () => {
        if (token) {
            embedWrapper.innerHTML = ''; // Clear the embed wrapper
            const embed = (0, embed_1.createSuperblocksEmbed)({
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
        const embed = document.getElementById('my-embedded-app');
        if (embed) {
            embed.properties = { customerId };
        }
    });
    fetchToken();
});

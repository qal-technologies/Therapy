import handleAlert from "./general.js";

const paySafeSteps = [
    {
        title: "How Paysafecard Works",
        message: `<h3 style="text-align:center;">🔑 Step 1 </h3> Buy a paysafecard voucher at a shop near you. You'll receive a paper slip with a 16-digit code.`,
        buttons: [
            { text: "Next >", action: "next" }
        ]
    },
    {
        title: "How Paysafecard Works",
        message: `<h3 style="text-align:center;">🖊️ Step 2 </h3> Come back here and type the 16-digit code into the payment box.`,
        buttons: [
            {
                text: "< Back", action: "prev"
                , type: "secondary"
            },
            { text: "Next >", action: "next" }
        ]
    },
    {
        title: "How Paysafecard Works",
        message: `<h3 style="text-align:center;">✨ Step 3 </h3> Click Pay. That's it, your payment is complete instantly.  <br/> <br/> Ready to continue? Your book/session is waiting for you.`,
        buttons: [
            { text: "< Back", action: "prev", type: "secondary" },
            {
                text: "Back to payment",
                action: "closeAlert"
            }
        ]
    }
];

function showFlow(steps, index = 0) {
    const step = steps[index];

    handleAlert(
        step.message,
        "blur",
        true,
        step.title,
        true,
        step.buttons.map(btn => ({
            text: btn.text,
            onClick: btn.action === "next"
                ? () => showFlow(steps, index + 1)
                : btn.action === "prev"
                    ? () => showFlow(steps, index - 1)
                    : btn.action,
            type: btn.type || "primary",
        })),
        "row"
    );
}

function stepsAlerts() {
    showFlow(paySafeSteps);
}

const safeFlow = {
    start: {
        message: "Do you need help finding a shop near you to buy a Paysafecard voucher, or would you like guidance on how to use it to complete your payment for your book/session?",
        title: "🌸 <br/> Companion Support",
        buttons: [
            { text: "Yes, guide me", action: "guide" },
            { text: "No, thank you", action: "closeAlert", type: "secondary" }
        ]
    },
    guide: {
        message: "We're here to make this easy for you. <br/> Please choose what you need right now:",
        title: "🌸 Companion Support",
        buttons: [
            {
                text: "Find a Store Near Me", action: () => {
                    window.open("https://share.google/K7b9QET2xQ5kLgSJ7");
                    return "closeAlert";
                }, type: "secondary"
            },
            {
                text: "Show Me How Paysafecard Works", action: () => stepsAlerts(),
                type: "secondary"
            },
            {
                text: "Talk to us",
                action: () => handleAlert(`Need help? Write to us now and explain your problem. Our team will respond quickly and fix it for you.  <br/><br/>
                            <div style="display:flex; gap:6px;"> 
                            <i class="bi bi-envelope"></i> Email Us </div>
                            `, "blur", true, "✉️ Companion Support", true, [{
                    text: "Message Now", onClick: () => {
                        handleRedirect("mailto:healingwithcharlottecasiraghi@gmail.com");

                        return "closeAlert"
                    }
                }])
                , type: "secondary"
            }
        ],
        arrange: "column"
    }
};

function runFlow(flow, state = "start") {
    const step = flow[state];
    handleAlert(
        step.message,
        "blur",
        true,
        step.title,
        true,
        step.buttons.map(btn => ({
            text: btn.text,
            onClick: typeof btn.action === "string"
                ? btn.action === "closeAlert" ? "closeAlert" : () => runFlow(flow, btn.action)
                : btn.action,
            type: btn.type,
        })),
        {},
        step.arrange
    );
}

function safeAlerts() {
    runFlow(safeFlow, "start");
}

safeAlerts();
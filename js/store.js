const paySafeSteps = [
    {
        title: "How Paysafecard Works",
        message: `<p style="text-align:center;">🔑 Step 1 </p> Buy a paysafecard voucher at a shop near you.You'll receive a paper slip with a 16-digit code.`,
        buttons: [
            { text: "Next >", action: "next" }
        ]
    },
    {
        title: "How Paysafecard Works",
        message: `<p style="text-align:center;">🖊️ Step 2 </p> Come back here and type the 16-digit code into the payment box.`,
        buttons: [
            { text: "< Back", action: "prev" },
            { text: "Next >", action: "next" }
        ]
    },
    {
        title: "How Paysafecard Works",
        message: `<p style="text-align:center;">🖊️ Step 3 </p> Click Pay. That's it, your payment is complete instantly.  <br/> <br/> Ready to continue? Your book/session is waiting for you.`,
        buttons: [
            { text: "< Back", action: "prev" },
            {
                text: "Next >",
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
                    : btn.action // can be a function
        }))
    );
}

// usage
function stepsAlerts() {
    showFlow(paySafeSteps);
}


const safeFlow = {
    start: {
        message: "Do you need help finding a shop?",
        title: "🌸 Companion Support",
        buttons: [
            { text: "Yes, guide me", action: "guide" },
            { text: "No, thank you", action: "closeAlert" }
        ]
    },
    guide: {
        message: "We're here to make this easy...",
        title: "🌸 Companion Support",
        buttons: [
            { text: "Find a store", action: () => handleAlert("Store near me clicked!", "toast") },
            { text: "Show how paysafecard works", action: () => stepsAlerts() },
            { text: "Talk to us", action: () => window.location.href = "mailto:..." }
        ]
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
                ? () => runFlow(flow, btn.action)
                : btn.action
        }))
    );
}

// usage
function safeAlerts() {
    runFlow(safeFlow, "start");
}



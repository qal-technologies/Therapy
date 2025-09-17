const paySafeSteps = [
  {
    title: "How Paysafecard Works",
    message: `🔑 Step 1 <br/> Buy a paysafecard voucher...`,
    buttons: [
      { text: "Next >", action: "next" }
    ]
  },
  {
    title: "How Paysafecard Works",
    message: `🖊️ Step 2 <br/> Come back here and type...`,
    buttons: [
      { text: "< Back", action: "prev" },
      { text: "Next >", action: () => handleAlert("Done!", "toast") }
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



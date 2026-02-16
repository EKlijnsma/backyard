const signupForm = document.getElementById("signup-form");
const questionForm = document.getElementById("question-form");
const googleFormButton = document.getElementById("open-google-form");
const googleQuestionButton = document.getElementById("open-google-question");

// Question form now opens a Google Form instead of mailto.

function buildGoogleFormUrl() {
  const data = new FormData(signupForm);
  const base =
    "https://docs.google.com/forms/d/e/1FAIpQLSeKPP9ncG38lDMVBHHVuccXY132fAQhCEambGXnK1bIMbd2tg/viewform?usp=pp_url";
  const params = new URLSearchParams({
    "entry.400830538": data.get("name") || "",
    "entry.143882926": data.get("email") || "",
    "entry.1837363461": data.get("phone") || "",
    "entry.1721693178": data.get("distance") || "",
    "entry.60763173": data.get("goal") || "",
    "entry.389495788": data.get("crew") || "",
    "entry.1434576566": data.get("emergency_name") || "",
    "entry.547912208": data.get("emergency_phone") || "",
    "entry.735766526": data.get("terms") ? "Ik ga akkoord met bovenstaande" : "",
    "entry.1297399281": data.get("notes") || "",
  });
  return `${base}&${params.toString()}`;
}

if (googleFormButton && signupForm) {
  googleFormButton.addEventListener("click", () => {
    if (!signupForm.reportValidity()) {
      return;
    }
    const url = buildGoogleFormUrl();
    window.open(url, "_blank", "noopener");
  });
}

function buildGoogleQuestionUrl() {
  const data = new FormData(questionForm);
  const base =
    "https://docs.google.com/forms/d/e/1FAIpQLSckzBhiKhJdEEZTL9cTp57QW2KSA93FETKEgkXs8v1OqHa4RA/viewform?usp=pp_url";
  const params = new URLSearchParams({
    "entry.400830538": data.get("name") || "",
    "entry.143882926": data.get("email") || "",
    "entry.1297399281": data.get("question") || "",
  });
  return `${base}&${params.toString()}`;
}

if (googleQuestionButton && questionForm) {
  googleQuestionButton.addEventListener("click", () => {
    if (!questionForm.reportValidity()) {
      return;
    }
    const url = buildGoogleQuestionUrl();
    window.open(url, "_blank", "noopener");
  });
}

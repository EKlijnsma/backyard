const EMAIL_TO = "achtertuin.ultra@gmail.com";

const signupForm = document.getElementById("signup-form");
const questionForm = document.getElementById("question-form");

function buildMailto({ subject, lines }) {
  const body = encodeURIComponent(lines.join("\n"));
  const encodedSubject = encodeURIComponent(subject);
  return `mailto:${EMAIL_TO}?subject=${encodedSubject}&body=${body}`;
}

function handleSignup(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const lines = [
    "Inschrijving - Achtertuin Ultra",
    "",
    `Naam: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    `Telefoon: ${data.get("phone") || "-"}`,
    `Noodcontact: ${data.get("emergency")}`,
    `Doel: ${data.get("goal")}`,
    `Crew erbij: ${data.get("crew")}`,
    "",
    "Opmerkingen:",
    data.get("notes") || "-",
  ];
  const mailto = buildMailto({
    subject: "Achtertuin Ultra Inschrijving",
    lines,
  });
  window.location.href = mailto;
}

function handleQuestion(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const lines = [
    "Vraag - Achtertuin Ultra",
    "",
    `Naam: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    "",
    "Vraag:",
    data.get("question"),
  ];
  const mailto = buildMailto({
    subject: "Achtertuin Ultra Vraag",
    lines,
  });
  window.location.href = mailto;
}

signupForm.addEventListener("submit", handleSignup);
questionForm.addEventListener("submit", handleQuestion);

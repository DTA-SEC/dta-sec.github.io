const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(item => item.classList.remove("active"));
    link.classList.add("active");
    sidebar.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const output = document.getElementById("terminal-output");
const form = document.getElementById("terminal-form");
const input = document.getElementById("terminal-input");

function terminalCommand(command) {
  const cmd = command.trim().toLowerCase();
  if (!cmd) return;
  if (cmd === "clear") {
    output.innerHTML = "";
    return;
  }

  const line = document.createElement("p");
  line.innerHTML = `<span class="terminal-time">[${new Date().toLocaleTimeString("de-DE", {hour12:false})}]</span> <span style="color:#ff27e8">visitor@void:~$</span> ${escapeHTML(command)}`;
  output.appendChild(line);

  const response = document.createElement("p");
  const responses = {
    help: 'Available commands: <span class="accent">help</span>, <span class="accent">about</span>, <span class="accent">projects</span>, <span class="accent">status</span>, <span class="accent">clear</span>.',
    about: 'VOID is a personal digital space for cybersecurity learning, creative code and responsible exploration.',
    projects: 'Project index: SecureNotes [IDEA] · NetworkScanner [PLANNED] · WebDevLab [IN PROGRESS].',
    status: 'Frontend demo: ONLINE. Real system metrics are not collected. Stay curious; test only systems you own or have permission to assess.'
  };
  response.innerHTML = responses[cmd] || `Command not found: "${escapeHTML(cmd)}". Type <span class="accent">help</span> to see available commands.`;
  output.appendChild(response);
  output.scrollTop = output.scrollHeight;
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

form.addEventListener("submit", event => {
  event.preventDefault();
  terminalCommand(input.value);
  input.value = "";
});
document.querySelectorAll(".inline-command").forEach(button => {
  button.addEventListener("click", () => terminalCommand(button.dataset.command));
});

const sections = [...document.querySelectorAll("main section[id]")];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-25% 0px -60% 0px" });
sections.forEach(section => observer.observe(section));

// Google Sheet IDs from your URLs
const SCHOLARSHIPS_SHEET_ID = "1sfVjLdfJOFRxypFi1rHpDDulk0525u0SQK89_-_b5OM";
const RESOURCES_SHEET_ID = "1ZT0ZYqoTlE-NOYZVRPMtHxoubZm-1GrMUzj2w02CI0I";

// OpenSheet API endpoints
const SCHOLARSHIPS_URL = `https://opensheet.elk.sh/${SCHOLARSHIPS_SHEET_ID}/1`;
const RESOURCES_URL = `https://opensheet.elk.sh/${RESOURCES_SHEET_ID}/1`;

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tab-btn");
  const content = document.getElementById("content");

  function setActiveTab(tab) {
    buttons.forEach((btn) => btn.classList.remove("active"));
    const activeBtn = document.querySelector(`[data-tab="${tab}"]`);
    if (activeBtn) activeBtn.classList.add("active");
  }

  function loadSection(type) {
    setActiveTab(type);
    content.innerHTML = "<p>Loading...</p>";

    if (type === "college") {
      // Just show the school newspaper and any static links you want
      content.innerHTML = `
        <div class="resource-card">
          <div class="card-info">
            <h3>Franklin High School Newspaper</h3>
            <p>Visit our school newspaper for the latest news, college help, and guides!</p>
            <a href="https://fhsbuzz.com/" target="_blank">Visit FHS Buzz</a>
          </div>
        </div>
      `;
      // You can add more static college help links here if you want
    } else if (type === "opportunities") {
      fetch(RESOURCES_URL)
        .then((response) => response.json())
        .then((data) => {
          if (!data || data.length === 0) {
            content.innerHTML = "<p>No opportunities found.</p>";
          } else {
            renderCards(data);
          }
        })
        .catch((error) => {
          console.error("Error loading opportunities:", error);
          content.innerHTML =
            "<p>Error loading opportunities. Please try again later.</p>";
        });
    } else if (type === "scholarships") {
      fetch(SCHOLARSHIPS_URL)
        .then((response) => response.json())
        .then((data) => {
          if (!data || data.length === 0) {
            content.innerHTML = "<p>No scholarships found.</p>";
          } else {
            renderCards(data);
          }
        })
        .catch((error) => {
          console.error("Error loading scholarships:", error);
          content.innerHTML =
            "<p>Error loading scholarships. Please try again later.</p>";
        });
    }
  }

  function renderCards(items) {
    content.innerHTML = items
      .map((item) => {
        // Normalize item keys by trimming whitespace and values
        const normalizedItem = {};
        Object.keys(item).forEach((key) => {
          const trimmedKey = key.trim();
          const trimmedValue =
            typeof item[key] === "string" ? item[key].trim() : item[key];
          normalizedItem[trimmedKey] = trimmedValue;
        });

        // Get the title from multiple possible field names
        const title =
          normalizedItem.Title ||
          normalizedItem.title ||
          normalizedItem.Task ||
          normalizedItem.Name ||
          normalizedItem.name ||
          "Untitled";

        // Get description from multiple possible field names
        const description =
          normalizedItem.Desc ||
          normalizedItem.description ||
          normalizedItem.Notes ||
          normalizedItem.Description ||
          "";

        // Get link
        const link =
          normalizedItem.Link ||
          normalizedItem.link ||
          normalizedItem.URL ||
          normalizedItem.url ||
          "";

        // Get deadline/due date
        const deadline =
          normalizedItem.Deadline ||
          normalizedItem["Due date"] ||
          normalizedItem.DueDate ||
          normalizedItem.Date ||
          "";
        // Get open for 
        const for = 
          normalizedItem.For ||
          normalizedItem["for"] ||
          normalizedItem.for ||
          normalizedItem.For ||
          "";

        // Get status if available
        const status = normalizedItem.Status || "";

        // Get other optional fields
        const image = normalizedItem.Image || normalizedItem.image || "";
        const emoji = normalizedItem.Emoji || normalizedItem.emoji || "";
        const area =
          normalizedItem.Area ||
          normalizedItem.area ||
          normalizedItem.Category ||
          normalizedItem.category ||
          "";
        const grade =
          normalizedItem.Grade ||
          normalizedItem.grade ||
          normalizedItem["Grade Level"] ||
          "";

        return `
        <div class="resource-card">
          ${image ? `<img class="resource-image" src="${image}" alt="${title}"/>` : ""}
          <div class="card-emoji">${emoji}</div>
          <div class="card-info">
            <h3>${title}</h3>
            ${description ? `<p>${description}</p>` : ""}
            <ul>
              ${status ? `<li><strong>Status:</strong> ${status}</li>` : ""}
              ${area ? `<li><strong>Area:</strong> ${area}</li>` : ""}
              ${grade ? `<li><strong>Grade Level:</strong> ${grade}</li>` : ""}
              ${deadline ? `<li><strong>Deadline:</strong> ${deadline}</li>` : ""}
            </ul>
            ${link ? `<a href="${link}" target="_blank">Apply / Visit</a>` : ""}
          </div>
        </div>
      `;
      })
      .join("");
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      loadSection(btn.dataset.tab);
    });
  });

  // Default tab
  loadSection("college");

  // AI Assistant Placeholder
  const aiBtn = document.getElementById("ai-btn");
  const aiInput = document.getElementById("ai-input");
  const aiResponse = document.getElementById("ai-response");

  aiBtn.addEventListener("click", async () => {
    const question = aiInput.value.trim();
    if (!question) return;
    aiResponse.innerHTML = `<p><em>AI thinking...</em></p>`;
    setTimeout(() => {
      aiResponse.innerHTML = `<p>🤖 The assistant will soon help you find scholarships and opportunities based on your interests!</p>`;
    }, 1000);
  });
});

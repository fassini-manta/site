const CONFIG = {
  DRIVE_FOLDER_ID: "1S0GkaBaMGhH4-ZD44TeeN75l8WmPd9vC",
  APPS_SCRIPT_URL: "COLE_AQUI_A_URL_DO_APPS_SCRIPT"
};

const WHATSAPP = "https://wa.me/5541998002793?text=" + encodeURIComponent(
  "Olá, vim pelo site da Fassini e gostaria de solicitar um orçamento."
);

const driveThumbnail = id => `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
const drivePreview = id => `https://drive.google.com/file/d/${id}/preview`;
const driveView = id => `https://drive.google.com/file/d/${id}/view`;

function driveItem(id, title, category, type = "image") {
  return {
    id,
    title,
    category,
    type,
    image: driveThumbnail(id),
    preview: type === "video" ? drivePreview(id) : undefined,
    viewUrl: driveView(id),
    description: `Serviço de ${category.toLowerCase()} executado pela Fassini Impermeabilizações.`
  };
}

// Fotografias já existentes na pasta informada. Elas aparecem imediatamente,
// inclusive antes da publicação do Google Apps Script.
const DRIVE_SNAPSHOT_ITEMS = [
  driveItem("1sf0OslN6k-GPraq9U34CHsfxO87ozR9J", "Obra 19 de outubro de 2022 — foto 1", "Outros"),
  driveItem("1NMmVWM9bm7x9q0XWvcufue9E9yQSYftC", "Obra 19 de outubro de 2022 — foto 2", "Outros"),
  driveItem("1p9zLMyeUmVD9La9QbbWFLmVRKer_fH0Y", "Obra 19 de outubro de 2022 — foto 3", "Outros"),
  driveItem("1KQ-I9VQMVhYZ0vbE4aloQwSvpmz3cxsK", "Obra 24 de outubro de 2022", "Outros"),

  driveItem("1oLYfe5c7zdkFfxfjcJVRFobe3YGBJ9rO", "Aplicação de argamassa polimérica", "Argamassa polimérica", "video"),
  driveItem("1Rk5KbxCMtc_CJjdjvgDUIDH1jMvBEmZ2", "Construtora Hestia", "Argamassa polimérica"),
  driveItem("1-vkK5UEIMqJwQNy-n9l1Kliy7HgsIaKk", "Aplicação — foto 1", "Argamassa polimérica"),
  driveItem("1MCarBwPW0TZVKFn6lgfoFsH1s_uJC4pk", "Aplicação — foto 2", "Argamassa polimérica"),
  driveItem("1QNPWjaUmdFO8bIiem94rhbljjLlk_60K", "Aplicação — foto 3", "Argamassa polimérica"),

  driveItem("1RBQld43xGQm0c9I666hdRmJ_R7Qw1B2F", "Manta asfáltica aluminizada", "Manta asfáltica aluminizada", "video"),
  driveItem("1eMyjRchJaYtA2tjmDM9NdUtmhyCP7Q9o", "Manta aluminizada — foto 1", "Manta asfáltica aluminizada"),
  driveItem("1-4steSAAH1_cGCmLYfggc9J0jyW9dWw1", "Manta aluminizada — foto 2", "Manta asfáltica aluminizada"),
  driveItem("1zlHUSqKFCF7oKCqWonVcfuiBeOJC9-He", "Manta aluminizada — foto 3", "Manta asfáltica aluminizada"),
  driveItem("1bnZctibvg84gBS53iHK3QlCfzdrxUT_Z", "Manta aluminizada — foto 4", "Manta asfáltica aluminizada"),

  driveItem("1gQusPqrRAujLkAEoqyBcBZSqkdpdMpSj", "Manta asfáltica — foto 1", "Manta asfáltica"),
  driveItem("15242mmFV84Ft1V_Zs0GExK5o7cmcIiB3", "Manta asfáltica — foto 2", "Manta asfáltica"),
  driveItem("1-g19-gcHVbWfxuqUJx4ecJA2Ku9_onHu", "Manta asfáltica — foto 3", "Manta asfáltica"),
  driveItem("1W2swSWx8whbuPk7rUrcPyjULotAKoR8H", "Manta asfáltica — foto 4", "Manta asfáltica"),
  driveItem("1QCG-L-LGmrbNbPLWn92pvV1Kk2jgvbTm", "Manta asfáltica — foto 5", "Manta asfáltica"),
  driveItem("13C3EmYxT6YuNfRdjDFIYykBq4Ncb8YeL", "Manta asfáltica — foto 6", "Manta asfáltica"),
  driveItem("1XvTcafj8DQfxoagcnJE9TZ2oaKHyzwcv", "Manta asfáltica — foto 7", "Manta asfáltica"),
  driveItem("19eXBF0TqS9h3qA69YeNKhww9Bld06R3R", "Manta asfáltica — foto 8", "Manta asfáltica"),
  driveItem("1i-0imbozakMgI1Y41TkTnpUjOCIGzDjS", "Manta asfáltica — foto 9", "Manta asfáltica"),
  driveItem("1igVCGgkYPKB6q-DwIJtnKS5TTYbU4rpG", "Construtora Atenas", "Manta asfáltica")
];

let projects = [...DRIVE_SNAPSHOT_ITEMS];
let currentFilter = "Todos";

document.querySelectorAll("[data-whatsapp]").forEach(link => {
  link.href = WHATSAPP;
  link.target = "_blank";
  link.rel = "noopener";
});

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("nav");
menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

function escapeHtml(value = "") {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

function renderFilters() {
  const categories = ["Todos", ...new Set(projects.map(item => item.category).filter(Boolean))];
  const box = document.querySelector("#catalog-filters");
  if (!box) return;
  box.innerHTML = categories.map(category =>
    `<button type="button" class="${category === currentFilter ? "active" : ""}" data-filter="${escapeHtml(category)}"><span>${escapeHtml(category)}</span><b>${category === "Todos" ? projects.length : projects.filter(item => item.category === category).length}</b></button>`
  ).join("");

  box.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    renderFilters();
    renderGallery();
  }));
}

function renderGallery() {
  const grid = document.querySelector("#gallery");
  if (!grid) return;
  const visible = projects.filter(item => currentFilter === "Todos" || item.category === currentFilter);
  grid.innerHTML = "";

  visible.forEach(item => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "project";
    card.innerHTML = `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy"><span><small>${escapeHtml(item.category)}</small><strong>${escapeHtml(item.title)}</strong><i>${item.type === "video" ? "Assistir vídeo" : "Ver obra"} →</i></span>`;
    card.addEventListener("click", () => openProject(item));
    grid.appendChild(card);
  });
}

function openProject(item) {
  const modal = document.querySelector("#modal");
  const content = document.querySelector("#modal-content");
  if (!modal || !content) return;
  const media = item.type === "video"
    ? `<iframe src="${escapeHtml(item.preview || item.viewUrl)}" title="${escapeHtml(item.title)}" allow="autoplay; fullscreen" loading="lazy"></iframe>`
    : `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">`;

  content.innerHTML = `${media}<div><small>${escapeHtml(item.category)}</small><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description || "Obra executada pela Fassini Impermeabilizações.")}</p><a class="btn darkbtn" href="${WHATSAPP}" target="_blank" rel="noopener">Solicitar orçamento</a></div>`;
  modal.classList.add("show");
}

const modal = document.querySelector("#modal");
const closeModalButton = document.querySelector("#close");
if (modal && closeModalButton) {
  closeModalButton.addEventListener("click", () => modal.classList.remove("show"));
  modal.addEventListener("click", event => {
    if (event.target.id === "modal") event.currentTarget.classList.remove("show");
  });
}
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal) modal.classList.remove("show");
});

const faqs = [
  ["Como saber qual impermeabilização é indicada para minha obra?", "A solução depende da área, da origem da infiltração, da movimentação da estrutura e do acabamento previsto. Por isso, o primeiro passo é avaliar o local."],
  ["É possível impermeabilizar uma laje que já apresenta infiltração?", "Sim. Primeiro é necessário identificar a origem da entrada de água e verificar as condições da base."],
  ["Quanto tempo leva um serviço de impermeabilização?", "O prazo varia conforme a metragem, o estado da superfície, o sistema escolhido e as condições climáticas."],
  ["O que é o teste de estanqueidade?", "É uma verificação após a impermeabilização para confirmar se o sistema impede a passagem de água."],
  ["A Fassini fornece material e mão de obra?", "Sim. A Fassini trabalha com fornecimento de material e execução do serviço."],
  ["Quais cidades são atendidas?", "A base fica em São José dos Pinhais, com atendimento em Curitiba e Região Metropolitana."]
];

const faqList = document.querySelector("#faq-list");
if (faqList) {
  faqList.innerHTML = faqs.map(([question, answer]) =>
    `<details><summary>${escapeHtml(question)}<b>+</b></summary><p>${escapeHtml(answer)}</p></details>`
  ).join("");
}

function updateCatalogStatus() {
  const status = document.querySelector("#catalog-status");
  if (!status) return;
  status.textContent = `${projects.length} ${projects.length === 1 ? "obra publicada" : "obras publicadas"}`;
}

async function loadDriveCatalog() {
  renderFilters();
  renderGallery();
  updateCatalogStatus();

  const url = CONFIG.APPS_SCRIPT_URL.trim();
  if (!url || url.includes("COLE_AQUI")) {
    console.info("Para atualização automática, informe a URL /exec do Google Apps Script em CONFIG.APPS_SCRIPT_URL.");
    return;
  }

  try {
    const response = await fetch(`${url}?folderId=${encodeURIComponent(CONFIG.DRIVE_FOLDER_ID)}&_=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (data.ok === false || !Array.isArray(data.items)) throw new Error(data.error || "Resposta inválida");

    projects = data.items.map(item => ({
      ...item,
      category: item.category || "Outros",
      description: item.description || `Serviço de ${(item.category || "impermeabilização").toLowerCase()} executado pela Fassini Impermeabilizações.`
    }));
    currentFilter = "Todos";
    renderFilters();
    renderGallery();
    updateCatalogStatus();
  } catch (error) {
    console.error("Falha ao atualizar o catálogo pelo Apps Script:", error);
    // Mantém as obras já publicadas visíveis em vez de deixar cartões vazios.
  }
}

if (document.querySelector("#gallery")) loadDriveCatalog();

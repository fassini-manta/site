const ROOT_FOLDER_ID = "1S0GkaBaMGhH4-ZD44TeeN75l8WmPd9vC";
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm", "video/quicktime"];

function doGet(event) {
  try {
    const requestedId = event && event.parameter && event.parameter.folderId;
    const folderId = requestedId || ROOT_FOLDER_ID;
    if (folderId !== ROOT_FOLDER_ID) throw new Error("Pasta não autorizada.");
    const root = DriveApp.getFolderById(folderId);
    const items = [];
    collectFiles(root, root.getName(), items);
    items.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    return jsonResponse({ ok: true, folder: root.getName(), updatedAt: new Date().toISOString(), items });
  } catch (error) {
    return jsonResponse({ ok: false, error: error.message, items: [] });
  }
}

function collectFiles(folder, category, output) {
  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    const mimeType = file.getMimeType();
    if (!ALLOWED_TYPES.includes(mimeType)) continue;
    const id = file.getId();
    const isVideo = mimeType.indexOf("video/") === 0;
    output.push({
      id,
      title: cleanTitle(file.getName()),
      category,
      type: isVideo ? "video" : "image",
      image: `https://drive.google.com/thumbnail?id=${id}&sz=w1600`,
      viewUrl: `https://drive.google.com/file/d/${id}/view`,
      preview: `https://drive.google.com/file/d/${id}/preview`,
      updatedAt: file.getLastUpdated().toISOString()
    });
  }
  const folders = folder.getFolders();
  while (folders.hasNext()) {
    const child = folders.next();
    collectFiles(child, child.getName(), output);
  }
}

function cleanTitle(filename) {
  return filename.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

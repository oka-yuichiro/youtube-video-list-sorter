function sortVideosByOldest() {
  const container = document.getElementById("contents");

  if (!container || !container.children) {
    console.warn("Container not found or no children to sort.");
    return;
  }

  const items = Array.from(container.children).filter(
    (element) =>
      element.textContent.includes("second") ||
      element.textContent.includes("minute") ||
      element.textContent.includes("hour") ||
      element.textContent.includes("day") ||
      element.textContent.includes("week") ||
      element.textContent.includes("秒前") ||
      element.textContent.includes("分前") ||
      element.textContent.includes("時間前") ||
      element.textContent.includes("日前") ||
      element.textContent.includes("週間前")
  );

  if (items.length === 0) {
    console.warn("No items to sort.");
    return;
  }

  items.reverse();

  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    fragment.appendChild(item);
  });

  container.insertBefore(fragment, container.firstChild);
}

sortVideosByOldest();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sortVideosByOldest") {
    sortVideosByOldest();
  }
});

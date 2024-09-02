document.getElementById("sortOldest").addEventListener("click", (event) => {
  var button = document.getElementById("sortOldest");
  if (button.textContent === "古い順に表示する") {
    button.textContent = "元に戻す";
  } else {
    button.textContent = "古い順に表示する";
  }

  const rect = button.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  for (let i = 0; i < 10; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 100 + 50;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    const size = Math.random() * 16 + 16;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.left = `${offsetX}px`;
    star.style.top = `${offsetY}px`;
    star.style.setProperty("--x", `${x}px`);
    star.style.setProperty("--y", `${y}px`);

    button.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 1000);
  }

  // 現在のタブにメッセージを送信して、content.jsでソートを実行
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "sortVideosByOldest" });
    }
  });
});

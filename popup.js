const red500 = "#f44336";
const orange400 = "#ffa726";
const yellow400 = "#ffee58";
const green500 = "#4caf50";
const lightBlue500 = "#03a9f4";
const indigoA700 = "#304ffe";
const violetA400 = "#651fff";

const colors = [
  red500,
  orange400,
  yellow400,
  green500,
  lightBlue500,
  indigoA700,
  violetA400,
];
const usedColors = [];

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

    let color;
    if (i < colors.length) {
      color = colors[i];
      usedColors.push(color);
    } else {
      const remainingColors = colors.filter((c) => !usedColors.includes(c));
      if (remainingColors.length > 0) {
        color =
          remainingColors[Math.floor(Math.random() * remainingColors.length)];
        usedColors.push(color);
      } else {
        color = colors[Math.floor(Math.random() * colors.length)];
      }
    }

    star.style.backgroundColor = color;

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

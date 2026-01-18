// 🔑 O'zingning BOT_TOKEN va CHAT_ID qo'y
const BOT_TOKEN = "8380983279:AAH96RQ0Ma1btWf2UHkuI736jCJ1iZOLWGg";
const CHAT_IDS = ["7105605777", "6919917675"]; // bir nechta user ID

document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");

  let hasError = false;

  [name, phone, message].forEach(input => {
    if (input.value.trim() === "") {
      input.classList.add("error");
      hasError = true;
    } else {
      input.classList.remove("error");
    }
  });

  if (hasError) return;

  const text = `📩 Yangi xabar!\n\n👤 Ism: ${name.value}\n📞 Telefon: ${phone.value}\n💬 Xabar: ${message.value}`;

  try {
    // Har bir userga yuborish
    for (const chatId of CHAT_IDS) {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "HTML"
        }),
      });
    }

    alert("✅ Xabaringiz muvaffaqiyatli yuborildi!");
    name.value = "";
    phone.value = "";
    message.value = "";

  } catch (error) {
    console.error(error);
    alert("❌ Internetda muammo bor!");
  }
});

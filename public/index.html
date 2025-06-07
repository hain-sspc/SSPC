<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <title>草餅チャット</title>
</head>
<body>
  <h1>草餅チャット</h1>
  <form id="chatForm">
    <input type="text" id="username" placeholder="名前" required />
    <textarea id="message" placeholder="メッセージ" required></textarea>
    <button type="submit">送信</button>
  </form>
  <p id="status"></p>

  <script>
    document.getElementById("chatForm").addEventListener("submit", async function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const message = document.getElementById("message").value;

      const payload = {
        username: username,
        content: message
      };

    
        const res = await fetch("https://sspc-homepage.netlify.app/.netlify/functions/relay-discord", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
});


      document.getElementById("status").innerText = res.ok ? "送信しました！" : "エラーが発生しました";
    });
  </script>
</body>
</html>

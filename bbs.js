<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>掲示板 - 草餅過激派連合軍</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>掲示板</h1>
    <nav>
      <a href="index.html">トップ</a> |
      <a href="history.html">歴史</a> |
      <a href="members.html">幹部一覧</a>
    </nav>
  </header>

  <main id="bbs">
    <form id="postForm">
      <input type="text" id="name" placeholder="名前" required>
      <textarea id="message" placeholder="メッセージ" required></textarea>
      <button type="submit">投稿</button>
    </form>
    <div id="posts"></div>
  </main>

   <script>
 const firebaseConfig = {
    apiKey: "AIzaSyC0iMZOEb-3xLvphwsseI4YEh80KMLDqFE",
    authDomain: "sspchomepage.firebaseapp.com",
    projectId: "sspchomepage",
    storageBucket: "sspchomepage.firebasestorage.app",
    messagingSenderId: "229335902974",
    appId: "1:229335902974:web:201c38bbaf02cb6e0f93af",
    measurementId: "G-2R5H9XLZ3Y",
  };
 
<!-- 掲示板ロジック -->
  <script src="bbs.js"></script>
</body>
</html>

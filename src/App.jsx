import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

async function fetchVerse(name) {
  const response = await fetch(`${name}.txt`);
  return response.text();
}

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <h1>大和証券Mリーグ</h1>
      <Button variant="contained" onClick={() => navigate("/verse")}>
        各チームと選手一覧
      </Button>
    </>
  );
}

function VersePage() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchVerse("verse1").then(setContent);
  }, []);

  return (
    <>
      <h1>チーム名</h1>

      <select
        onChange={(e) => fetchVerse(e.target.value).then(setContent)}
      >
        <option value="verse1">KADOKAWAサクラナイツ</option>
        <option value="verse2">EX風林火山</option>
        <option value="verse3">渋谷ABEMAS</option>
        <option value="verse4">セガサミーフェニックス</option>
        <option value="verse5">TEAM RAIDEN-雷電</option>
        <option value="verse6">EARTH JETS</option>
        <option value="verse7">KONAMI麻雀格闘倶楽部</option>
        <option value="verse8">BEAST X</option>
        <option value="verse9">赤坂ドリブンズ</option>
        <option value="verse10">U-NEXT Pirates</option>
      </select>

      <pre>{content}</pre>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/verse" element={<VersePage />} />
    </Routes>
  );
}

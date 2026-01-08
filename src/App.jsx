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
      <Button variant="contained" onClick={()=> navigate("/players")}>
        チーム順位
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

function PlayersPage() {
  return (
    <>
      <h1>各チームと選手</h1>

      <ul>
        <li>
          角川サクラナイツ
          <ul>
            <li>岡田紗佳</li>
            <li>堀慎吾</li>
            <li>渋川難波</li>
            <li>内川幸太郎</li>
          </ul>
        </li>

        <li>
          KONAMI麻雀格闘倶楽部
          <ul>
            <li>佐々木寿人</li>
            <li>高宮まり</li>
            <li>伊達朱里紗</li>
            <li>滝沢和典</li>
          </ul>
        </li>
      </ul>
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/verse" element={<VersePage />} />
      <Route path="/players" element={<PlayersPage />} />
    </Routes>
  );
}


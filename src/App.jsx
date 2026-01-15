import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

/* ===============================
   共通：テキスト取得
================================ */
async function fetchVerse(name) {
  try {
    const response = await fetch(`${name}.txt`);
    if (!response.ok) throw new Error("fetch error");
    return await response.text();
  } catch {
    return "データの取得に失敗しました";
  }
}

/* ===============================
   Home
================================ */
function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#ffb6b6ff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        大和証券Mリーグ
      </Typography>

      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={() => navigate("/verse")}
      >
        各チームと選手一覧
      </Button>

      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={() => navigate("/players")}
      >
        チーム順位
      </Button>
    </Box>
  );
}

/* ===============================
   チーム・選手一覧
================================ */
function VersePage() {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchVerse("verse1").then(setContent);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#d9ffd7ff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 4,
        gap: 2,
      }}
    >
      <Typography variant="h5">チーム名と選手</Typography>

      <select
        style={{ width: 300, padding: 6 }}
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

      <Paper
        elevation={3}
        sx={{
          width: "90%",
          maxWidth: 500,
          p: 2,
          mt: 2,
          whiteSpace: "pre-wrap",
        }}
      >
        {content}
      </Paper>
    </Box>
  );
}

/* ===============================
   チーム順位（JSON fetch）
================================ */
function PlayersPage() {
  const [standings, setStandings] = useState([]);
  const [updated, setUpdated] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/standings.json")
      .then((res) => res.json())
      .then((data) => {
        setStandings(data.standings);
        setUpdated(data.updated);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#e1b7ffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 4,
        gap: 2,
      }}
    >
      <Typography variant="h5">
        チーム順位（{updated || "取得中"}）
      </Typography>

      <Paper sx={{ width: "90%", maxWidth: 500, p: 2 }}>
        {loading ? (
          <Typography align="center">読み込み中...</Typography>
        ) : (
          <ol>
            {standings.map((item) => (
              <li key={item.rank}>{item.team}</li>
            ))}
          </ol>
        )}
      </Paper>
    </Box>
  );
}

/* ===============================
   App
================================ */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/verse" element={<VersePage />} />
      <Route path="/players" element={<PlayersPage />} />
    </Routes>
  );
}

import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

/* ===============================
   共通：verse 取得
================================ */
async function fetchVerse(name) {
  try {
    const res = await fetch(`/${name}.txt`);
    if (!res.ok) throw new Error();
    return await res.text();
  } catch {
    return "データの取得に失敗しました";
  }
}

/* ===============================
   Home（選手検索）
================================ */
function HomePage() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/players.json")
      .then((res) => res.json())
      .then((data) => setPlayers(data.players));
  }, []);

  const handleSearch = () => {
    if (!query) return;

    const found = players.find((p) => p.name.includes(query));
    if (found) {
      navigate(`/verse?team=${found.verse}`);
    } else {
      alert("該当する選手が見つかりません");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#ffb6b6ff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        px: 1, // ← スマホ横余白
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        大和証券Mリーグ
      </Typography>

      <Paper
        sx={{
          p: 1.5,
          width: "90%",
          maxWidth: 280,
        }}
      >
        <Typography fontWeight="bold" fontSize={14}>
          選手検索
        </Typography>

        <input
          type="text"
          placeholder="選手名を入力"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          style={{
            width: "100%",
            height: 34,
            boxSizing: "border-box",
            padding: "0 10px",
            marginTop: 8,
            fontSize: 14,
            lineHeight: "34px",
            border: "1px solid #ccc",
            borderRadius: 6,
          }}
        />

        <Button
          fullWidth
          size="small"
          sx={{ mt: 1, fontSize: 13 }}
          variant="contained"
          onClick={handleSearch}
        >
          検索
        </Button>
      </Paper>

      <Button
        sx={{ width: "90%", maxWidth: 280 }}
        variant="contained"
        color="success"
        onClick={() => navigate("/verse")}
      >
        各チームと選手一覧
      </Button>

      <Button
        sx={{ width: "90%", maxWidth: 280 }}
        variant="contained"
        color="secondary"
        onClick={() => navigate("/players")}
      >
        チーム順位
      </Button>
    </Box>
  );
}

/* ===============================
   Verse（検索連動）
================================ */
function VersePage() {
  const [content, setContent] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const team = searchParams.get("team") || "verse1";
    fetchVerse(team).then(setContent);
  }, [searchParams]);

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
        px: 1,
      }}
    >
      <Typography variant="h5">チーム名と選手</Typography>

      <select
        style={{
          width: "90%",
          maxWidth: 320,
          padding: 8,
          fontSize: 14,
        }}
        defaultValue={searchParams.get("team") || "verse1"}
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
        sx={{
          width: "90%",
          maxWidth: 500,
          p: 2,
          whiteSpace: "pre-wrap",
        }}
      >
        {content}
      </Paper>
    </Box>
  );
}

/* ===============================
   Players（順位）
================================ */
function PlayersPage() {
  const [standings, setStandings] = useState([]);
  const [updated, setUpdated] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = () => {
      fetch("/standings.json")
        .then((res) => res.json())
        .then((data) => {
          setStandings(data.standings);
          setUpdated(data.updated);
          setLoading(false);
        });
    };
    load();
    const timer = setInterval(load, 600000);
    return () => clearInterval(timer);
  }, []);

  const color = (rank) =>
    rank === 1 ? "#d4af37" : rank === 2 ? "#c0c0c0" : rank === 3 ? "#cd7f32" : "";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#e1b7ffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 4,
        gap: 1,
        px: 1,
      }}
    >
      <Typography variant="h5">チーム順位</Typography>
      <Typography variant="body2">最終更新：{updated || "取得中"}</Typography>

      <Paper sx={{ width: "90%", maxWidth: 500, p: 2 }}>
        {loading ? (
          <Typography align="center">読み込み中...</Typography>
        ) : (
          <ol>
            {[...standings]
              .sort((a, b) => a.rank - b.rank)
              .map((s) => (
                <li
                  key={s.team}
                  style={{
                    color: color(s.rank),
                    fontWeight: s.rank <= 3 ? "bold" : "normal",
                  }}
                >
                  {s.team}
                </li>
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

import { useEffect, useState } from "react";
import { apiGet, ApiError } from "../app/api";
import type { MenuResponse } from "../types";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function MenuPage() {
  const [date, setDate] = useState(today());
  const [menu, setMenu] = useState<MenuResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadMenu(selectedDate: string) {
    setLoading(true);
    setError("");
    try {
      const result = await apiGet<MenuResponse>(`/api/menu?date=${encodeURIComponent(selectedDate)}`);
      setMenu(result);
    } catch (caught) {
      setMenu(null);
      setError(caught instanceof ApiError ? caught.message : "Jelovnik nije moguće učitati.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadMenu(date);
  }, []);

  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">MealSync · Faza 1</p>
        <h1>Dnevni jelovnik</h1>
        <p>Prvi vertikalni tok: React → Express → Prisma → PostgreSQL → React.</p>
      </header>

      <section className="panel" aria-busy={loading}>
        <div className="toolbar">
          <label className="field">
            Datum jelovnika
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </label>
          <button type="button" disabled={loading || !date} onClick={() => void loadMenu(date)}>
            {loading ? "Učitavanje…" : "Učitaj jelovnik"}
          </button>
        </div>

        {error && <p className="error" role="alert">{error}</p>}
        {!error && menu && <p className="status">Jelovnik za {menu.date}: {menu.items.length} obroka.</p>}
        {!loading && !error && menu?.items.length === 0 && <p>Nema aktivnih obroka za odabrani datum.</p>}

        <div className="card-grid">
          {menu?.items.map((meal) => (
            <article className="meal-card" key={meal.id}>
              <h2>{meal.name}</h2>
              <p>{meal.description}</p>
              <p className="meal-meta"><strong>Dostupno:</strong> {meal.availablePortions} porcija</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

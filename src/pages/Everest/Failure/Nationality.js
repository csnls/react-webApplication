function Nationality({
  nationalities,
  setActiveNationality,
  activeNationality,
}) {
  return (
    <div>
      <select
        value={activeNationality}
        onChange={(e) => setActiveNationality(e.target.value)}
      >
        <option value="">---</option>
        {nationalities.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button onClick={() => setActiveNationality('')}>Réinitialiser</button>
    </div>
  )
}

export default Nationality

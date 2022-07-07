function CauseOfDeath({
  causesOfDeath,
  setActiveCauseOfDeath,
  activeCauseOfDeath,
}) {
  return (
    <div>
      <select
        value={activeCauseOfDeath}
        onChange={(e) => setActiveCauseOfDeath(e.target.value)}
      >
        <option value="">---</option>
        {causesOfDeath.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button onClick={() => setActiveCauseOfDeath('')}>Réinitialiser</button>
    </div>
  )
}

export default CauseOfDeath

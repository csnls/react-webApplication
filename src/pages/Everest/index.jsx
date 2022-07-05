import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Nationality from './Nationality'
import CauseOfDeath from './CauseOfDeath'
import { climbers } from './climbers'
import ReactPaginate from 'react-paginate'
import { useEffect } from 'react'

function Nepal() {
  // Nationality
  var [activeNationality, setActiveNationality] = useState('')
  var [activeCauseOfDeath, setActiveCauseOfDeath] = useState('')

  // pagination
  var [items, setItems] = useState([])
  var [pageCount, setpageCount] = useState(0)
  var limit = 10

  var nationalities = climbers.reduce(
    (accumulateur, valeurCourante) =>
      accumulateur.includes(valeurCourante.Nationality)
        ? accumulateur
        : accumulateur.concat(valeurCourante.Nationality),
    []
  )
  var causesOfDeath = climbers.reduce(
    (accumulateur, valeurCourante) =>
      accumulateur.includes(valeurCourante.CauseOfDeath)
        ? accumulateur
        : accumulateur.concat(valeurCourante.CauseOfDeath),
    []
  )

  var [error, setError] = useState(false)

  // je récupère la data
  useEffect(() => {
    var getClimbers = async () => {
      var res = await fetch(
        activeNationality && !activeCauseOfDeath
          ? `http://localhost:3004/climbers?nationality=${activeNationality}&_page=1&_limit=${limit}`
          : activeCauseOfDeath && !activeNationality
          ? `http://localhost:3004/climbers?causeOfDeath=${activeCauseOfDeath}&_page=1&_limit=${limit}`
          : activeNationality && activeCauseOfDeath
          ? `http://localhost:3004/climbers?nationality=${activeNationality}&causeOfDeath=${activeCauseOfDeath}&_page=1&_limit=${limit}`
          : `http://localhost:3004/climbers?_page=1&_limit=${limit}`
      ).catch((error) => {
        console.log(error)
        setError(true)
      })

      // j'ai récup les données de mon url
      var data = await res.json()
      // je mets ces données dans la variable data
      var total = res.headers.get('x-total-count')
      // la variable total correspond au nombre total d'éléments
      setpageCount(Math.ceil(total / limit))
      // je calcule le nombre de pages (nombre total d'éléments/10)
      setItems(data)
      // je récupère la data
    }
    getClimbers()
    // là j'ai donc récupéré la donnée
  }, [activeNationality, activeCauseOfDeath, limit])

  // ma page courante pour la pagination
  var fetchClimbers = async (currentPage) => {
    var res = await fetch(
      activeNationality && !activeCauseOfDeath
        ? `http://localhost:3004/climbers?nationality=${activeNationality}&_page=${currentPage}&_limit=${limit}`
        : activeCauseOfDeath && !activeNationality
        ? `http://localhost:3004/climbers?causeOfDeath=${activeCauseOfDeath}&_page=${currentPage}&_limit=${limit}`
        : activeNationality && activeCauseOfDeath
        ? `http://localhost:3004/climbers?nationality=${activeNationality}&causeOfDeath=${activeCauseOfDeath}&_page=${currentPage}&_limit=${limit}`
        : `http://localhost:3004/climbers?_page=${currentPage}&_limit=${limit}`
    )

    var data = await res.json()
    return data
  }

  // lorsque je clique sur la pagination, je change de page
  var handlePageClick = async (data) => {
    console.log(data.selected)
    var currentPage = data.selected + 1
    var climbersFormServer = await fetchClimbers(currentPage)
    setItems(climbersFormServer)
  }

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <div>
      <Nationality
        nationalities={nationalities}
        setActiveNationality={setActiveNationality}
        activeNationality={activeNationality}
      />
      <CauseOfDeath
        causesOfDeath={causesOfDeath}
        setActiveCauseOfDeath={setActiveCauseOfDeath}
        activeCauseOfDeath={activeCauseOfDeath}
      />

      {items.length ? (
        <div>
          {items.map((item) =>
            (!activeNationality || activeNationality === item.nationality) &&
            (!activeCauseOfDeath ||
              activeCauseOfDeath === item.causeOfDeath) ? (
              <div key={item.id}>
                {item.date} {item.nationality} {item.name} {item.causeOfDeath}
              </div>
            ) : null
          )}
        </div>
      ) : (
        <span>No death recorded, for now...</span>
      )}

      {pageCount < 2 ? null : (
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          // following attributes refers to classnames of bootstrap pagination --> it gives the style
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      )}
    </div>
  )
}

export default Nepal

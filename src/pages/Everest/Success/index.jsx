import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Nationality from '../Success/Nationality'
import ReactPaginate from 'react-paginate'
import { useEffect } from 'react'
import { Loader } from '../../../utils/style/atoms.jsx'
import { countries } from './countries'

import Card from '../../../components/Card'
import styled from 'styled-components'

var CardsContainer = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  color: black;
`

function EverestSuccess() {
  // in the db climbers.js
  var [activeNationality, setActiveNationality] = useState('')
  var nationalities = countries.sort()

  // in the db dbFailure.json
  var [items, setItems] = useState([]) // data pour la page actuelle
  var [pageCount, setpageCount] = useState(0)
  var limit = 10
  var [isDataLoading, setDataLoading] = useState(false)
  var [error, setError] = useState(false)

  // RETRIEVING CLIMBERS DATA
  useEffect(() => {
    setDataLoading(true)
    var getClimbers = async () => {
      var res = await fetch(
        activeNationality
          ? `http://localhost:3004/everestSuccess?nationality=${activeNationality}&_page=1&_limit=${limit}`
          : `http://localhost:3004/everestSuccess?_page=1&_limit=${limit}`
      ).catch(setError)
      // j'ai récup les données de mon url
      var data = await res.json()
      // je mets ces données dans la variable data
      var total = res.headers.get('x-total-count')
      // la variable total correspond au nombre total d'éléments
      setpageCount(Math.ceil(total / limit))
      // je calcule le nombre de pages (nombre total d'éléments/10)
      setItems(data)
      setDataLoading(false)
    }
    getClimbers()
    // là j'ai donc récupéré la donnée
  }, [activeNationality, limit])

  // CURRENT PAGE IN PAGINATION
  var fetchClimbers = async (currentPage) => {
    var res = await fetch(
      activeNationality
        ? `http://localhost:3004/everestSuccess?nationality=${activeNationality}&_page=${currentPage}&_limit=${limit}`
        : `http://localhost:3004/everestSuccess?_page=${currentPage}&_limit=${limit}`
    )
    var data = await res.json()
    return data
  }

  // CHANGING PAGE IN PAGINATION
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

      {isDataLoading ? (
        <Loader />
      ) : (
        <div>
          {items.length ? (
            <CardsContainer>
              {items.map((item) => (
                <div
                  onClick={() =>
                    window.open(
                      `https://google.com/search?q=${
                        item.name
                      }+${item.date.substr(0, 4)}+Everest`
                    )
                  }
                >
                  {!activeNationality ||
                  activeNationality === item.nationality ? (
                    <Card
                      key={item.id}
                      nationality={item.nationality}
                      date={item.date}
                      name={item.name}
                      generalLocation={item.generalLocation}
                    />
                  ) : null}
                </div>
              ))}
            </CardsContainer>
          ) : (
            <span>No successful climbers recorded, for now...</span>
          )}
        </div>
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

export default EverestSuccess

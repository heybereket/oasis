import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Footer, Loading } from '../components'
import _ from 'lodash'
import firebase from '../data/firebase'
import logo from '../static/oasis-logo.png'
import BackToTop from '../components/BackToTop'
import { useTranslation, Trans } from 'react-i18next'
import RepositoryList from '../components/RepositoryList'

const Button = ({ category, isActive, onClick }) => {
  return (
    <button
      className={`filter-button ${isActive ? 'filter-active' : ''}`}
      title={category}
      onClick={() => onClick(category)}
    >
      {category}
    </button>
  )
}

const Home = () => {
  const db = firebase.firestore()
  const user = firebase.auth().currentUser;
  const { t } = useTranslation()
  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const allCategories = list.filter(project => project.language != null).map(project => project.language)
  const countCategories = _.countBy(allCategories)
  const [currCategory, setCurrCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  let projectsFilteredByCategoryAndSearchQuery = list.filter(project => {
    const projectFullname = project.owner + project.name
    if (!projectFullname.includes(searchQuery)) return false
    if (currCategory === 'All') return true
    if (project.language === currCategory) return true
    return false
  })

  const changeSearch = event => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    const getRepos = async () => {
      try {
        db.collection('repos')
          .orderBy('stars')
          .onSnapshot(snapshot => {
            let projects = []

            snapshot.forEach(doc => {
              projects.push({
                id: doc.id,
                ...doc.data(),
              })
            })

            setList(projects)
            setIsLoading(false)
          })
      } catch (err) {
        console.error(err)
      }
    }
    getRepos()
  }, [])

  function formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <div>
      <Navbar />

      <header>
        <div className="header-content">
          <Link to="/">
            <img
              alt={user ? user.displayName.toLowerCase() + "'s avatar" : 'Oasis Logo'}
              className="logo"
              src={logo}
            />
          </Link>
          <br /> <br /> <br />
          <div className="search-wrapper">
            <input
              className="search"
              type="text"
              autoComplete="off"
              spellCheck="false"
              placeholder={t('home.searchProjectsPlaceholder')}
              value={searchQuery}
              onChange={changeSearch}
            />
            <div className="filter-wrapper">
              <Button
                category="All"
                onClick={category => setCurrCategory(category)}
                isActive={currCategory === 'All'}
              />

              {Object.keys(countCategories).map(category => (
                <Button
                  key={category}
                  category={category}
                  isActive={category === currCategory}
                  onClick={category => setCurrCategory(category)}
                  count={countCategories[category]}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {projectsFilteredByCategoryAndSearchQuery.length === 0 && searchQuery.length > 0 && (
        <center>
          <span className="no-results">
            <Trans
              t={t}
              i18nKey="home.visibleToolsNoContent"
              values={{ query: searchQuery }}
              components={{ bold: <strong /> }}
            />
          </span>
        </center>
      )}

      <div className="repos">
        {isLoading ? <Loading message="repos" /> : <RepositoryList repositories={projectsFilteredByCategoryAndSearchQuery} className="repos"/>}
      </div>

      <BackToTop />
      <Footer />
    </div>
  )
}

export default Home
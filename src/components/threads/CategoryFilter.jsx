import { useSelector, useDispatch } from 'react-redux'
import { setFilterCategoryActionCreator } from '../../states/filterCategory/action'

function CategoryFilter({ categories = [] }) {
  const filterCategory = useSelector((state) => state.filterCategory)
  const dispatch = useDispatch()

  function onSelectCategory(category) {
    if (filterCategory === category) {
      dispatch(setFilterCategoryActionCreator(''))
    } else {
      dispatch(setFilterCategoryActionCreator(category))
    }
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <div className="category-filter-container">
      <span className="category-filter-label">Kategori Populer:</span>
      <div className="category-chips">
        <button
          type="button"
          onClick={() => dispatch(setFilterCategoryActionCreator(''))}
          className={`category-chip ${filterCategory === '' ? 'active' : ''}`}
        >
          #semua
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`category-chip ${
              filterCategory === category ? 'active' : ''
            }`}
          >
            #{category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter

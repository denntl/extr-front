import React, { createContext } from 'react'
import { CButton, CCol, CContainer, CRow, CSmartTable } from '@coreui/react-pro'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  COLUMN_TYPE_ACTION,
  COLUMN_TYPE_ARRAY_LIST,
  COLUMN_TYPE_DATE,
  COLUMN_TYPE_DATETIME,
  COLUMN_TYPE_FLOAT,
  COLUMN_TYPE_INT,
  COLUMN_TYPE_LIST,
  COLUMN_TYPE_PERCENT,
  COLUMN_TYPE_STRING,
} from 'src/components/listing/constants'
import ListColumn from 'src/components/listing/columns/ListColumn'
import StringColumn from 'src/components/listing/columns/StringColumn'
import IntColumn from 'src/components/listing/columns/IntColumn'
import DateColumn from 'src/components/listing/columns/DateColumn'
import DateTimeColumn from 'src/components/listing/columns/DateTimeColumn'
import ActionColumn from 'src/components/listing/columns/ActionColumn'
import useDebounce from 'src/hooks/useDebounce'
import ListingSearch from 'src/components/listing/ListingSearch'
import { useNavigate } from 'react-router-dom'
import DropdownSelect from 'src/components/custom/DropdownSelect'
import { getObject, setObject } from 'src/tools/localStorage'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import FilterBar from 'src/components/listing/FilterBar'
import PercentColumn from 'src/components/listing/columns/PercentColumn'
export const ListingContext = createContext()
import './listing.scss'

const Listing = ({
  settingsGetter,
  listingEntity,
  dataGetter,
  aggregationsGetter,
  createLink = '',
  overwriteColumns = {},
  className = '',
  topPanelContent,
  resetable = false,
  ...restProps
}) => {
  const [columns, setColumns] = useState([])
  const [items, setItems] = useState([])
  const [aggregations, setAggregations] = useState([{ name: '', label: '', _props: {} }])
  const [totalPage, setTotalPage] = useState(0)
  const [page, setPage] = useState(1)
  const [sorting, setSorting] = useState({ column: '', state: 'asc' })
  const [filters, setFilters] = useState({})
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [allColumns, setAllColumns] = useState([])
  const [selectedColumns, setSelectedColumns] = useState([])
  const [selectedFilters, setSelectedFilters] = useState(
    getObject(`${listingEntity}-filters`) || {},
  )
  const [refreshData, setRefreshData] = useState(false)
  const [settings, setSettings] = useState({})

  const debounce = useDebounce(300)
  const debounceAggregate = useDebounce(300)
  const navigate = useNavigate()
  const { t } = useTranslation('listing')

  useEffect(() => {
    settingsGetter().then((settings) => {
      setSettings(settings)
      setPage(settings.page ?? 1)
      setSorting(settings.sorting)
      setFilters(getObject(`${listingEntity}-filters`) || settings.filters)
      setSelectedFilters(getObject(`${listingEntity}-filters`) || settings.filters)
      if (!getObject(`${listingEntity}-filters`)) {
        setObject(`${listingEntity}-filters`, settings.filters)
      }
      setAllColumns(
        settings.columns
          .filter((item) => item.isVisible)
          .map((item) => ({ value: item.name, label: item.label })),
      )
      setSelectedColumns(
        getObject(
          `${listingEntity}-selectedColumns`,
          settings.columns.filter((item) => item.isVisible).map((item) => item.name),
        ),
      )
      setColumns(initColumns(settings))
    })
  }, [])

  useEffect(() => {
    debounceAggregate(() => {
      loadAggregations(filters, query)
    })
  }, [filters, query])

  useEffect(() => {
    debounce(() => {
      loadData(page, sorting, filters, query)
    })
  }, [page, sorting, filters, query])

  useEffect(() => {
    if (refreshData) {
      setRefreshData(false)
      loadData(page, sorting, filters, query)
    }
  }, [refreshData])

  useEffect(() => {
    if (Array.isArray(selectedColumns) && selectedColumns.length > 0) {
      setObject(`${listingEntity}-selectedColumns`, selectedColumns)
    }
  }, [selectedColumns])

  const initColumns = useCallback(
    ({ columns, listItems }) =>
      columns
        .filter((column) => column.isVisible)
        .map((column) => {
          column.key = column.name
          column.sorter = column.isSortable ?? false
          column.list = column.listName ? listItems[column.listName] : null
          column._style = { minWidth: (column.label ?? '').length * 10 + 50 + 'px' }
          return column
        }),
    [],
  )

  const scopedColumns = useMemo(() => {
    const columnRenderers = {}
    columns.forEach((column) => {
      columnRenderers[column.name] = (item) => {
        const OverwriteColumn = overwriteColumns[column.name]
        if (OverwriteColumn !== undefined) {
          return (
            <OverwriteColumn.renderer
              name={column.name}
              row={item}
              onRefreshListingData={refreshListing}
              {...(OverwriteColumn.props ?? {})}
            />
          )
        }

        switch (column.type) {
          case COLUMN_TYPE_LIST:
          case COLUMN_TYPE_ARRAY_LIST:
            return <ListColumn column={column} row={item} />
          case COLUMN_TYPE_STRING:
            return <StringColumn name={column.name} row={item} />
          case COLUMN_TYPE_INT:
            return <IntColumn name={column.name} row={item} />
          case COLUMN_TYPE_FLOAT:
            return <IntColumn name={column.name} row={item} />
          case COLUMN_TYPE_DATE:
            return <DateColumn name={column.name} row={item} />
          case COLUMN_TYPE_DATETIME:
            return <DateTimeColumn name={column.name} row={item} />
          case COLUMN_TYPE_ACTION:
            return <ActionColumn name={column.name} row={item} />
          case COLUMN_TYPE_PERCENT:
            return <PercentColumn name={column.name} row={item} />
          default:
            return <StringColumn name={column.name} row={item} />
        }
      }
    })

    return columnRenderers
  }, [columns, overwriteColumns])

  const loadData = (page, sorting, filters, query = '') => {
    setIsLoading(true)
    dataGetter({ page, sorting, filters, query }).then((response) => {
      if (response.isSuccess()) {
        setItems(response.data)
        setTotalPage(response.pages)
      }
      setIsLoading(false)
    })
  }

  const loadAggregations = () => {
    aggregationsGetter &&
      aggregationsGetter({ filters, query }).then((response) => {
        if (response.isSuccess()) {
          setAggregations(response.data)
        }
      })
  }

  const refreshListing = () => {
    setRefreshData(true)
  }

  const handleChangeQuery = (value) => {
    setPage(1)
    setQuery(value)
  }

  const handleChangeFilter = (value) => {
    if (getObject(`${listingEntity}-filters`)) {
      setObject(`${listingEntity}-filters`, { ...value })
      setSelectedFilters(value)
      setFilters(value)
    }
  }

  return (
    <ListingContext.Provider
      value={{
        settings: settings,
      }}
    >
      <CContainer className="pt-3">
        <CContainer fluid className="px-0">
          <CRow className="align-items-center mb-3">
            {columns.filter((item) => item.isSearchable).length > 0 && (
              <CCol sm={3}>
                <ListingSearch onChange={handleChangeQuery} />
              </CCol>
            )}
            {!!topPanelContent && <CCol>{topPanelContent()}</CCol>}
            <CCol className="text-end">
              <DropdownSelect
                onChange={setSelectedColumns}
                options={allColumns}
                value={selectedColumns}
              />
              {Boolean(createLink) && (
                <CButton
                  className="ms-2"
                  type="submit"
                  color="success"
                  variant="outline"
                  onClick={() => {
                    navigate(createLink)
                  }}
                >
                  {t('create_button')}
                </CButton>
              )}
            </CCol>
          </CRow>
          <FilterBar
            columns={columns.filter((column) => column.isFilterable)}
            filters={selectedFilters}
            onFilterChange={(f) => handleChangeFilter(f)}
          />
        </CContainer>
        <div className="overflow-x-scroll">
          <CSmartTable
            columns={columns.filter((column) => selectedColumns.includes(column.name))}
            columnSorter={{
              resetable,
            }}
            items={items}
            footer={aggregations.filter((column) => selectedColumns.includes(column.name))}
            noItemsLabel={t('there_is_no_data')}
            pagination
            scopedColumns={scopedColumns}
            sorterValue={sorting}
            onSorterChange={setSorting}
            loading={isLoading}
            itemsPerPage={20}
            paginationProps={{
              align: 'end',
              activePage: page,
              pages: totalPage,
              onActivePageChange: setPage,
              size: 'sm',
            }}
            tableProps={{
              className,
              striped: false,
              hover: true,
              responsive: true,
            }}
            tableBodyProps={{
              className: 'align-middle',
            }}
            {...restProps}
          />
        </div>
      </CContainer>
    </ListingContext.Provider>
  )
}

Listing.propTypes = {
  settingsGetter: PropTypes.func.isRequired,
  listingEntity: PropTypes.string.isRequired,
  dataGetter: PropTypes.func.isRequired,
  aggregationsGetter: PropTypes.func,
  createLink: PropTypes.string,
  overwriteColumns: PropTypes.object,
  className: PropTypes.string,
  restProps: PropTypes.object,
  topPanelContent: PropTypes.func,
  resetable: PropTypes.bool,
}

export default Listing

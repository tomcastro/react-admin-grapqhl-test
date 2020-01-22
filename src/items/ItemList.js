import BookIcon from '@material-ui/icons/Book'
import { makeStyles } from '@material-ui/core'
import React, { Children, cloneElement } from 'react'
import {
  Datagrid,
  DateField,
  EditButton,
  List,
  NumberField,
  ShowButton,
  TextField,
} from 'react-admin' // eslint-disable-line import/no-unresolved

export const ItemIcon = BookIcon

const useStyles = makeStyles(theme => ({
  title: {
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  hiddenOnSmallScreens: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  publishedAt: { fontStyle: 'italic' },
}))

const usePostListActionToolbarStyles = makeStyles({
  toolbar: {
    alignItems: 'center',
    display: 'flex',
    marginTop: -1,
    marginBottom: -1,
  },
})

const ItemListActionToolbar = ({ children, ...props }) => {
  const classes = usePostListActionToolbarStyles()
  return (
    <div className={classes.toolbar}>
      {Children.map(children, button => cloneElement(button, props))}
    </div>
  )
}

const rowClick = (id, basePath, record) => {
  if (record.commentable)
    return 'edit'


  return 'show'
}

const ItemPanel = ({ id, record, resource }) => (
  <div dangerouslySetInnerHTML={{ __html: record.body }} />
)

const ItemList = props => {
  const classes = useStyles()
  // const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))
  return (
    <List
      {...props}
    >
      <Datagrid rowClick={rowClick} expand={ItemPanel} optimized>
        <TextField source="id" />
        <TextField source="title" cellClassName={classes.title} />
        <DateField
          source="created_at"
          cellClassName={classes.publishedAt}
        />

        <NumberField source="price" />
        <TextField source="description" />

        <ItemListActionToolbar>
          <EditButton />
          <ShowButton />
        </ItemListActionToolbar>
      </Datagrid>

    </List>
  )
}

export default ItemList
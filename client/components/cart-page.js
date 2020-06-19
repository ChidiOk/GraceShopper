import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {makeStyles} from '@material-ui/core/styles'
// import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'
// import Typography from '@material-ui/core/Typography'
// import ButtonBase from '@material-ui/core/ButtonBase'

//#region
import Card from '@material-ui/core/Card'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
//#endregion

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    marginTop: 40,
    borderRadius: theme.spacing(0.5),
    transition: '0.3s',
    width: '90%',
    overflow: 'initial',
    background: '#ffffff'
  },
  content: {
    paddingTop: 0,
    textAlign: 'left',
    overflowX: 'auto',
    '& table': {
      marginBottom: 0
    }
  },
  cardHeader: {
    // boxShadow: '0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)',
    width: '88%',
    backgroundColor: 'rgb(63, 81, 181)',
    color: theme.palette.common.white,
    margin: '-40 auto 0',
    borderRadius: 16
  }
}))

/**
 //* COMPONENT
 */
export const CartPage = props => {
  //   const {email} = props
  // const cart = props.cart
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {/* <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          // classes={cardHeaderStyles}
          title='Shopping Cart'
          subheader='Selected items'
        />
        <CardContent className={classes.content}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Price ($)</TableCell>
                <TableCell align="right">Remove ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map(mask => (
                <TableRow key={mask.id}>
                  <TableCell component="th" scope="row">
                    {mask.name}
                  </TableCell>
                  <TableCell align="right">{mask.quantity}</TableCell>
                  <TableCell align="right">{mask.price}</TableCell>
                  <TableCell align="right">trash icon</TableCell>
                </TableRow>
              ))}
              <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">$20.56</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">8%</TableCell>
              <TableCell align="right">$2.57</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{cart.total}</TableCell>
            </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card> */}
    </div>
  )
}

/**
 //* CONTAINER
 */
const mapState = state => {
  console.log('Mapping State to Props:', state)
  return {
    cart: state.cart.all,
    loading: state.cart.loading
  }
}

export default connect(mapState)(CartPage)

/**
   //* PROP TYPES
   */
// CartPage.propTypes = {
//   cart: PropTypes.array
// }

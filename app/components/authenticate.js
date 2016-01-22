// import React, { PropTypes } from 'react'
// import { connect } from 'react-redux'
// import { routeActions as route } from 'redux-simple-router'

// // export function requireAuthentication(Component) {
//   export default class AuthenticateComponent extends React.Component {
//     constructor(props) {
//       super(props)
//     }

//     componentWillMount() {
//       const { user, dispatch } = this.props
//       if (!user.isAuthenticated) {
//         dispatch(route.push('/login'))
//       }
//     }

//     render() {
//         // <Component {...this.props} />
//       return (
//         {React.createElement(this.props.children, {
          
//         })}
//       )
//     }
//   }

//   AuthenticateComponent.propTypes = {
//     dispatch: PropTypes.func.isRequired,
//     isAuthenticated: PropTypes.bool,
//     location: PropTypes.object
//   }

//   // function mapStateToProps(state) {
//   //   return {
//   //     isAuthenticated: state.user.isAuthenticated
//   //   }
//   // }

//   // export default connect(mapStateToProps)(AuthenticateComponent)
// // }
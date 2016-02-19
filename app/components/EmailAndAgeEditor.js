import React from 'react'

import * as userActions from '../actions/user'

const stylesheet = require('../scss/components/EmailAndAgeEditor')

export default class EmailAndAgeEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      isLoading: false,
      error: false
    }

    this.handleSaveClick = () => {
      const { dispatch, user } = this.props
      const updateObj = {}

      if (!this.email.value && !this.age.value) {
        return this.setState({ isEditing: false, error: false })
      }

      this.setState({ isLoading: true, error: false })

      if (this.email.value) {
        updateObj.email = this.email.value
      }

      if (this.age.value) {
        updateObj.age = parseInt(this.age.value)
      }

      dispatch(userActions.fetchUpdate({ user: user.info, data: updateObj }))
        .then(() => this.setState({ isEditing: false, isLoading: false }))
    }
  }

  render() {
    const { isEditing, isLoading, error } = this.state
    const { email, age, dispatch } = this.props

    return (
      <div className="email-age-editor-component">
        <div className="text-container">
          {isEditing ?
            <div className="edit-group">
              <input type="email" ref={(ref) => this.email = ref} /> email
              <input className="age" maxInput="2" type="text" ref={(ref) => this.age = ref} /> age
              <button
                onClick={this.handleSaveClick}
                className={"inline" + (error ? " alert" : " success")}
              >
                {error ?
                  'error!' :
                  isLoading ? 'saving...' : 'save'
                }
              </button>
            </div> :
            <h2>
              {`${email} (${age || '--'}) - `}
              <a onClick={() => this.setState({ isEditing: true })} className="edit">edit</a>
            </h2>
          }
        </div>
      </div>
    )
  }
}

EmailAndAgeEditor.PropTypes = {
  email: React.PropTypes.string,
  age: React.PropTypes.number,
  dispatch: React.PropTypes.func
}
import React from 'react'

export default class EmailAndAgeEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      isLoading: false
    }

    this.handleSaveClick = () => {
      this.setState({ isLoading: true })
      this.setState({ isEditing: false, isLoading: false })
    }
  }

  render() {
    const { isEditing, isLoading } = this.state
    const { email, age, dispatch } = this.props

    return (
      <div className="email-age-editor-component">
        {isEditing ?
          <div className="edit-group">
            <input type="email" ref={(ref) => this.email = ref} /> email
            <input type="text" ref={(ref) => this.age = ref} /> age
            <button onClick={this.handleSaveClick} className="success inline">{isLoading ? 'saving...' : 'save'}</button>
          </div> :
          <h2 className="dashboard-title">
            {`${email} ${age || '--'}`}
            <a onClick={() => this.setState({ isEditing: true })} className="edit"> - edit</a>
          </h2>
        }
      </div>
    )
  }
}

EmailAndAgeEditor.PropTypes = {
  email: React.PropTypes.string,
  age: React.PropTypes.number,
  dispatch: React.PropTypes.func
}
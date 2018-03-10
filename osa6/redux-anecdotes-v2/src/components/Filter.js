import React from "react"
import actionFor from "../actionCreators" 

class Filter extends React.Component {
	handleChange = event => {
		const value = event.target.value
		this.props.dispatch(actionFor.setFilter(value))
	}

	render() {
		return (
			<div>
				filter <input onChange={this.handleChange}/>
			</div>
		)
	}
}

export default Filter;
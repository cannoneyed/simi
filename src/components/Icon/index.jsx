/* eslint-disable react/jsx-space-before-closing */
import React, { Component, PropTypes } from 'react'

export default class Icon extends Component {
  static propTypes = {
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    style: PropTypes.object,
    type: PropTypes.string.isRequired,
  }

  static defaultProps = {
    size: 24
  }

  _mergeStyles(...args) {
    // This is the m function from "CSS in JS" and can be extracted to a mixin
    return Object.assign({}, ...args)
  }

  renderGraphic() {
    switch (this.props.type) {
      case 'close':
        return (
          <g><path d="M24 48C10.767 48 0 37.233 0 24S10.767 0 24 0s24 10.767 24 24-10.767 24-24 24zm0-46C11.87 2 2 11.87 2 24s9.87 22 22 22 22-9.87 22-22S36.13 2 24 2z"/><path d="M25.414 24l6.364-6.364c.39-.39.39-1.023 0-1.414-.39-.39-1.023-.39-1.414 0L24 22.586l-6.364-6.364c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414L22.586 24l-6.364 6.364c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293.255 0 .51-.097.706-.292L24 25.414l6.364 6.364c.195.195.45.293.707.293.257 0 .513-.097.708-.292.39-.39.39-1.023 0-1.414L25.414 24z"/></g>
        )
      case 'left':
        return (
          <g><path d="M0 24C0 10.767 10.767 0 24 0s24 10.767 24 24-10.767 24-24 24S0 37.233 0 24zm46 0c0-12.13-9.87-22-22-22S2 11.87 2 24s9.87 22 22 22 22-9.87 22-22z"/><path d="M18.707 29.707c.39-.39.39-1.023 0-1.414L15.414 25H35c.552 0 1-.448 1-1s-.448-1-1-1H15.414l3.293-3.293c.39-.39.39-1.023 0-1.414-.39-.39-1.023-.39-1.414 0l-5 5c-.092.092-.165.203-.216.326-.05.12-.077.25-.077.38s.026.26.077.382c.05.123.124.233.217.326l5 5c.39.39 1.022.39 1.413 0z"/></g>
        )
      case 'right':
        return (
          <g><path d="M48 24c0 13.233-10.767 24-24 24S0 37.233 0 24 10.767 0 24 0s24 10.767 24 24zM2 24c0 12.13 9.87 22 22 22s22-9.87 22-22S36.13 2 24 2 2 11.87 2 24z"/><path d="M29.293 18.293c-.39.39-.39 1.023 0 1.414L32.586 23H13c-.552 0-1 .448-1 1s.448 1 1 1h19.586l-3.293 3.293c-.39.39-.39 1.023 0 1.414.39.39 1.023.39 1.414 0l5-5c.092-.092.165-.203.216-.326.05-.12.077-.25.077-.38s-.026-.26-.077-.382c-.05-.123-.124-.233-.217-.326l-5-5c-.39-.39-1.022-.39-1.413 0z"/></g>
        )
      default:
        return null
    }
  }

  render() {
    let styles = {
      fill: 'currentcolor',
      verticalAlign: 'middle',
      width: this.props.size, // CSS instead of the width attr to support non-pixel units
      height: this.props.size // Prevents scaling issue in IE
    }
    return (
      <svg
        viewBox="0 0 48 48"
        preserveAspectRatio="xMidYMid meet"
        style={this._mergeStyles(
          styles,
          this.props.style // This lets the parent pass custom styles
        )}>
          {this.renderGraphic()}
      </svg>
    )
  }
}
